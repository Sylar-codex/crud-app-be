import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export interface SignupBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class SignupBodyDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
