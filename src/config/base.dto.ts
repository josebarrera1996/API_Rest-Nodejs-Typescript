import { IsDate, IsOptional, IsUUID } from "class-validator";

// DTO Genérico
// Necesario para validar la información que va a entrar en cada entidad
// En este caso: id, createdAt & updatedAt
export class BaseDTO {

    @IsUUID()
    @IsOptional()
    id!: string;

    @IsDate()
    @IsOptional()
    createdAt!: Date;

    @IsDate()
    @IsOptional()
    updatedAt!: Date;
}