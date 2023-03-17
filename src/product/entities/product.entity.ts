import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { PurchaseProductEntity } from "../../purchase/entitites/purchases-products.entity";

// Tabla 'products'
@Entity({ name: "products" })
export class ProductEntity extends BaseEntity {

    @Column()
    productName!: string;
  
    @Column()
    description!: string;
  
    @Column()
    price!: number;
  
    // Relación con 'CategoryEntity' (de tipo bidireccional)
    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: "category_id" }) // FK
    category!: CategoryEntity;

    // Relación con 'PurchaseProductEntity' (de tipo bidireccional)
    @OneToMany(
        () => PurchaseProductEntity,
        (purchaseProduct) => purchaseProduct.product
      )
      purchaseProduct!: PurchaseProductEntity[];
}