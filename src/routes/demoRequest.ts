import express from "express";
import demoRequestController from "../controllers/demoRequestController";
import { authenticate } from "../middleware/authValidation";
import { validateDto } from "../middleware/validatoDto";
import { UpdateDemoRequestDto } from "../dtos/uodate-demo-request.dto";
import { CreateDemoRequestDto } from "../dtos/create-demo-request.dto";

const demoRequestRouter = express.Router();

demoRequestRouter.post(
  "/create",
  authenticate,
  validateDto(CreateDemoRequestDto),
  demoRequestController.create,
);
demoRequestRouter.get("/find-all", authenticate, demoRequestController.findAll);
demoRequestRouter.get(
  "/find-one/:id",
  authenticate,
  demoRequestController.findOne,
);
demoRequestRouter.patch(
  "/update/:id",
  authenticate,
  validateDto(UpdateDemoRequestDto),
  demoRequestController.update,
);
demoRequestRouter.delete(
  "/delete/:id",
  authenticate,
  demoRequestController.delete,
);

export default demoRequestRouter;
