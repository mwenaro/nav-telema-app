import * as yup from "yup";
import mongoose, { Schema, Model } from "mongoose";
import { dbCon } from "../dbCon";
import { Town, TownModel } from "./town";

let fetchedTowns: Town[] = [];
async () => {
  await dbCon();
  fetchedTowns = await TownModel.find();
};

// Define the interface for Route
export interface Route {
  _id: string;
  name: string;
  shortName: string;
  startPoint: string | any; // Use the ID of the Town as a reference
  endPoint: string | any; // Use the ID of the Town as a reference
}

// Yup Validation Schema
const routeSchemaValidation = yup.object().shape({
  name: yup.string().required("Route Name is required"),
  shortName: yup.string().required("Short Name is required"),
  startPoint: yup.string().required("Start Point is required"),
  endPoint: yup.string().required("End Point is required"),
});

const routeSchema = new Schema<Route>(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    startPoint: { type: Schema.Types.ObjectId, ref: "Town", required: true },
    endPoint: { type: Schema.Types.ObjectId, ref: "Town", required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const routeFormFields = [
  { label: "Route Name", name: "name", type: "text" },
  { label: "Short Name", name: "shortName", type: "text" },
  {
    label: "Start Point",
    name: "startPoint",
    type: "select",
    options: (fetchedTowns ?? []).map(town=>town._id),
  }, // Populate with Towns dynamically
  {
    label: "End Point",
    name: "endPoint",
    type: "select",
    options: (fetchedTowns ?? []).map(town=>town._id),
  }, // Populate with Towns dynamically
];

// Mongoose Model
const RouteModel: Model<Route> =
  mongoose.models?.Route || mongoose.model<Route>("Route", routeSchema);

export { routeSchemaValidation, RouteModel, routeFormFields };
