import mongoose, { Document, Schema } from "mongoose";

interface IInventory extends Document {
  ownerType: string;
  owner: Schema.Types.ObjectId;
  warehouse: Schema.Types.ObjectId;
  machines: [Schema.Types.ObjectId];
}

const inventory = new Schema({
  ownerType: {
    required:true,
    type: String,
    enum: ["Organization", "User"],
    default: "Organization",
  },
  owner: {
    required:true,
    type: Schema.Types.ObjectId,
    refPath: "ownerType",
  },
  warehouse: {
    required:true,
    unique: true,
    type: Schema.Types.ObjectId,
    ref: "Warehouse",
  },
  machines: [
    {
      type: Schema.Types.ObjectId,
      ref: "Machine",
    },
  ],
});

export default mongoose.model<IInventory>("Inventory", inventory);
