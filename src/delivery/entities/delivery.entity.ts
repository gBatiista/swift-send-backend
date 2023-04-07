import { Delivery, Prisma } from '@prisma/client';

export class DeliveryEntity implements Delivery {
  id: number;
  item: string;
  status: string;
  shipper: string;
  addressee: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export class DeliveryWithUserEntity {
  id: number;
  item: string;
  status: string;
  shipper: string;
  addressee: {
    name: string;
    email: string;
    address: {
      cep: string;
      street: string;
      houseNumber: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  userId: number;
}
