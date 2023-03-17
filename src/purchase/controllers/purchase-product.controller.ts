import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseProductService } from "../services/purchase-products.service";
import { Request, Response } from "express";

// Clase que tendrá los métodos típicos de un CRUD
// Implementará los métodos del servicio
export class PurchaseProductController {

    // Inyectando a el servicio (para obtener todos sus métodos) y el manejo de errores
    constructor(private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    // Método para traer las compras de los productos
    async getPurchaseProducts(req: Request, res: Response) {
        try {
            const data = await this.purchaseProductService.findAllPurchaseProducts();
            // En caso de no encontrar datos
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para traer una compra de productos en específico
    async getPurchaseProductById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.purchaseProductService.findPurchaseProductById(
                id
            );
            // En caso de no encontrar datos o no existir
            if (!data) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para crear una nueva compra de productos
    async createPurchaseProduct(req: Request, res: Response) {
        try {
            const data = await this.purchaseProductService.createPurchaseProduct(
                req.body
            );
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para actualizar una compra de productos en específico
    async updatePurchaseProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: UpdateResult = await this.purchaseProductService.updatePurchaseProduct(
                id,
                req.body
            );
            // En caso de error (se escribe mal el id o no existe)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para eliminar una compra de productos en específico
    async deletePurchaseProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: DeleteResult = await this.purchaseProductService.deletePurchaseProduct(id);
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