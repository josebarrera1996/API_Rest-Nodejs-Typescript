import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { AppDataSource } from "./data.source";

// Clase (de tipo abstracta) para trabajar con las variables de entorno
// Entornos de 'producción' o de 'desarrollo'
export abstract class ConfigServer {

    // Inicializador de las variables de entorno
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeNameEnv,
        });
    }

    // Método para retornar la variable de entorno indicada
    public getEnvironment(k: string): string | undefined {
        return process.env[k]; // ejemplo -> process.env['PORT']
    }

    // Método para retornar la variable de entorno indicada (convertida a number)
    public getNumberEnv(k: string): number {
        return Number(this.getEnvironment(k)); // ejemplo -> process.env['PORT']
    }

    // Método de tipo 'getter'
    public get nodeEnv(): string {
        // Se leerá la variable de entorno que se le pase (si es que se la pasa)
        // De esta manera se podrá saber en que entorno de trabajo se está (desarrollo o producción)
        // Se aplicará (si es que existe) el eliminado de espacios
        return this.getEnvironment("NODE_ENV")?.trim() || "";
    }

    // Método para leer un 'path' u otro dependiendo de la variable de entorno que se trabaje
    public createPathEnv(path: string): string {

        // Arreglo que por defecto tendrá el string 'env'
        const arrEnv: Array<string> = ["env"];

        // Si 'path' tiene contenido...
        if (path.length > 0) {
            const stringToArray = path.split("."); // ejemplo -> production.release = production, release
            arrEnv.unshift(...stringToArray); // Colocarlo al inicio del arreglo
        }

        console.log(arrEnv);
        return "." + arrEnv.join("."); // ['hola', 'mundo'] => 'hola.mundo'
    }

    // Método para lograr la conexión con la B.D
    get initConnect(): Promise<DataSource> {
        return AppDataSource.initialize();
    }
}