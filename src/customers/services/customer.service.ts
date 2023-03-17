import { BaseService } from "../../config/base.service";
import { CustomerEntity } from "../entities/customer.entity";
import { CustomerDTO } from "../dto/customer.dto";
import { DeleteResult, UpdateResult } from "typeorm";

// Servicio para trabajar con los métodos típicos de un CRUD
export class CustomerService extends BaseService<CustomerEntity> {

    // Método constructor inicializador
    constructor() {
        super(CustomerEntity);
    }

    // Método para traer a todos los clientes
    async findAllCustomers(): Promise<CustomerEntity[]> {
        return (await this.execRepository).find();
    }

    // Método para traer a un cliente en específico (gracias a su ID)
    async findCustomerById(id: string): Promise<CustomerEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    // Método para traer a un cliente en específico (gracias a su ID) con su/s pedido/s
    async findCustomeByIdWithPurchases(id: string): Promise<CustomerEntity | null> {
        return (await this.execRepository)
            // Método para crear una instrucción SQL
            .createQueryBuilder("customer")
            // Utilizando un Left Join
            .leftJoinAndSelect("customer.purchases", "purchases") // Campo existente (customer.purchases) y campo personalizado (purchases)
            .where({ id }) // Coincidencia de ID
            .getOne();
    }

    // Método para crear un nuevo cliente
    // Uso del DTO
    async createCustomer(body: CustomerDTO): Promise<CustomerEntity> {
        return (await this.execRepository).save(body);
    }

    // Método para actualizar a un cliente en específico (gracias a su ID)
    // Uso del DTO
    async updateCustomer(
        id: string,
        infoUpdate: CustomerDTO
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    // Método para eliminar a un cliente en específico (gracias a su ID)
    async deleteCustomer(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

}