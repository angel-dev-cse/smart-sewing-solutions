import mongoose, {Document, Schema} from "mongoose";

interface IDriver extends Document {
  name: String;
  mobile: mongoose.Types.ObjectId;
}

const driverSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Schema.Types.ObjectId,
    ref: "Mobile",
    required: true,
  },
});

export default mongoose.model<IDriver>("Driver", driverSchema);