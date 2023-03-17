import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { ProductService } from "../services/product.service";
import { Request, Response } from "express";

// Clase que tendrá los métodos típicos de un CRUD
// Implementará los métodos del servicio
export class ProductController {

    // Inyectando a el servicio (para obtener todos sus métodos)
    constructor(private readonly productService: ProductService = new ProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    // Método para traer a todos los productos
    async getProducts(req: Request, res: Response) {
        try {
            const data = await this.productService.findAllProducts();
            // En caso de no encontrar datos
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para traer a un producto en específico
    async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.productService.findProductById(id);
            // En caso de no encontrar datos o no existir
            if (!data) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para crear un nuevo producto
    async createProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para actualizar a un producto en específico
    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: UpdateResult = await this.productService.updateProduct(id, req.body);
            // En caso de error (se escribe mal el id o no existe)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para eliminar a un producto en específico
    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: DeleteResult = await this.productService.deleteProduct(id);
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