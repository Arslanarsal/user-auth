import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Product } from './product.entity'

@Entity()
export class productFeature {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    bedroom: number

    @Column()
    washroom: number

    @Column()
    parkingSpots: number

    @Column()
    hasBalcony: boolean

    @Column()
    haSwimmingPool: boolean


    @OneToOne(() => Product, (Product) => Product.propertyFeature, { cascade: true })
    @JoinColumn()
    product: Product
}