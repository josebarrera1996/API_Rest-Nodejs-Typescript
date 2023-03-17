import { BaseDTO } from "../../config/base.dto";
import { IsNotEmpty } from "class-validator";
import { CustomerEntity } from "../../customers/entities/customer.entity";

// DTO para validar la entrada de información para la entidad 'purchases'
export class PurchaseDTO extends BaseDTO {

    @IsNotEmpty()
    status!: string;

    @IsNotEmpty()
    paymentMethod!: string;

    @IsNotEmpty()
    customer!: CustomerEntity;
}