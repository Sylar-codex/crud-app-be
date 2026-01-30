import { Request, Response } from "express";
import { IdParams } from "../utils/types";
import { DemoRequestModel } from "../models/demoRequestForm";
import DemoRequestService from "../services/demoRequestService";
import { UpdateDemoRequestDto } from "../dtos/uodate-demo-request.dto";
import { CreateDemoRequestDto } from "../dtos/create-demo-request.dto";

class DemoRequestController {
  constructor(private readonly demoRequestService: DemoRequestService) {}

  create = async (
    req: Request<{}, {}, CreateDemoRequestDto>,
    res: Response,
  ) => {
    try {
      const body = req.body;

      const data = await this.demoRequestService.create(body);
      return res.status(200).json({ message: "Demo request created", data });
    } catch (err: any) {
      console.log("Error:", err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  update = async (
    req: Request<IdParams, {}, UpdateDemoRequestDto>,
    res: Response,
  ) => {
    try {
      const body = req.body;
      const { id } = req.params;

      const data = await this.demoRequestService.update(id, body);
      return res.status(200).json({ message: "Demo Request updated", data });
    } catch (err: any) {
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.log("Error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  findAll = async (req: Request<{}, {}, {}>, res: Response) => {
    try {
      const data = await this.demoRequestService.findAll();
      return res
        .status(200)
        .json({ message: "Demo requests retreieved", data });
    } catch (err: any) {
      console.log("Error:", err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  findOne = async (req: Request<IdParams, {}, {}>, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.demoRequestService.findOne(id);
      return res.status(200).json({ message: "Demo request retreieved", data });
    } catch (err: any) {
      console.log("Error:", err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  delete = async (req: Request<IdParams, {}, {}>, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.demoRequestService.delete(id);
      return res.status(200).json({ message: "Demo request deleted", data });
    } catch (err: any) {
      console.log("Error:", err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
}

const demoRequestService = new DemoRequestService(DemoRequestModel);
const demoRequestController = new DemoRequestController(demoRequestService);

export default demoRequestController;
