import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

// Clase que tendrá los métodos típicos de un CRUD
// Implementará los métodos del servicio
export class CustomerController {

    // Inyectando a el servicio (para obtener todos sus métodos)
    constructor(private readonly customerService: CustomerService = new CustomerService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    // Método para traer a todos los clientes
    async getCustomers(req: Request, res: Response) {
        try {
            const data = await this.customerService.findAllCustomers();
            // En caso de no encontrar datos
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para traer a un cliente en específico
    async getCustomerById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.customerService.findCustomerById(id);
            // En caso de no encontrar datos o no existir
            if (!data) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para traer a un cliente en específico junto con su/s pedido/s
    async getCustomerWithRelationById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.customerService.findCustomeByIdWithPurchases(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe dato");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para crear un cliente
    async createCustomer(req: Request, res: Response) {
        try {
            const data = await this.customerService.createCustomer(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para actualizar a un cliente en específico
    async updateCustomer(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: UpdateResult = await this.customerService.updateCustomer(id, req.body);
            // En caso de error (se escribe mal el id o no existe)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para eliminar a un cliente en específico
    async deleteCustomer(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: DeleteResult = await this.customerService.deleteCustomer(id);
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