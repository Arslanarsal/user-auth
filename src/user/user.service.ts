import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {

  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findByEmail(email: string): Promise<any> {
    return this.userRepo.findOne({
      where: {
        email: email
      }
    })
  }

  findOne(id: number) {
    return this.userRepo.findOne({
      where: {
        id: id
      },
      select: ["firsname", "lastname", "email"]
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
