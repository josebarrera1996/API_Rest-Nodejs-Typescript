import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { CustomerDTO } from "../dto/customer.dto";

// Middleware para realmente validar los datos pertenecientes a 'Customer'
export class CustomerMiddleware {

    // Inyección de dependencias
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    // Método para realizar las validaciones
    customerValidator(req: Request, res: Response, next: NextFunction) {

        // Obteniendo lo alojado en el 'body' del 'request'
        const { address, dni, user } = req.body;

        // Constante para ir accediendo a las propiedades del DTO y así poder validar
        // Es un objeto
        const valid = new CustomerDTO();

        // Validaciones
        valid.address = address;
        valid.dni = dni;
        valid.user = user;

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