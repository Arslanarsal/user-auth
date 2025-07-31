import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productOrm: Repository<Product>) { }
  async create(dto: CreateProductDto) {
    return await this.productOrm.save(dto);

  }

  async findAll() {
    return await this.productOrm.find();
  }

  findOne(id: number) {
    return this.productOrm.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, dto: UpdateProductDto) {
    return this.productOrm.update({ id }, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
