import { Driver } from "@/types/nav-tel-types";
import mongoose, { Schema, Model } from "mongoose";

const driverSchema: Schema<Driver> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    driverNumber: { type: String, required: true },
    status: String,
    state: { type: String, required: true },
    city: { type: String },
    contactNumber: { type: String, required: true },
    defaultObjectNo: { type: String },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const DriverModel: Model<Driver> =
  mongoose.models?.Driver || mongoose.model<Driver>("Driver", driverSchema);

export { DriverModel };
