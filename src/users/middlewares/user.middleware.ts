import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

// Middleware para realmente validar los datos pertenecientes a 'User'
export class UserMiddleware extends SharedMiddleware {

    // Inyección de dependencias
    constructor() { 
        super()
    }

    // Método para realizar las validaciones
    userValidator(req: Request, res: Response, next: NextFunction) {

        // Obteniendo lo alojado en el 'body' del 'request'
        const { name, lastname, username, email, password, city, province, role } = req.body;
        
        // Constante para ir accediendo a las propiedades del DTO y así poder validar
        // Es un objeto
        const valid = new UserDTO();

        // Validaciones
        valid.name = name;
        valid.lastname = lastname;
        valid.username = username;
        valid.email = email;
        valid.password = password;
        valid.city = city;
        valid.province = province;
        valid.role = role;

        // Método de 'class-validator' para validar el objeto 'valid'
        validate(valid).then((err) => {
            if (err.length > 0) {
                // Si hay errores, retornarlos...
                return this.httpResponse.Error(res, err);
            } else {
                // Si no hay errores, continuar con la ejecución de la app
                next();
            }
        });
    }
}
