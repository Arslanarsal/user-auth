import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from './product.entity'
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firsname: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column({default : "abcd"})
    password: string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Product, (Product) => Product.user)
    @JoinColumn()
    product: Product[]


    @ManyToMany(() => Product, (Product) => Product.likedBy)
    @JoinTable({ name: "user-liked-product" })
    likedProduct: Product[]


    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

}