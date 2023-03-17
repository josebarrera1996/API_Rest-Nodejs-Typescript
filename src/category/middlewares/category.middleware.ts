import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { CategoryDTO } from "../dto/category.dto";

// Middleware para realmente validar los datos pertenecientes a 'Category'
export class CategoryMiddleware {

    // Inyección de dependencias
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    // Método para realizar las validaciones
    categoryValidator(req: Request, res: Response, next: NextFunction) {

        // Obteniendo lo alojado en el 'body' del 'request'
        const { categoryName } = req.body;

        // Constante para ir accediendo a las propiedades del DTO y así poder validar
        // Es un objeto
        const valid = new CategoryDTO();

        // Validaciones
        valid.categoryName = categoryName;

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