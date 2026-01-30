import express from "express";
import authController from "../controllers/authController";
import { LoginBodyDto } from "../dtos/login.dto";
import { validateDto } from "../middleware/validatoDto";

const authRouter = express.Router();

authRouter.post("/login", validateDto(LoginBodyDto), authController.login);

export default authRouter;
