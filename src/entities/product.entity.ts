import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { productFeature } from './productsfeature.entity'
import { User } from "./user.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string


    @Column()
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price: number;


    @OneToOne(() => productFeature, (productFeature) => productFeature.product)
    @JoinColumn()
    propertyFeature: productFeature


    @ManyToOne(() => User, (User) => User.product)
    @JoinColumn()
    user: User

    @ManyToMany(() => User, (User) => User.likedProduct)
    @JoinTable({ name: "user-liked-product" })
    likedBy: User


}