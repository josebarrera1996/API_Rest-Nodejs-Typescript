import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

// Clase que tendrá los métodos típicos de un CRUD
// Implementará los métodos del servicio
export class UserController {

    // Inyectando a el servicio (para obtener todos sus métodos) y para manejar los eerrores
    constructor(private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    // Método para traer a los usuarios
    async getUsers(req: Request, res: Response) {
        try {
            const data = await this.userService.findAllUser();
            // En caso de no encontrar datos
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para traer a un usuario en específico (gracias a su ID)
    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.userService.findUserById(id);
            // En caso de no encontrar datos o no existir
            if (!data) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para traer a un usuario en específico (gracias a su ID) junto con su relación
    // Se mostrará un campo más: 'customer'
    async getUserWithRelationById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.userService.findUserWithRelation(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe dato");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para crear a un nuevo usuario
    async createUser(req: Request, res: Response) {
        try {
            const data = await this.userService.createUser(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para actualizar a un usuario en específico (gracias a su ID)
    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: UpdateResult = await this.userService.updateUser(id, req.body);
            // En caso de error (se escribe mal el id o no existe)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    // Método para eliminar a un usuario en específico (gracias a su ID)
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: DeleteResult = await this.userService.deleteUser(id);
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