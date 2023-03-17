import { BaseRouter } from "../shared/router/router";
import { UserController } from "./controllers/user.controller";
import { UserMiddleware } from "./middlewares/user.middleware";

// Definiendo la clase perteneciente a las rutas de los usuarios
export class UserRouter extends BaseRouter<UserController, UserMiddleware> {

    // Método constructor para inicializar la clase
    constructor() {
        super(UserController, UserMiddleware); // Implementando el controller y el middleware
    }

    // Almacenando las rutas (al sobreescribir el método)
    routes(): void {

        // Ruta para obtener los usuarios
        this.router.get('/users', (req, res) => this.controller.getUsers(req, res));
        // Ruta para traer a un usuario en específico
        this.router.get('/users/:id', (req, res) => this.controller.getUserById(req, res));
        // Ruta para traer a un usuario en específico (junto con datos de su relación)
        this.router.get('/users/user-rel/:id', (req, res) => this.controller.getUserWithRelationById(req, res));
        // Ruta para crear un nuevo usuario
        // Se implementa un 'middleware' para validar los datos ingresados
        this.router.post('/users/register', (req, res, next) => [this.middleware.userValidator(req, res, next)], (req, res) => this.controller.createUser(req, res));
        // Ruta para actualizar a un usuario en específico
        // Se implementarán 2 middlewares: para chequear si el usuario está autenticado y si tiene el rol de 'ADMIN'
        this.router.put('/users/:id', this.middleware.passAuth("jwt"), (req, res, next) => [this.middleware.checkAdminRole(req, res, next)], (req, res) => this.controller.updateUser(req, res));
        // Ruta para eliminar a un usuario en específico
        // Se implementarán 2 middlewares: para chequear si el usuario está autenticado y si tiene el rol de 'ADMIN'
        this.router.delete('/users/:id', this.middleware.passAuth("jwt"), (req, res, next) => [this.middleware.checkAdminRole(req, res, next)], (req, res) => this.controller.deleteUser(req, res));
    }
}