import { Request, Response } from "express";
import { UserModel } from "../models/user";
import UserService from "../services/userService";
import { SignupBodyDto } from "../dtos/signup.dto";

class UserController {
  constructor(private readonly userService: UserService) {}

  register = async (req: Request<{}, {}, SignupBodyDto>, res: Response) => {
    try {
      const body = req.body;

      const data = await this.userService.register(body);
      return res.status(200).json({ message: "Signed Up", data });
    } catch (err: any) {
      console.log("Error:", err);

      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
}

const userService = new UserService(UserModel);
const userController = new UserController(userService);

export default userController;
