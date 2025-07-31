import { IsNumber, IsString } from "class-validator"


export class CreateProductDto {
    @IsString()
    name: string

    @IsNumber()
    number: Number

    @IsString()
    description: string
}
