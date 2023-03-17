import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controllers/category.controller";
import { CategoryMiddleware } from "./middlewares/category.middleware";

// Definiendo la clase perteneciente a las rutas de las categorías
export class CategoryRouter extends BaseRouter<CategoryController, CategoryMiddleware> {

    // Método constructor para inicializar la clase
    constructor() {
        super(CategoryController, CategoryMiddleware); // Implementando el controller
    }

    // Almacenando las rutas (al sobreescribir el método)
    routes(): void {

        // Ruta para traer a todas las categorías
        this.router.get('/categories', (req, res) => this.controller.getCategories(req, res));
        // Ruta para traer a una categoría en específico
        this.router.get('/categories/:id', (req, res) => this.controller.getCategoryById(req, res));
        // Ruta para traer a una categoría en específico junto con su/s producto/s
        this.router.get('/categories/product-rel/:id', (req, res) => this.controller.getCategoryWithRelationById(req, res));
        // Ruta para crear una nueva categoría
        // Se implementa un 'middleware' para realizar validaciones
        this.router.post('/categories', (req, res, next) => [this.middleware.categoryValidator(req, res, next)], (req, res) => this.controller.createCategory(req, res));
        // Ruta para actualizar a una categoría en específico
        this.router.put('/categories/:id', (req, res) => this.controller.updateCategory(req, res));
        // Ruta para eliminar a una categoría en específico
        this.router.delete('/categories/:id', (req, res) => this.controller.deleteCategory(req, res));
    }
}