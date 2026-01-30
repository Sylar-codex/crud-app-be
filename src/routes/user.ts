import express from "express";
import userController from "../controllers/userController";
import { validateDto } from "../middleware/validatoDto";
import { SignupBodyDto } from "../dtos/signup.dto";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateDto(SignupBodyDto),
  userController.register,
);

export default userRouter;
