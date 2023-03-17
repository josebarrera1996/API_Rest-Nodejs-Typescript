import { BaseRouter } from "../shared/router/router";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerMiddleware } from "./middlewares/customer.middleware";

// Definiendo la clase perteneciente a las rutas de los clientes
export class CustomerRouter extends BaseRouter<CustomerController, CustomerMiddleware> {

    // Método constructor para inicializar la clase
    constructor() {
        super(CustomerController, CustomerMiddleware); // Implementando el controller y el middleware
    }

    // Almacenando las rutas (al sobreescribir el método)
    routes(): void {

        // Ruta para obtener los clientes
        this.router.get('/customers', (req, res) => this.controller.getCustomers(req, res));
        // Ruta para traer a un cliente en específico
        this.router.get('/customers/:id', (req, res) => this.controller.getCustomerById(req, res));
        // Ruta para traer a un cliente en específico junto con su/s pedido/s
        this.router.get('/customers/purchase-rel/:id', (req, res) => this.controller.getCustomerWithRelationById(req, res));
        // Ruta para crear un nuevo cliente
        // Se implementa un 'middleware' para validar los datos
        this.router.post('/customers', (req, res, next) => [this.middleware.customerValidator(req, res, next)], (req, res) => this.controller.createCustomer(req, res));
        // Ruta para actualizar a un cliente en específico
        this.router.put('/customers/:id', (req, res) => this.controller.updateCustomer(req, res));
        // Ruta para eliminar a un cliente en específocp
        this.router.delete('/customers/:id', (req, res) => this.controller.deleteCustomer(req, res));
    }
}