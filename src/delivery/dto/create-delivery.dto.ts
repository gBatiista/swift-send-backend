import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @IsString()
  cep: string;
  @IsString()
  street: string;
  @IsString()
  houseNumber: string;
}

export class AddresseeDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsNotEmptyObject()
  address: AddressDto;
}

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  item: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsNotEmpty()
  shipper: string;

  @ValidateNested({ each: true })
  @Type(() => AddresseeDto)
  @IsNotEmptyObject()
  addressee: AddresseeDto;
}
