import { BaseService } from "../../config/base.service";
import { PurchaseProductEntity } from "../entitites/purchases-products.entity";
import { PurchaseProductDTO } from "../dto/purchase-products.dto";
import { DeleteResult, UpdateResult } from "typeorm";
import { ProductService } from "../../product/services/product.service";

// Servicio para trabajar con los métodos típicos de un CRUD
export class PurchaseProductService extends BaseService<PurchaseProductEntity> {

    // Método constructor inicializador
    constructor(private readonly productService: ProductService = new ProductService()) {
        super(PurchaseProductEntity);
    }

    // Método para encontrar a todos los productos comprados
    async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
        return (await this.execRepository).find();
    }

    // Método para encontrar a la compra de productos en específico (gracias a su ID)
    async findPurchaseProductById(id: string): Promise<PurchaseProductEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    // Método para crear una nuevo registro de productos comprados
    // Uso de DTO
    async createPurchaseProduct(body: PurchaseProductDTO): Promise<PurchaseProductEntity> {
        // Guardar en memoria (para poder mutar lo que se guardará en la B.D)
        const newPP = (await this.execRepository).create(body);
        // Encontrar el producto gracias a su ID
        const prod = await this.productService.findProductById(newPP.product.id);
        // Modificar el precio total de acuerdo a la siguiente condición
        newPP.totalPrice = prod!.price * newPP.quantityProduct; // Precio del producto * cantidad solicitada del mismo
        // Guardar en la B.D
        return (await this.execRepository).save(newPP);
    }

    // Método para actualizar a la compra de productos en específico (gracias a su ID)
    // Uso de DTO
    async updatePurchaseProduct(id: string, infoUpdate: PurchaseProductDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    // Método para eliminar a una compra de productos en específico (gracias a su ID)
    async deletePurchaseProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

}