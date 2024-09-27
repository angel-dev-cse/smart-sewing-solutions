import mongoose, { Document, Schema } from "mongoose";

interface IWarehouse extends Document {
  name: string;
  warehouseType: string;
  belongsTo: Schema.Types.ObjectId;
  address: {
    building: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  manager?: Schema.Types.ObjectId;
  remarks: string;
}

const warehouseSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  warehouseType: {
    type: String,
    enum: ["Organization", "User"],
    default: "Organization",
  },
  belongsTo: {
    required: true,
    type: Schema.Types.ObjectId,
    refPath: "warehouseType",
  },
  address: {
    building: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  remarks: {
    type: String,
  },
});

export default mongoose.model<IWarehouse>("Warehouse", warehouseSchema);
