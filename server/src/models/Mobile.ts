import mongoose, {Document, Schema} from "mongoose";

interface IMobile extends Document {
  countryCode: Number;
  number: Number;
}

const MobileSchema:Schema = new Schema({
  countryCode: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IMobile>("Mobile", MobileSchema);