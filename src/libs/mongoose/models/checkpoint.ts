import * as yup from "yup";
import mongoose, { Model, Schema } from "mongoose";
import { TownModel } from "./town"; // Import the TownModel
import { EAST_AFRICAN_TOWNS } from "@/data/countries";

export type Checkpoint = {
  _id?: string;
  type?: string;
  town: string; // Use the ID of the Town as a reference
  name: string;
  category?: string;
  geofenceCoordinates?: string;
  latitude: number;
  longitude: number;
  description: string;
  tolerance?: number;
  radius?: number;
  contactNo: string;
  address: string;
};

// Yup Validation Schema
const checkpointSchemaValidation = yup.object().shape({
  // type: yup.string(),
  town: yup.string().required("Town is required"),
  name: yup.string().required("Name is required"),
  // category: yup.string().required("Category is required"),
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

  contactNo: yup.string().required("Contact No is required"),
  address: yup.string().required("Address is required"),
});

const checkpointSchema = new mongoose.Schema<Checkpoint>(
  {
    type: { type: String, default: "Checkpoint" },
    name: { type: String, required: true },
    // town: { type: Schema.Types.ObjectId, ref: "Town", required: true },
    category: { type: String, default: "" },
    geofenceCoordinates: { type: String, default: "" },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    description: { type: String, default: "" },
    tolerance: { type: Number, required: true, default: 0 },
    radius: { type: Number, required: true, default: 30 },
    contactNo: { type: String, required: true },
    town: {
      type: String,
      default: function () {
        return this.name || "";
      },
    },
    address: {
      type: String,
      default: function () {
        return this.name || "";
      },
    },
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
  contactNo: "",
  address: "",
};

const checkpointFormFields = [
  // Populate with Towns dynamically
  { name: "name", label: "Name", type: "text", labeled: true },
  // { name: "type", label: "Type", type: "text", labeled: true },
  // { name: "category", label: "Category", type: "text", labeled: true },
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
