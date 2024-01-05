import * as yup from "yup";
import mongoose, { Model, Schema } from "mongoose";
import { TownModel } from "./town"; // Import the TownModel
import { EAST_AFRICAN_TOWNS } from "@/data/countries";

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
    // town: { type: Schema.Types.ObjectId, ref: "Town", required: true },
    town: { type: String, required: true },
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

const checkpointFormFields = [
  // Populate with Towns dynamically
  { name: "name", label: "Name", type: "text", labeled: true },
  { name: "type", label: "Type", type: "text", labeled: true },
  { name: "category", label: "Category", type: "text", labeled: true },
  {
    name: "town",
    label: "Town",
    type: "select",
    options: EAST_AFRICAN_TOWNS.map((c) => c.town),
    labeled: true,
  },
  // { name: "geofenceCoordinates", label: "Geofence Coordinates", type: "text" },
  { name: "latitude", type: "number", label: "Latitude", labeled: true },

  { name: "longitude", type: "number", label: "Longitude", labeled: true },
  { name: "description", label: "Description", type: "text", labeled: true },
  {
    name: "tolerance",
    label: "Tolerance (meter)",
    type: "text",
    labeled: true,
  },
  { name: "radius", label: "Radius (meter)", type: "text", labeled: true },
  { name: "geofenceType", label: "Geofence Type", type: "text", labeled: true },
  { name: "contactNo", label: "Contact No", type: "text", labeled: true },
  { name: "address", label: "Address", type: "text", labeled: true },
];

const CheckpointModel: Model<Checkpoint> =
  mongoose.models?.Checkpoint ||
  mongoose.model<Checkpoint>("Checkpoint", checkpointSchema);

export {
  checkpointSchemaValidation,
  CheckpointModel,
  checkpointFormFields,
  initialCheckpointValues,
};
