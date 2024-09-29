import mongoose, { Document, Schema } from "mongoose";

interface IInventory extends Document {
  ownerType: string;
  owner: Schema.Types.ObjectId;
  warehouse: Schema.Types.ObjectId;
}

const inventorySchema = new Schema({
  ownerType: {
    type: String,
    required: true,
    enum: ["Organization", "User"],
    default: "Organization",
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "ownerType",
  },
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: "Warehouse",
    sparse: true,
    unique: true,
  },
});

export default mongoose.model<IInventory>("Inventory", inventorySchema);
