import { BaseRouter } from "../shared/router/router";
import { PurchaseProductController } from "./controllers/purchase-product.controller";
import { PurchaseProductMiddleware } from "./middlewares/purchase-product.middleware";

// Definiendo la clase perteneciente a las rutas de las compras de los productos
export class PurchaseProductRouter extends BaseRouter<PurchaseProductController, PurchaseProductMiddleware> {

    // Método constructor para inicializar la clase
    constructor() {
        super(PurchaseProductController, PurchaseProductMiddleware); // Implementando el controller y el middleware
    }

    // Almacenando las rutas (al sobreescribir el método)
    routes(): void {

        // Ruta para obtener las compras de los productos
        this.router.get('/purchases-products', (req, res) => this.controller.getPurchaseProducts(req, res));
        // Ruta para traer a una compra de productos en específico
        this.router.get('/purchases-products/:id', (req, res) => this.controller.getPurchaseProductById(req, res));
        // Ruta para crear una nueva compra de productos
        //  Se implementará un 'middleware' para realizar validaciones de datos
        this.router.post('/purchases-products', (req, res, next) => [this.middleware.purchaseProductValidator(req, res, next)], (req, res) => this.controller.createPurchaseProduct(req, res));
        // Ruta para actualizar a una compra de productos en específico
        this.router.put('/purchases-products/:id', (req, res) => this.controller.updatePurchaseProduct(req, res));
        // Ruta para eliminar a una compra de productos en específico
        this.router.delete('/purchases-products/:id', (req, res) => this.controller.deletePurchaseProduct(req, res));
    }
}