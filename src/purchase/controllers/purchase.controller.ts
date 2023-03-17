import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseService } from "../services/purchase.service";
import { Request, Response } from "express";

// Clase que tendrá los métodos típicos de un CRUD
// Implementará los métodos del servicio
export class PurchaseController {

    // Inyectando a el servicio (para obtener todos sus métodos)
    constructor(private readonly purchaseService: PurchaseService = new PurchaseService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    // Método para traer a todas las compras
    async getPurchases(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.findAllPurchases();
            // En caso de no encontrar datos
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para traer una compra en específico
    async getPurchaseById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.purchaseService.findPurchaseById(id);
            // En caso de no encontrar datos o no existir
            if (!data) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para traer una compra en específico junto con sus detalles
    async getPurchaseWithRelationById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.purchaseService.findPurchaseByIdWithDetails(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe dato");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para crear una nueva compra
    async createPurchase(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.createPurchase(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para actualizar una compra en específico
    async updatePurchase(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: UpdateResult = await this.purchaseService.updatePurchase(id, req.body);
            // En caso de error (se escribe mal el id o no existe)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
            }
            return this.httpResponse.Ok(res, data);;
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para eliminar una compra en específico
    async deletePurchase(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: DeleteResult = await this.purchaseService.deletePurchase(id);
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