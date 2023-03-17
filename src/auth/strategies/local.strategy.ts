import { AuthService } from "../services/auth.service";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { UserEntity } from "../../users/entities/user.entity";
import { PassportUse } from "../utils/passport.use";

// Instanciando a 'AuthService'
const authService: AuthService = new AuthService();

// Estrategia de tipo 'local' para lograr el 'login'
export class LoginStrategy {

    // Método para validar a el usuario
    async validate(
        username: string,
        password: string,
        done: any // Función que ejecutará este middleware
    ): Promise<UserEntity> {
        const user = await authService.validateUser(username, password);
        if (!user) {
            return done(null, false, { message: "Invalid username or password" });
        }

        return done(null, user);
    }

    // Retornar la estrategia
    get use() {
        return PassportUse<LocalStrategy, Object, VerifyFunction>(
            "login",
            LocalStrategy,
            {
                usernameField: "username",
                passwordField: "password",
            },
            this.validate 
        );
    }
}

