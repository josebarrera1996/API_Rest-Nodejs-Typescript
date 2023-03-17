import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customers/entities/customer.entity";
import { RoleType } from "../dto/user.dto";

// Tabla 'users'
@Entity({ name: "users" })
export class UserEntity extends BaseEntity {

    @Column()
    name!: string;
  
    @Column()
    lastname!: string;
  
    @Column()
    username!: string;
  
    @Column()
    email!: string;
  
    @Column({ select: false }) // No traerá este campo
    password!: string;
  
    @Column()
    city!: string;
  
    @Column()
    province!: string;

    @Column({ type: "enum", enum: RoleType, nullable: false })
    role!: RoleType;

    // Relación con 'CustomerEntity' (de tipo bidireccional)
    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
}