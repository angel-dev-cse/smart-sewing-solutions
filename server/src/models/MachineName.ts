import mongoose, { Schema, Document } from "mongoose";

interface IMachineName extends Document {
  name: string;
}

const machineNameSchema: Schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export default mongoose.model<IMachineName>(
  "MachineName",
  machineNameSchema
);
