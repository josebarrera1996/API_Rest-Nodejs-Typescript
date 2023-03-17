import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { UserEntity } from "../../users/entities/user.entity";

// DTO para validar la entrada de información para la entidad 'customers'
export class CustomerDTO extends BaseDTO {

    @IsNotEmpty()
    address!: string;

    @IsNotEmpty()
    dni!: number;

    @IsNotEmpty() // FK
    user!: UserEntity;
}