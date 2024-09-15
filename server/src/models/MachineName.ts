import mongoose, { Schema, Document } from "mongoose";

interface IMachineName extends Document {
  name: String;
}

const machineNameSchema: Schema = new Schema({
  name: {
    Name: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<IMachineName>(
  "MachineName",
  machineNameSchema
);
