import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Request } from 'express';

@Controller('/')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  create(
    @Body() createDeliveryDto: CreateDeliveryDto,
    @Req() req: Request & { user },
  ) {
    return this.deliveryService.create(createDeliveryDto, req.user);
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
  remove(@Param('id') id: string, @Req() req: Request & { user }) {
    return this.deliveryService.remove(+id, req.user);
  }
}
