import { AuthService } from "../services/auth.service";
import { HttpResponse } from "../../shared/response/http.response";
import { Request, Response } from "express";
import { UserEntity } from "../../users/entities/user.entity";

export class AuthController extends AuthService {

    // Inyección de dependencias
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {
        super();
    }

    // Método para logearnos (y lograr la autenticación)
    async login(req: Request, res: Response) {
        try {

            // Realizar este cambio para obtener los parámetros de 'UserEntity'
            const userEncode = req.user as UserEntity;

            // Generar el token para el usuario
            const encode = await this.generateJWT(userEncode);

            // Si no se pudo lograr el login...
            if (!encode) {
                return this.httpResponse.Unauthorized(res, "No tienes permisos");
            }

            // Preparando la respuesta
            res.header("Content-Type", "application/json"); // Encabezado
            res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 }); // Guardar la cookie creada (com el tiempo de vida)
            res.write(JSON.stringify(encode)); // Obtener la respuesta en formato JSON
            res.end(); // Indicando el fin de la misma
        } catch (err) {
            console.error(err);
            return this.httpResponse.Error(res, err);
        }
    }
}