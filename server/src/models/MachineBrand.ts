import mongoose, { Schema, Document } from "mongoose";

interface IMachineBrand extends Document {
  brand: string;
}

const machineBrandSchema: Schema = new Schema({
  brand: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<IMachineBrand>(
  "MachineBrand",
  machineBrandSchema
);
