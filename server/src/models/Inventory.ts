import mongoose, { Document, Schema } from "mongoose";

interface IInventory extends Document {
  machines: [mongoose.Types.ObjectId];
}

const inventory = new Schema({
  machines: [
    {
      type: Schema.Types.ObjectId,
      ref: "Machine",
    },
  ],
});
