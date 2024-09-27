import mongoose, { Document, Schema } from "mongoose";

interface IInventory extends Document {
  ownerType: string;
  owner: Schema.Types.ObjectId;
  warehouse: Schema.Types.ObjectId;
}

const inventory = new Schema({
  ownerType: {
    required: true,
    type: String,
    enum: ["Organization", "User"],
    default: "Organization",
  },
  owner: {
    required: true,
    type: Schema.Types.ObjectId,
    refPath: "ownerType",
  },
  warehouse: {
    sparse: true,
    unique: true,
    type: Schema.Types.ObjectId,
    ref: "Warehouse",
  },
});

export default mongoose.model<IInventory>("Inventory", inventory);
