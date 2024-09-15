import mongoose, { Schema, Document, mongo } from "mongoose";

interface IMachine extends Document {
  machineName: mongoose.Types.ObjectId;
  machineBrand: mongoose.Types.ObjectId;
  machineModel: mongoose.Types.ObjectId;
  serial: String;
  owner: mongoose.Types.ObjectId;
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
    unique: true,
  },
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Organization"},
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

export default mongoose.model<IMachine>("Machine", machineSchema);
