import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ParseBoolPipe, UsePipes, ValidationPipe, Header, Headers } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { headerDto } from './dto/header.dto';
import { requestHeader } from './pipes/request.header';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // create(@Body() createProductDto: CreateProductDto, @requestHeader(headerDto) header: headerDto) {
  create(@Body() createProductDto: CreateProductDto) {

    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
