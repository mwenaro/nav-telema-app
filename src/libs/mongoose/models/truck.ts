import { Truck } from "@/types/nav-tel-types";
import mongoose,{ Model } from "mongoose";



const truckSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    plateNumber: { type: String, required: true },
    objectModel: { type: String },
    simCardNumber: { type: String },
    secondarySimNumber: { type: String },
    imeiNumber: { type: String, required: true },
    objectCategory: { type: String },
    objectAxel: { type: String },
    manufactureDate: { type: String },
    purchaseDate: { type: String },
    gpsInstallationDate: { type: String },
    gpsWarranty: { type: String },
    chassisNumber: { type: String },
    engineNumber: { type: String },
    odometer: { type: String },
    passengerSeatCount: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);




const TruckModel: Model<Truck> =
  mongoose.models.Truck || mongoose.model<Truck>("Truck", truckSchema);

export { TruckModel };
