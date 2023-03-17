import { BaseService } from "../../config/base.service";
import { PurchaseEntity } from "../entitites/purchase.entity";
import { PurchaseDTO } from "../dto/purchase.dto";
import { DeleteResult, UpdateResult } from "typeorm";

// Servicio para trabajar con los métodos típicos de un CRUD
export class PurchaseService extends BaseService<PurchaseEntity> {

    // Método constructor inicializador
    constructor() {
        super(PurchaseEntity);
    }

    // Método para traer a todas las compras
    async findAllPurchases(): Promise<PurchaseEntity[]> {
        return (await this.execRepository).find();
    }

    // Método para traer a una compra en específico (gracias a su ID)
    async findPurchaseById(id: string): Promise<PurchaseEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    // Método para traer a una compra en específico (gracias a su ID) con sus detalles
    async findPurchaseByIdWithDetails(id: string): Promise<PurchaseEntity | null> {
        return (await this.execRepository)
            // Método para crear una instrucción SQL
            .createQueryBuilder("purchase")
            // Utilizando un Left Join
            .leftJoinAndSelect("purchase.purchaseProduct", "purchase-product") // Campo existente (purchase.purchaseProduct) y campo personalizado (purchase-product)
            .where({ id }) // Coincidencia de ID
            .getOne();
    }

    // Método para crear una nueva compra
    // Uso del DTO
    async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
        return (await this.execRepository).save(body);
    }

    // Método para actualizar a una compra en específico (gracias a su ID)
    // Uso del DTO
    async updatePurchase(
        id: string,
        infoUpdate: PurchaseDTO
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    // Método para eliminar una compra en específico (gracias a su ID)
    async deletePurchase(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

}