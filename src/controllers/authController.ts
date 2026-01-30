import { Request, Response } from "express";
import AuthService from "../services/authService";
import { UserModel } from "../models/user";
import { LoginBodyDto } from "../dtos/login.dto";

class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request<{}, {}, LoginBodyDto>, res: Response) => {
    try {
      const body = req.body;

      const data = await this.authService.login(body);
      return res.status(200).json({ message: "Logged in", data });
    } catch (err: any) {
      console.log("Error:", err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
}

const authService = new AuthService(UserModel);
const authController = new AuthController(authService);

export default authController;
