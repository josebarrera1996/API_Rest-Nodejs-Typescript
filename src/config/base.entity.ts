import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// Clase abstracta que servirá como base con campos genéricos
// Campos -> id, created_at y updated_at
export abstract class BaseEntity {

    @PrimaryGeneratedColumn("uuid") // PK
    id!: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
    })
    updatedAt!: Date;
}