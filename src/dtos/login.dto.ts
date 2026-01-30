import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginBodyDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
