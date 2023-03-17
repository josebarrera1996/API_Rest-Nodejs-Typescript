import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../config/base.dto';

// DTO para validar la entrada de información para la entidad 'users'
export class UserDTO extends BaseDTO {
    
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastname!: string;

    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    city!: string;

    @IsNotEmpty()
    province!: string;

    @IsNotEmpty()
    role!: RoleType;
}

// Tipos de roles
export enum RoleType {
    USER = "USER",
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN"
}