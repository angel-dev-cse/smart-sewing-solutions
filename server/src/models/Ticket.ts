import { ref, required } from "joi";
import mongoose, { Document, Schema } from "mongoose";

interface ITicket extends Document {
  date: Date;
  createdBy: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  item: mongoose.Types.ObjectId;
  issue: String;
  purchases: [mongoose.Types.ObjectId];
  expenses: [mongoose.Types.ObjectId];
  status: String;
  remarks: String;
}

const ticket = new Schema({
  date: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  purchases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase",
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  status: {
    type: String,
    enum: ["pending", "resolved", "declined"],
    default: "pending",
  },
  remarks: {
    type: String,
  },
});

export default mongoose.model<ITicket>("Ticket", ticket);