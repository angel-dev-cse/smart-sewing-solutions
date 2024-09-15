import mongoose, { Schema, Document } from "mongoose";

interface IMachineBrand extends Document {
  name: string;
}

const machineBrandSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<IMachineBrand>(
  "MachineBrand",
  machineBrandSchema
);
