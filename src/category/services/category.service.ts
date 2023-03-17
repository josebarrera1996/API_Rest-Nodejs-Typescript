import { BaseService } from "../../config/base.service";
import { CategoryEntity } from "../entities/category.entity";
import { CategoryDTO } from "../dto/category.dto";
import { DeleteResult, UpdateResult } from "typeorm";

// Servicio para trabajar con los métodos típicos de un CRUD
export class CategoryService extends BaseService<CategoryEntity> {

    // Método constructor inicializador
    constructor() {
        super(CategoryEntity);
    }

    // Método para traer a todas las cateogrias
    async findAllCategoties(): Promise<CategoryEntity[]> {
        return (await this.execRepository).find();
    }

    // Método para traer a una categoría en específico (gracias a su ID)
    async findCategoryById(id: string): Promise<CategoryEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    // Método para traer una categoría en específico (gracias a su ID) con su/s producto/s
    async findCategoryWithProduct(categorytId: string): Promise<CategoryEntity | null> {
        return (await this.execRepository)
            // Método para crear una instrucción SQL
            .createQueryBuilder("category")
            // Utilizando un Left Join
            .leftJoinAndSelect("category.products", "products") // Campo existente (category.productos) y campo personalizado (products)
            .where({ id: categorytId }) // Coincidencia de ID
            .getOne(); 
    }

    // Método para crear una nueva categoría
    // Uso del DTO
    async createCategory(body: CategoryDTO): Promise<CategoryEntity> {
        return (await this.execRepository).save(body);
    }

    // Método para actualizar a una categoría en específico (gracias a su ID)
    // Uso del DTO
    async updateCategory(
        id: string,
        infoUpdate: CategoryDTO
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    // Método para eliminar a una categoría en específico (gracias a su ID)
    async deleteCategory(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

}
