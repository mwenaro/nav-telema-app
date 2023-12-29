import * as yup from "yup";
import { Document, Schema, model, Model } from "mongoose";

export interface CheckPoint {
  _id?: string;
  geofenceType: string;
  name: string;
  category: string;
  cordinates: { latitude: number; longitude: number }[];
  description: string;
  tolerance: number;
  radius: number;
  geofenceTypeValue: string; // To store whether it's a Polygon or Circle
  contactNo: string;
  address: string;
}

const checkpointFormFields = [
  { type: "text", label: "Geofence Type*", name: "geofenceType" },
  { type: "text", label: "Name*", name: "name" },
  { type: "text", label: "Category", name: "category" },
  { type: "text", label: "Latitude value", name: "latitude" },
  { type: "text", label: "Logitude Value", name: "longitude" },
  { type: "text", label: "Description", name: "description" },
  { type: "number", label: "Tolerance (meter)", name: "tolerance" },
  { type: "number", label: "Radius (meter)", name: "radius" },
  { type: "text", label: "Contact No", name: "contactNo" },
  { type: "text", label: "Address", name: "address" },
];

// Yup Validation Schema
const checkPointSchemaValidation = yup.object().shape({
  geofenceType: yup.string().required("Geofence Type is required"),
  name: yup.string().required("Name is required"),
  category: yup.string(),
  latitude: yup.number().required("Latitude is required"),
  longitude: yup.number().required("Longitude is required"),
  description: yup.string(),
  tolerance: yup.number(),
  radius: yup.number(),
  geofenceTypeValue: yup.string(), // Additional field for storing the type (Polygon or Circle)
  contactNo: yup.string(),
  address: yup.string(),
});

// Mongoose Schema
// interface GeofenceModel extends Document, Geofence {}
 interface TCheckPoint  extends CheckPoint {
    coordinates: { latitude: number; longitude: number }[];
 } 

const checkPointSchema = new Schema<TCheckPoint>(
  {
    geofenceType: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String },
    coordinates: [
      {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
    ],
    description: { type: String },
    tolerance: { type: Number },
    radius: { type: Number },
    geofenceTypeValue: { type: String }, // Additional field for storing the type (Polygon or Circle)
    contactNo: { type: String },
    address: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Mongoose Model
const CheckPointModel: Model<TCheckPoint> = model(
  "CheckPointModel",
  checkPointSchema
);

export { checkPointSchemaValidation, CheckPointModel, checkpointFormFields };
