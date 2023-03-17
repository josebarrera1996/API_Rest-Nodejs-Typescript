import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/product.entity";

// Tabla 'categories'
@Entity({ name: "categories" })
export class CategoryEntity extends BaseEntity {

    @Column()
    categoryName!: string;

    // Relación con 'ProductEntity' (de tipo bidireccional)
    @OneToMany(() => ProductEntity, (product) => product.category)
    products!: ProductEntity[];
}