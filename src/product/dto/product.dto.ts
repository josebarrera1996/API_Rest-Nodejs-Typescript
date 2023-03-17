import { BaseDTO } from "../../config/base.dto";
import { IsNotEmpty } from "class-validator";
import { CategoryEntity } from "../../category/entities/category.entity";

// DTO para validar la entrada de información para la entidad 'products'
export class ProductDTO extends BaseDTO {

    @IsNotEmpty()
    productName!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    category!: CategoryEntity;
}