import "reflect-metadata";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { DataSource } from "typeorm";
// Enrutadores
import { UserRouter } from './users/user.router';
import { CustomerRouter } from './customers/customer.router';
import { ProductRouter } from './product/product.router';
import { CategoryRouter } from './category/category.router';
// Configuraciones
import { ConfigServer } from './config/config';
import { PurchaseRouter } from './purchase/purchase.router';
import { PurchaseProductRouter } from './purchase/purchase-product.router';
import { LoginStrategy } from "./auth/strategies/local.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { AuthRouter } from "./auth/auth.router";

// Clase inicial para inicializar el servidor
class ServerBootstrap extends ConfigServer {

    // Instanciando a Express
    public app: express.Application = express();

    // PUERTO
    private PORT: number = this.getNumberEnv("PORT") || 8080;

    // Método 'constructor' -> Inicializador de la clase
    constructor() {

        // Traer los métodos de 'ConfigServer'
        super();
        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        // Passport
        this.passportUse();
        // Conexión
        this.dbConnect();
        // Implementando el sistema de rutas
        this.app.use("/api", this.routers());
        // Implementando el método
        this.listen();
    }

    // Método que simbolizará el 'arbol de rutas' de la app
    routers(): Array<express.Router> {
        return [
            // Implementando los enrutadores
            new UserRouter().router,
            new CustomerRouter().router,
            new ProductRouter().router,
            new CategoryRouter().router,
            new PurchaseRouter().router,
            new PurchaseProductRouter().router,
            new AuthRouter().router
        ]
    }

    // Implementando las estrategias (local & jwt)
    passportUse() {
        return [new LoginStrategy().use, new JwtStrategy().use]
    }

    // Implementando la conexión con la B.D
    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
            .then(() => {
                console.log("Connect Success");
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // Levantando el servidor
    public listen() {
        this.app.listen(this.PORT, () => {
            console.log("Server listening on PORT: ", this.PORT);
        });
    }
}

// Instanciando la clase
new ServerBootstrap();