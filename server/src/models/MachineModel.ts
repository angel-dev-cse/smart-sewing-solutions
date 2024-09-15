import mongoose, { Schema, Document } from "mongoose";

interface IMachineModel extends Document {
  name: String;
  brand: mongoose.Types.ObjectId;
}

const machineModelSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "MachineBrand",
    required: true,
  },
});

export default mongoose.model<IMachineModel>(
  "MachineModel",
  machineModelSchema
);
