import mongoose, {Document, Schema} from "mongoose";

interface IOrganization extends Document {
  name: string;
  email: string;
  mobile: string;
  address: string;
  category: string[];
  documents: {
    TIN: string;
    TRADE_LICENSE: string;
    BIN: string;
  };
  admin: mongoose.Types.ObjectId[]; // Array of user IDs (admins)
  employees: mongoose.Types.ObjectId[]; // Array of user IDs (employees)
  verified: boolean;
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  category: [{ type: String, required: true }], // e.g., 'seller', 'renter', 'service provider', etc.
  documents: {
    TIN: { type: String, required: true },
    TRADE_LICENSE: { type: String, required: true },
    BIN: { type: String},
  },
  admin: { type: mongoose.Types.ObjectId, ref: 'User' },
  employees: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  verified: { type: Boolean, default: false },
});

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);
