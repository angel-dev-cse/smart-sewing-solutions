import mongoose, { Document, Schema } from "mongoose";

interface IOrganization extends Document {
  name: string;
  email: string;
  mobile: {
    countryCode: string;
    number: string;
  };
  address: {
    building: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  category: string[];
  inventory: mongoose.Types.ObjectId;
  documents: {
    TIN?: string;
    TRADE_LICENSE?: string;
    BIN?: string;
  };
  admin: Schema.Types.ObjectId; // Array of user IDs (admins)
  employees?: [Schema.Types.ObjectId]; // Array of user IDs (employees)
  verified: boolean;
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: {
    countryCode: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^\+\d{1,3}$/.test(v); // Example: +1, +91
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid country code!`,
      },
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^\d{7,}$/.test(v); // Example: 1234567890
        },
        message: (props: { value: any }) =>
          `${props.value} must be at least 7 digit long!`,
      },
    },
  },
  address: {
    building: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  category: [{ type: String, required: true }], // e.g., 'seller', 'renter', 'service provider', etc.
  inventory: {
    type: mongoose.Types.ObjectId,
    ref: "Inventory",
  },
  documents: {
    TIN: { type: String },
    TRADE_LICENSE: { type: String },
    BIN: { type: String },
  },
  admin: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  employees: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  verified: { type: Boolean, default: false },
  mobileVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
});

export default mongoose.model<IOrganization>(
  "Organization",
  OrganizationSchema
);
