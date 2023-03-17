import { AuthService } from "../services/auth.service";
import { Strategy as JwtStr, StrategyOptions, ExtractJwt } from "passport-jwt";
import { PayloadToken } from "../interfaces/auth.interface";
import { PassportUse } from "../utils/passport.use";

// Estrategia de tipo 'jwt' para lograr el login
export class JwtStrategy extends AuthService {
    constructor() {
        super();
    }

    // Método para validar
    async validate(payload: PayloadToken, done: any) {
        return done(null, payload);
    }

    // Retornar la estrategia
    get use() {
        return PassportUse<
            JwtStr,
            StrategyOptions,
            (payload: PayloadToken, done: any) => Promise<PayloadToken>
        >(
            "jwt",
            JwtStr,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.getEnvironment("JWT_SECRET"),
                ignoreExpiration: false,
            },
            this.validate
        );
    }
}