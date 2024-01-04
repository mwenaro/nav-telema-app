import * as yup from "yup";
import mongoose, {  Schema, Model } from "mongoose";
import {EAST_AFRICAN_COUNTRIES, EAST_AFRICAN_TOWNS} from '@/data/countries'

// Define the interface for Company
export type Company = {
  _id: string;
  companyName: string;
  shortName: string;
  userName: string;
  application: string;
  userGroup: string;
  email: string;
  mobileNumber: string;
  telephoneNumber: string;
  country: string;
  state: string;
  city: string;
  monthlySmsLimit: number;
  dailySmsLimit: number;
  lastLoginTime: Date;
  userTimeZone: string;
  createdDate: Date;
  status?: boolean;
};

// Yup Validation Schema
const companySchemaValidation = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  shortName: yup.string().required("Short Name is required"),
  userName: yup.string().required("User Name is required"),
  application: yup.string().required("Application is required"),
  userGroup: yup.string().required("User Group is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: yup.string().required("Mobile Number is required"),
  telephoneNumber: yup.string(),
  country: yup.string(),
  state: yup.string(),
  city: yup.string(),
  monthlySmsLimit: yup
    .number()
    .positive("Monthly SMS Limit must be a positive number"),
  dailySmsLimit: yup
    .number()
    .positive("Daily SMS Limit must be a positive number"),
  lastLoginTime: yup.date(),
  userTimeZone: yup.string(),
  createdDate: yup.date(),
});

const companySchema = new Schema<Company>(
  {
    companyName: { type: String, required: true },
    shortName: { type: String, required: true },
    userName: { type: String, required: true },
    application: { type: String, required: true },
    userGroup: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    telephoneNumber: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    monthlySmsLimit: { type: Number },
    dailySmsLimit: { type: Number },
    lastLoginTime: { type: Date },
    userTimeZone: { type: String },
    createdDate: { type: Date },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const companyFormFields = [
  { label: 'Company Name', name: 'companyName', type: 'text' },
  { label: 'Short Name', name: 'shortName', type: 'text' },
  { label: 'User Name', name: 'userName', type: 'text' },
  { label: 'Application', name: 'application', type: 'text' },
  { label: 'User Group', name: 'userGroup', type: 'text' },
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Mobile Number', name: 'mobileNumber', type: 'text' },
  { label: 'Telephone Number', name: 'telephoneNumber', type: 'text' },
  { label: 'Country', name: 'country', type: 'select', options:EAST_AFRICAN_COUNTRIES },
  { label: 'State', name: 'state', type: 'select', options : EAST_AFRICAN_COUNTRIES },
  { label: 'City', name: 'city', type: 'select', options :EAST_AFRICAN_TOWNS.map(c=>c.town) },
  { label: 'Monthly SMS Limit', name: 'monthlySmsLimit', type: 'text', labeled:true },
  { label: 'Daily SMS Limit', name: 'dailySmsLimit', type: 'text', labeled:true },
  { label: 'Last Login Time', name: 'lastLoginTime', type: 'date' },
  { label: 'User Time Zone', name: 'userTimeZone', type: 'text' },
  { label: 'Created Date', name: 'createdDate', type: 'date' },
];




// Mongoose Model
const CompanyModel: Model<Company> =
mongoose.models?.Company || mongoose.model<Company>("Company", companySchema);

export { companySchemaValidation, CompanyModel, companyFormFields };
