import { ref, required } from "joi";
import mongoose, { Document, Schema } from "mongoose";

interface IInvoice extends Document {
  serial: string;
  date: Date;
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  address: String;
  through: String;
  driver: mongoose.Types.ObjectId;
  vehicle: String;
  items: Array<{
    itemType: String;
    item: mongoose.Types.ObjectId;
    quantity: number;
  }>;
  comments: String;
  status: String;
}

const invoice = new Schema({
  serial: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  through: {
    type: String,
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
  vehicle: String,
  items: [
    {
      itemType: {
        type: String,
        enum: ["Machine", "Motor"],
        required: true,
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "items.itemType",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  remarks: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "delivered", "declined"],
    default: "pending",
  },
});

export default mongoose.model<IInvoice>("Invoice", invoice);