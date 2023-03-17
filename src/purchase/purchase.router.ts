import { BaseRouter } from "../shared/router/router";
import { PurchaseController } from "./controllers/purchase.controller";
import { PurchaseMiddleware } from "./middlewares/purchase.middleware";

// Definiendo la clase perteneciente a las rutas de las compras
export class PurchaseRouter extends BaseRouter<PurchaseController, PurchaseMiddleware> {

    // Método constructor para inicializar la clase
    constructor() {
        super(PurchaseController, PurchaseMiddleware); // Implementando el controller y el middleware
    }

    // Almacenando las rutas (al sobreescribir el método)
    routes(): void {

        // Ruta para obtener las compras
        this.router.get('/purchases', (req, res) => this.controller.getPurchases(req, res));
        // Ruta para traer a una compra en específico
        this.router.get('/purchases/:id', (req, res) => this.controller.getPurchaseById(req, res));
        // Ruta para traer a una compra en específico junto con sus detalles
        this.router.get('/purchases/details-rel/:id', (req, res) => this.controller.getPurchaseWithRelationById(req, res));
        // Ruta para crear una nueva compra
        // Se implementará un 'middleware' para realizar validaciones de datos
        this.router.post('/purchases', (req, res, next) => [this.middleware.purchaseValidator(req, res, next)], (req, res) => this.controller.createPurchase(req, res));
        // Ruta para actualizar a una compra en específico
        this.router.put('/purchases/:id', (req, res) => this.controller.updatePurchase(req, res));
        // Ruta para eliminar a una compra en específico
        this.router.delete('/purchases/:id', (req, res) => this.controller.deletePurchase(req, res));
    }
}