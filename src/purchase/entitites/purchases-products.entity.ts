import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "./purchase.entity";

// Tabla personalizada (es similar a una tabla que se genera por relación de 'muchos a muchos')
// Entre las tablas 'purchases' & 'products'
@Entity({ name: "purchases_products" })
export class PurchaseProductEntity extends BaseEntity {

    @Column()
    quantityProduct!: number;

    @Column()
    totalPrice!: number;

    // Relación con 'PurchaseEntity' (de tipo bidireccional)
    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct)
    @JoinColumn({ name: "purchase_id" }) // FK
    purchase!: PurchaseEntity;

    // Relación con 'ProductEntity' (de tipo bidireccional)
    @ManyToOne(() => ProductEntity, (product) => product.purchaseProduct)
    @JoinColumn({ name: "product_id" }) // FK
    product!: ProductEntity;
}