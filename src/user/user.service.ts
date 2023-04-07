import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithDeliveryEntity } from './entities/userWithDelivery.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      },
    });
  }

  async findToLogin(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOne(id: number): Promise<UserWithDeliveryEntity> {
    const info = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        deliveries: true,
      },
    });
    const fullDeliveryInfo = info.deliveries;
    const deliveries = fullDeliveryInfo.map(e => {
      delete e.userId;
      return e;
    });

    const result = { ...info, deliveries };
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
