import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { ProductDTO } from "../dto/product.dto";

// Middleware para realmente validar los datos pertenecientes a 'Product'
export class ProductMiddleware {

    // Inyección de dependencias
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    // Método para realizar las validaciones
    productValidator(req: Request, res: Response, next: NextFunction) {

        // Obteniendo lo alojado en el 'body' del 'request'
        const { productName, description, category, price } = req.body;

        // Constante para ir accediendo a las propiedades del DTO y así poder validar
        // Es un objeto
        const valid = new ProductDTO();

        // Validaciones
        valid.productName = productName;
        valid.description = description;
        valid.category = category;
        valid.price = price;

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