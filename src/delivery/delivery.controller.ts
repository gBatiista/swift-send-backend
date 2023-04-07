import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { AddresseeDto, CreateDeliveryDto } from './dto/create-delivery.dto';

@Controller('/')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  create(
    @Body()
    createDeliveryDto: CreateDeliveryDto & {
      addressee: AddresseeDto;
    },
  ) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Get()
  find(@Query() query: { addressee: string; item: string; shipper: string }) {
    if (query.addressee) {
      return this.deliveryService.findByAddressee(query.addressee);
    }

    if (query.item) {
      return this.deliveryService.findByItem(query.item);
    }

    if (query.shipper) {
      return this.deliveryService.findByShipper(query.shipper);
    }

    return this.deliveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  @Patch('/cancel/:id')
  cancel(@Param('id') id: string) {
    return this.deliveryService.cancel(+id);
  }

  @Patch('/delivered/:id')
  delivered(@Param('id') id: string) {
    return this.deliveryService.delivered(+id);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(+id);
  }
}
