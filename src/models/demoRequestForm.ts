import { Schema, model, Document } from "mongoose";

export interface DemoRequestDocument extends Document {
  companyName: string;
  jobTitle: string;
  country: string;
  phoneNumber: string;
  companyWebsite: string;
}

const DemoRequestSchema = new Schema<DemoRequestDocument>({
  companyName: {
    type: String,
    required: true,
  },

  jobTitle: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  companyWebsite: {
    type: String,
  },
});

export const DemoRequestModel = model<DemoRequestDocument>(
  "demo_request",
  DemoRequestSchema,
);
