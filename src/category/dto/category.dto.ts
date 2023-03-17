import { BaseDTO } from "../../config/base.dto";
import { IsNotEmpty } from "class-validator";

// DTO para validar la entrada de información para la entidad 'customers'
export class CategoryDTO extends BaseDTO {

    @IsNotEmpty()
    categoryName!: string;
}