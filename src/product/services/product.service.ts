import { BaseService } from "../../config/base.service";
import { ProductEntity } from "../entities/product.entity";
import { ProductDTO } from "../dto/product.dto";
import { DeleteResult, UpdateResult } from "typeorm";

// Servicio para trabajar con los métodos típicos de un CRUD
export class ProductService extends BaseService<ProductEntity> {

    // Método constructor inicializador
    constructor() {
        super(ProductEntity);
    }

    // Método para traer a todos los productos
    async findAllProducts(): Promise<ProductEntity[]> {
        return (await this.execRepository).find();
    }

    // Método para traer un producto en específico (gracias a su ID)
    async findProductById(id: string): Promise<ProductEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    // Método para crear un nuevo producto
    // Uso de DTO
    async createProduct(body: ProductDTO): Promise<ProductEntity> {
        return (await this.execRepository).save(body);
    }

    // Método para actualizar a un producto en específico
    // Uso de DTO
    async updateProduct(
        id: string,
        infoUpdate: ProductDTO
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    // Método para eliminar a un producto en específico
    async deleteProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

}