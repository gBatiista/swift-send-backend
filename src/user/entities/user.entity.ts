import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export class UserWithoutPasswordEntity {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}
