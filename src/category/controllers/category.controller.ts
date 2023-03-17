import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { CategoryService } from "../services/category.service";
import { Request, Response } from "express";

// Clase que tendrá los métodos típicos de un CRUD
// Implementará los métodos del servicio
export class CategoryController {

    // Inyectando a el servicio (para obtener todos sus métodos)
    constructor(private readonly categoryService: CategoryService = new CategoryService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    // Método para traer a todas las categorías
    async getCategories(req: Request, res: Response) {
        try {
            const data = await this.categoryService.findAllCategoties();
            // En caso de no encontrar datos
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para traer a una categoría en específico
    async getCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.categoryService.findCategoryById(id);
            // En caso de no encontrar datos o no existir
            if (!data) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para crear una categoría 
    async createCategory(req: Request, res: Response) {
        try {
            const data = await this.categoryService.createCategory(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para traer una categoría en específico con su/s producto/s
    async getCategoryWithRelationById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.categoryService.findCategoryWithProduct(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe dato");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para actualizar una categoría en específico
    async updateCategory(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: UpdateResult = await this.categoryService.updateCategory(id, req.body);
            // En caso de error (se escribe mal el id o no existe)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para eliminar a una categoría en específico
    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: DeleteResult = await this.categoryService.deleteCategory(id);
            // En caso de error (se escribe mal el id o no existe)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, 'Hay un error en eliminar');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }
}