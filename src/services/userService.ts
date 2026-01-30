import { JwtUserPayload } from "../utils/types";
import * as bcrypt from "bcrypt";
import { UserDocument, UserModel } from "../models/user";
import { Model } from "mongoose";
import { HttpError } from "../utils/httpError";
import { SignupBodyDto } from "../dtos/signup.dto";

class UserService {
  constructor(private readonly userModel: Model<UserDocument>) {}

  async register(body: SignupBodyDto) {
    const { email, password } = body;

    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new HttpError("User with email already exists", 400);
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userModel.create({
      ...body,
      password: hashedPassword,
    });

    return newUser;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}

export default UserService;
