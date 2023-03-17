import { BaseDTO } from "../../config/base.dto";
import { IsNotEmpty, IsOptional } from "class-validator";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "../entitites/purchase.entity";

// DTO para validar la entrada de información para la entidad 'purchases-products'
export class PurchaseProductDTO extends BaseDTO {

    @IsNotEmpty()
    quantityProduct!: number;

    @IsOptional()
    totalPrice?: number;

    @IsOptional()
    purchase?: PurchaseEntity;

    @IsOptional()
    product?: ProductEntity;
}