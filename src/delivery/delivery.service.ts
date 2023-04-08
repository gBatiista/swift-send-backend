import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryDto, AddresseeDto } from './dto/create-delivery.dto';
import { DeliveryWithUserEntity } from './entities/delivery.entity';
import axios from 'axios';
import { UserWithoutPasswordEntity } from 'src/user/entities/user.entity';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDeliveryDto: CreateDeliveryDto & { addressee: AddresseeDto },
    user: UserWithoutPasswordEntity,
  ) {
    const {
      addressee: {
        address: { cep },
      },
    } = createDeliveryDto;
    const { addressee } = createDeliveryDto;

    try {
      const URL = `https://viacep.com.br/ws/${cep}/json/`;
      const {
        data: { uf, localidade, bairro },
      } = await axios.get(URL);

      const completeAddress = {
        ...addressee.address,
        state: uf,
        city: localidade,
        district: bairro,
      };

      const completeDeliveryDto = {
        ...createDeliveryDto,
        addressee: { ...addressee, address: completeAddress },
        userId: user.id,
      };

      return this.prisma.delivery.create({
        data: completeDeliveryDto,
      });
    } catch (error) {
      throw new HttpException('CEP does not exist', 400);
    }
  }

  async findByAddressee(addressee: string) {
    const info = (await this.prisma.delivery.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
          },
        },
      },
    })) as DeliveryWithUserEntity[];

    const filterByAddressee = info.filter(e =>
      e.addressee.name.includes(addressee),
    );

    const result = filterByAddressee.map(e => {
      delete e.userId;
      return e;
    });

    return result;
  }

  async findByShipper(shipper: string) {
    const info = await this.prisma.delivery.findMany({
      where: {
        shipper: {
          contains: shipper,
        },
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
          },
        },
      },
    });

    const result = info.map(e => {
      delete e.userId;
      return e;
    });

    return result;
  }

  async findByItem(item: string) {
    const info = await this.prisma.delivery.findMany({
      where: {
        item: {
          contains: item,
        },
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
          },
        },
      },
    });

    const result = info.map(e => {
      delete e.userId;
      return e;
    });

    return result;
  }

  async findAll() {
    const info = await this.prisma.delivery.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
          },
        },
      },
    });

    const result = info.map(e => {
      delete e.userId;
      return e;
    });

    return result;
  }

  async findOne(id: number) {
    const info = await this.prisma.delivery.findUniqueOrThrow({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
          },
        },
      },
    });

    delete info.userId;

    return info;
  }

  cancel(id: number) {
    return this.prisma.delivery.update({
      where: { id },
      data: {
        status: 'canceled',
      },
    });
  }

  delivered(id: number) {
    return this.prisma.delivery.update({
      where: { id },
      data: {
        status: 'delivered',
      },
    });
  }

  remove(id: number, user: UserWithoutPasswordEntity) {
    const { isAdmin } = user;

    if (!isAdmin) {
      return new UnauthorizedException();
    }

    return this.prisma.delivery.delete({
      where: { id },
    });
  }
}
