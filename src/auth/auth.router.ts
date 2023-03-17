import { BaseRouter } from "../shared/router/router";
import { AuthController } from "./controllers/auth.controller";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";

// Definiendo el ruteo 
export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
    constructor() {
        super(AuthController, SharedMiddleware);
    }

    // Ruta para lograr el login (con la implementación de middleware)
    routes(): void {
        this.router.post("/login", this.middleware.passAuth("login"), (req, res) => // Estrategia -> local
            this.controller.login(req, res)
        );
    }
}