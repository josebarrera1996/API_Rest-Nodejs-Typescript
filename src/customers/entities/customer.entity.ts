import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { PurchaseEntity } from "../../purchase/entitites/purchase.entity";

// Tabla 'customers'
@Entity({ name: "customers" })
export class CustomerEntity extends BaseEntity {

    @Column()
    address!: string;

    @Column()
    dni!: number;

    // Relación con 'UserEntity' (de tipo bidireccional)
    @OneToOne(() => UserEntity, (user) => user.customer)
    @JoinColumn({ name: "user_id" }) // FK
    user!: UserEntity; 

    // Relación con 'PurchaseEntity' (de tipo bidireccional)
    @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
    purchases!: PurchaseEntity[];
}