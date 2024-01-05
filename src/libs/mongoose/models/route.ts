import * as yup from "yup";
import mongoose, { Schema, Model } from "mongoose";
import { EAST_AFRICAN_TOWNS } from "@/data/countries";

// Define the interface for Route
export interface Route {
  _id?: string;
  name: string;
  shortName: string;
  startPoint: string | any;
  endPoint: string | any;
}

// Yup Validation Schema
const routeSchemaValidation = yup.object().shape({
  name: yup.string().required("Route Name is required"),
  shortName: yup.string().required("Short Name is required"),
  startPoint: yup.string().required("Start Point is required"),
  endPoint: yup.string().required("End Point is required"),
});

// Initial values for the Route model
const initialRouteValues: Route = {
  name: "",
  shortName: "",
  startPoint:  "",
  endPoint:  "",
};

const routeSchema = new Schema<Route>(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    startPoint: { type: String },
    endPoint: { type: String },
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
    options: EAST_AFRICAN_TOWNS.map((c) => c.town),
  },
  {
    label: "End Point",
    name: "endPoint",
    type: "select",
    options: EAST_AFRICAN_TOWNS.map((c) => c.town),
  },
];

// Mongoose Model
const RouteModel: Model<Route> =
  mongoose.models?.Route || mongoose.model<Route>("Route", routeSchema);

export { routeSchemaValidation, RouteModel, routeFormFields, initialRouteValues };
