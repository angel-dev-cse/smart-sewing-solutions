import { required } from "joi";
import mongoose, { Schema, Document, mongo } from "mongoose";

interface IMachine extends Document {
  machineName: mongoose.Types.ObjectId;
  machineBrand: mongoose.Types.ObjectId;
  machineModel: mongoose.Types.ObjectId;
  serial: String;
  uniqueKey: String;
  owner: mongoose.Types.ObjectId;
  inventory: mongoose.Types.ObjectId;
  price: Number;
  rent: Number;
  tickets: [mongoose.Types.ObjectId];
  invoices: [mongoose.Types.ObjectId];
  remarks: String;
  status: String;
}

const machineSchema: Schema = new Schema({
  machineName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MachineName",
    required: true,
  },
  machineBrand: {
    type: Schema.Types.ObjectId,
    ref: "MachineBrand",
    required: true,
  },
  machineModel: {
    type: Schema.Types.ObjectId,
    ref: "MachineModel",
    required: true,
  },
  serial: {
    type: String,
    required: true,
  },
  uniqueKey: {
    type: String,
    required: true,
    unique: true,
  },
  ownerType: {
    type: String,
    enum: ["Organization", "User"],
    default: "Organization",
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    refPath: "ownerType",
  },
  inventory: { type: mongoose.Types.ObjectId, ref: "Inventory" },
  price: { type: Number, default: 0 },
  rent: { type: Number, default: 0 }, // changes based on organization (later might be an object)
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invoice" }],
  remarks: { type: String },
  status: {
    type: String,
    enum: ["active", "inactive", "defective"],
    default: "active",
  },
});

machineSchema.index({ inventory: 1 });

export default mongoose.model<IMachine>("Machine", machineSchema);
