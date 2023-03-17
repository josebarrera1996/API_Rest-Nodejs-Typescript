import { HttpResponse } from "../response/http.response";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { UserEntity } from "../../users/entities/user.entity";
import { RoleType } from "../../users/dto/user.dto";

// Middlewares compartidos
export class SharedMiddleware {

    // Inyección de dependencias
    constructor(public httpResponse: HttpResponse = new HttpResponse()) { }

    // Middleware para chequear si el usuario pasó la autenticación
    passAuth(type: string) { // type -> el nombre de la estrategia
        return passport.authenticate(type, { session: false });
    }

    // Middleware para chequear si el usuario tiene el rol de 'customer'
    checkCustomerRole(req: Request, res: Response, next: NextFunction) {
        // Realizar este cambio para obtener los parámetros de 'UserEntity'
        const user = req.user as UserEntity;
        if (user.role !== RoleType.CUSTOMER) {
            return this.httpResponse.Unauthorized(res, "No tienes permiso");
        }
        return next();
    }

    // Middleware para chequear si el usuario tiene el rol de 'admin'
    checkAdminRole(req: Request, res: Response, next: NextFunction) {
        // Realizar este cambio para obtener los parámetros de 'UserEntity'
        const user = req.user as UserEntity;
        if (user.role !== RoleType.ADMIN) {
            return this.httpResponse.Unauthorized(res, "No tienes permiso");
        }
        return next();
    }
}