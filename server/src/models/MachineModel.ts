import mongoose, { Schema, Document } from "mongoose";

interface IMachineModel extends Document {
  brand: mongoose.Types.ObjectId;
  modelName: string;
}

const machineModelSchema: Schema = new Schema({
  brand: {
    type: Schema.Types.ObjectId,
    ref: "MachineBrand",
    required: true,
  },

  modelName: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<IMachineModel>(
  "MachineModel",
  machineModelSchema
);
