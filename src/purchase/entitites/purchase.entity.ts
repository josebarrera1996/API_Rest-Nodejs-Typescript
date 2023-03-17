import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customers/entities/customer.entity";
import { PurchaseProductEntity } from "./purchases-products.entity";

// Tabla 'purchases'
@Entity({ name: "purchases" })
export class PurchaseEntity extends BaseEntity {

    @Column()
    status!: string;

    @Column()
    paymentMethod!: string;

    // Relación con 'CustomerEntity' (de tipo bidireccional)
    @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
    @JoinColumn({ name: "customer_id" }) // FK
    customer!: CustomerEntity;

    // Relación con 'PurchaseProductEntity' (de tipo bidireccional)
    @OneToMany(
        () => PurchaseProductEntity,
        (purchaseProduct) => purchaseProduct.purchase
    )
    purchaseProduct!: PurchaseProductEntity[];
}