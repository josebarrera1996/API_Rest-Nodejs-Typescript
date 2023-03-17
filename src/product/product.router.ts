import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controller";
import { ProductMiddleware } from "./middlewares/product.middleware";

// Definiendo la clase perteneciente a las rutas de los productos
export class ProductRouter extends BaseRouter<ProductController, ProductMiddleware> {

    // Método constructor para inicializar la clase
    constructor() {
        super(ProductController, ProductMiddleware); // Implementando el controller y el middleware
    }

    // Almacenando las rutas (al sobreescribir el método)
    routes(): void {

        // Ruta para traer a todos los productos
        this.router.get('/products', (req, res) => this.controller.getProducts(req, res));
        // Ruta para traer a un producto en específico
        this.router.get('/products/:id', (req, res) => this.controller.getProductById(req, res));
        // Ruta para crear un nuevo producto
        // Se implementará un 'middleware' para validar los datos
        this.router.post('/products', (req, res, next) => [this.middleware.productValidator(req, res, next)], (req, res) => this.controller.createProduct(req, res));
        // Ruta para actualizar a un producto en específico
        this.router.put('/products/:id', (req, res) => this.controller.updateProduct(req, res));
        // Ruta para eliminar a un producto en específico
        this.router.delete('/products/:id', (req, res) => this.controller.deleteProduct(req, res));
    }
}