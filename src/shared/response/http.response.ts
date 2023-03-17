import { Response } from "express";

// Estados de los errores
export enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500,
}

// Clase para el manejo de los estados y mensajes de error de los propios errores
export class HttpResponse {

    // Método para el manejo de una respuesta exitosa 
    Ok(res: Response, data?: any): Response {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: "Success",
            data: data
        });
    }

    // Método para el manejo de una respuesta no exitosa al no encontrar lo buscado
    NotFound(res: Response, data?: any): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: "Not Found",
            error: data
        });
    }

    // Método para el manejo de una respuesta no exitosa al no estar autorizados
    Unauthorized(res: Response, data?: any): Response {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: "Unauthorized",
            error: data
        });
    }

    // Método para el manejo de una respuesta no exitosa al no poder acceder debido a que es prohibido
    Forbidden(res: Response, data?: any): Response {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: "Forbidden",
            error: data
        });
    }

    // Método para el manejo de una respuesta no exitosa ante una falla en el servidor
    Error(res: Response, data?: any): Response {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: "Internal server error",
            error: data
        });
    }
}