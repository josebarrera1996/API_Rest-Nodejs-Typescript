import { ConfigServer } from "../../config/config";
import { UserService } from "../../users/services/user.service";
import { UserEntity } from "../../users/entities/user.entity";
import { PayloadToken } from "../interfaces/auth.interface";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcrypt";

// Clase para trabajar con todo lo relacionado a la autenticación de usuarios
export class AuthService extends ConfigServer {

    // Inyección de dependencias
    constructor(private readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt) {
        super();
    }

    // Método para logearnos con el email o el username
    // Verificará que ambas contraseñas (la de texto plano y la encriptada) coinciden
    // Parámetro 'username' servirá para el propio 'username' y para 'email'
    public async validateUser(username: string, password: string): Promise<UserEntity | null> {

        // Trayendo los métodos correspondiente de 'UserService'
        const userByEmail = await this.userService.findByEmail(username);
        const userByUsername = await this.userService.findByUsername(username);

        // Si nos hemos logeado con el 'username'
        if (userByUsername) {
            // Comparar las password's
            const isMatch = await bcrypt.compare(password, userByUsername.password);
            if (isMatch) {
                // Si hay coincidencias, retornar los datos del usuario
                return userByUsername;
            }
        }

        // Si nos hemos logeado con el 'email'
        if (userByEmail) {
            // Comparar las password's
            const isMatch = await bcrypt.compare(password, userByEmail.password);
            if (isMatch) {
                // Si hay coincidencias, retornar los datos del usuario
                return userByEmail;
            }
        }

        return null;
    }

    // Método para 'firmar' el JWT
    // Recibirá el 'payload' y la clave secreta (que proviene de las variables de entorno)
    sing(payload: jwt.JwtPayload, secret: any) {
        return this.jwtInstance.sign(payload, secret, { expiresIn: "1h" }); // Expirará en 1 hora
    }

    // Método para generar el token 
    public async generateJWT(user: UserEntity): Promise<{ accessToken: string, user: UserEntity }> {

        // Obteniendo un usuario gracias a su ID y su rol
        const userConsult = await this.userService.findUserWithRole(user.id, user.role);

        // Payload
        const payload: PayloadToken = {
            // Propiedades
            role: userConsult!.role,
            sub: userConsult!.id
        };

        // Retornar todo el objeto del usuario a excepción de la 'password'
        if (userConsult) {
            user.password = "Not permission";
        }

        return {
            accessToken: this.sing(payload, this.getEnvironment("JWT_SECRET")), // Generando el TOKEN
            user
        };
    }
}