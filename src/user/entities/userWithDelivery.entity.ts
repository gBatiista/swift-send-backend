import { Prisma } from '@prisma/client';

class userDelivery {
  id: number;
  item: string;
  status: string;
  shipper: string;
  addressee: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
}

export class UserWithDeliveryEntity {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  deliveries: userDelivery[];
}
