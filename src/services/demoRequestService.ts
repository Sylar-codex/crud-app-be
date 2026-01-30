import { Model, Types } from "mongoose";
import { DemoRequestDocument } from "../models/demoRequestForm";
import { HttpError } from "../utils/httpError";
import { CreateDemoRequestDto } from "../dtos/create-demo-request.dto";
import { UpdateDemoRequestDto } from "../dtos/uodate-demo-request.dto";

class DemoRequestService {
  constructor(private readonly demoRequestModel: Model<DemoRequestDocument>) {}

  async create(body: CreateDemoRequestDto) {
    const demo = await this.demoRequestModel.create(body);

    return {
      message: "Form submitted successfully",
      data: demo,
    };
  }

  async findAll() {
    const demos = await this.demoRequestModel.find();

    return demos;
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpError("Invalid demo request ID", 400);
    }

    const demo = await this.demoRequestModel.findById(id);

    if (!demo) {
      throw new HttpError("Demo request not found", 404);
    }

    return demo;
  }
  async update(id: string, body: UpdateDemoRequestDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpError("Invalid demo request ID", 400);
    }

    const updatedDemo = await this.demoRequestModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDemo) {
      throw new HttpError("Demo request not found", 404);
    }

    return updatedDemo;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpError("Invalid demo request ID", 400);
    }

    const deletedDemo = await this.demoRequestModel.findByIdAndDelete(id);

    if (!deletedDemo) {
      throw new HttpError("Demo request not found", 404);
    }

    return deletedDemo;
  }
}

export default DemoRequestService;
