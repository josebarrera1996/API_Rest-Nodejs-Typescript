// Archivo que será una 'bandera', la cual será extendida por las rutas de la app
// Se la podría definir como ruta 'raíz' o 'base'

import { Router } from "express";

// Definiendo la clase genérica
// 'T' simbolizará a los controllers
// 'U' simbolizará a los middlewares
export class BaseRouter<T, U> {

    // Enrutador
    public router: Router;
    // Declarando el controller de la clase que lo extienda
    public controller: T;
    // Declarando el middlware de la clase que lo extienda
    public middleware: U;

    // Inicializador de la clase
    constructor(TController: { new(): T }, UMiddleware: { new (): U }) { 
        this.router = Router();
        this.controller = new TController(); // Ejecutará el controller de la clase que lo extienda
        this.middleware = new UMiddleware(); // Ejecutará el middleware de la clase que lo extienda
        this.routes();
    }

    // En este método se almacenarán todas las rutas de cada clase que lo extienda
    routes() { }
}