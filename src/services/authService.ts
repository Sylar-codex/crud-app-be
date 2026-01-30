import { JwtUserPayload } from "../utils/types";
import * as bcrypt from "bcrypt";
import { UserDocument, UserModel } from "../models/user";
import jwt from "jsonwebtoken";
import { Model } from "mongoose";
import { HttpError } from "../utils/httpError";
import { LoginBodyDto } from "../dtos/login.dto";

class AuthService {
  constructor(
    private readonly userModel: Model<UserDocument>,
    private readonly JWT_SECRET = process.env.JWT_SECRET!,
  ) {}
  async login(body: LoginBodyDto) {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email }).select("+password");

    if (!user) {
      throw new HttpError("User does not exits", 404);
    }

    const isValidPassword = await this.validatePassword(
      user.password,
      password,
    );

    if (!isValidPassword) {
      throw new HttpError("Invalid Password", 400);
    }

    const userJwt: JwtUserPayload = {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const access_token = await jwt.sign({ user: userJwt }, this.JWT_SECRET, {
      expiresIn: "30d",
    });

    const result = {
      access_token,
      user: userJwt,
    };

    return result;
  }

  async validatePassword(hashedPassword: string, plainPassword: string) {
    const isValidPassword = await bcrypt.compare(plainPassword, hashedPassword);
    if (isValidPassword) {
      return true;
    }
    return false;
  }
}

export default AuthService;
