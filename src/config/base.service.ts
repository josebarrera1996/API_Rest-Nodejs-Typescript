import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

// Clase genérica para trabajar con los métodos del repositorio de cada entidad que lo extienda
export class BaseService<T extends BaseEntity> extends ConfigServer {

    // Promesa para ejecutar los repositorios de la entidad
    public execRepository: Promise<Repository<T>>;

    // Método constructor para inicializar
    constructor(private getEntity: EntityTarget<T>) {
        super();
        this.execRepository = this.initRepository(getEntity);
    }

    // Método para inicializar los repositorios de la entidad que se le pase como argumento
    async initRepository<T extends ObjectLiteral>(e: EntityTarget<T>): Promise<Repository<T>> {
        const getConn = await this.initConnect;
        return getConn.getRepository(e)
    }
}