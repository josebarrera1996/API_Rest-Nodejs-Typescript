import { BaseService } from "../../config/base.service";
import { UserEntity } from "../entities/user.entity";
import { RoleType, UserDTO } from "../dto/user.dto";
import * as bcrypt from "bcrypt";
import { DeleteResult, UpdateResult } from "typeorm";

// Servicio para trabajar con los métodos típicos de un CRUD
export class UserService extends BaseService<UserEntity> {

    // Método constructor inicializador
    constructor() {
        super(UserEntity);
    }

    // Método para traer a todos los usuarios
    async findAllUser(): Promise<UserEntity[]> {
        return (await this.execRepository).find();
    }

    // Método para traer a un usuario en específico (gracias a su ID)
    async findUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    // Método para traer a un usuario en específico (gracias a su ID y ROLE)
    async findUserWithRole(id: string, role: RoleType): Promise<UserEntity | null> {
        const user = (await this.execRepository)
            .createQueryBuilder("user")
            .where({ id }) // Filtro del 'id'
            .andWhere({ role }) // Filtro del 'role'
            .getOne();
        return user;
    }

    // Método para traer a un usuario en específico junto con su relación
    // Se le añade el campo 'customer' (en donde se mostrarán todos los datos de este)
    async findUserWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            // Método para crear una instrucción SQL
            .createQueryBuilder("user")
            // Utilizando un 'Left Join'
            .leftJoinAndSelect("user.customer", "customer") // Campo existente (user.customer), campo personalizado (customer)
            .where({ id }) // Coincidencia de ID
            .getOne(); // Traer solo un resultado
    }

    // Método para traer a un usuario en específico (gracias a su EMAIL)
    async findByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .addSelect("user.password") // Nos traerá el campo de la 'password'
            .where({ email }) // Filtro
            .getOne();
    }

    // Método para traer a un usuario en específico (gracias a su USERNAME)
    async findByUsername(username: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .addSelect("user.password") // Nos traerá el campo de la 'password'
            .where({ username }) // Filtro
            .getOne();
    }

    // Método para crear un nuevo usuario
    // Trabajando con su respectivo DTO
    async createUser(body: UserDTO): Promise<UserEntity> {
        // Guardar en memoria (para poder mutar lo que se guardará en la B.D)
        const newUser = (await this.execRepository).create(body);
        // Encriptar la password
        const hashPass = await bcrypt.hash(newUser.password, 10);
        // Actualizar la password (de texto plano) por la encriptada
        newUser.password = hashPass;
        // Guardar en la B.D
        return (await this.execRepository).save(newUser);
    }

    // Método para eliminar a un usuario en específico (gracias a su ID)
    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

    // Método para actualizar a un usuario en específico (gracias a su ID)
    // Trabajando con su respectivo DTO
    async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
}