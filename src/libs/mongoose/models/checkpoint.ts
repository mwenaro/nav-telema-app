import * as yup from "yup";
import mongoose, { Model, Schema } from "mongoose";
import { TownModel } from "./town"; // Import the TownModel

export type Checkpoint = {
  _id?: string;
  type: string;
  town: string | any; // Use the ID of the Town as a reference
  name: string;
  category: string;
  geofenceCoordinates?: string;
  latitude: number;
  longitude: number;
  description: string;
  tolerance: number;
  radius: number;
  geofenceType: string;
  contactNo: string;
  address: string;
};

// Yup Validation Schema
const checkpointSchemaValidation = yup.object().shape({
  type: yup.string().required("Type is required"),
  town: yup.string().required("Town is required"),
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
  // geofenceCoordinates: yup
  //   .string()
  //   .required("Geofence Coordinates are required"),
  description: yup.string().required("Description is required"),
  latitude: yup
    .number()
    .typeError("Tolerance must be a number")
    .required("Tolerance is required"),
  longitude: yup
    .number()
    .typeError("Tolerance must be a number")
    .required("Tolerance is required"),
  tolerance: yup
    .number()
    .typeError("Tolerance must be a number")
    .required("Tolerance is required")
    .positive("Tolerance must be a positive number"),
  radius: yup
    .number()
    .typeError("Radius must be a number")
    .required("Radius is required")
    .positive("Radius must be a positive number"),
  geofenceType: yup.string().required("Geofence Type is required"),
  contactNo: yup.string().required("Contact No is required"),
  address: yup.string().required("Address is required"),
});

const checkpointSchema = new mongoose.Schema<Checkpoint>(
  {
    type: { type: String, required: true },
    town: { type: Schema.Types.ObjectId, ref: "Town", required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    geofenceCoordinates: { type: String, default: "" },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    description: { type: String, required: true },
    tolerance: { type: Number, required: true },
    radius: { type: Number, required: true },
    geofenceType: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const initialCheckpointValues: Checkpoint = {
  type: "",
  town: "", // Set to the default town ID or leave it empty
  name: "",
  latitude: 0,
  longitude: 0,
  category: "",
  // geofenceCoordinates: '',
  description: "",
  tolerance: 0, // Set to the default tolerance or leave it at 0
  radius: 0, // Set to the default radius or leave it at 0
  geofenceType: "",
  contactNo: "",
  address: "",
};

const checkPointFormFields = [
  { name: "type", label: "Type", type: "text" },
  { name: "town", label: "Town", type: "select", options: [] }, // Populate with Towns dynamically
  { name: "name", label: "Name", type: "text" },
  { name: "category", label: "Category", type: "text" },
  // { name: "geofenceCoordinates", label: "Geofence Coordinates", type: "text" },
  { name: "latitude", type: "number", label: "Latitude" },
  { name: "logitude", type: "number", label: "Logitude" },
  { name: "description", label: "Description", type: "text" },
  { name: "tolerance", label: "Tolerance (meter)", type: "text" },
  { name: "radius", label: "Radius (meter)", type: "text" },
  { name: "geofenceType", label: "Geofence Type", type: "text" },
  { name: "contactNo", label: "Contact No", type: "text" },
  { name: "address", label: "Address", type: "text" },
];

const CheckpointModel: Model<Checkpoint> =
  mongoose.models?.Checkpoint ||
  mongoose.model<Checkpoint>("Checkpoint", checkpointSchema);

export {
  checkpointSchemaValidation,
  CheckpointModel,
  checkPointFormFields,
  initialCheckpointValues,
};
