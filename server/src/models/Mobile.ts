import mongoose, {Document, Schema} from "mongoose";

interface IMobile extends Document {
  countryCode: Number;
  number: Number;
}

const MobileSchema: Schema = new Schema({
  countryCode: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^\+\d{1,3}$/.test(v); // Example: +1, +91
      },
      message: (props: { value: any; }) => `${props.value} is not a valid country code!`
    }
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^\d{7,}$/.test(v); // Example: 1234567890
      },
      message: (props: { value: any; }) => `${props.value} must be at least 7 digit long!`
    }
  }
});

export default mongoose.model<IMobile>("Mobile", MobileSchema);