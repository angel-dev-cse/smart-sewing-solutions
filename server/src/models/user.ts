import mongoose, { Schema, Document } from "mongoose";
import { Roles } from "./Role";
import bcrypt from "bcrypt";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  mobile: string;
  NID?: string;
  roles: Array<{
    organizationId: mongoose.Types.ObjectId;
    role: string;
  }>;
  emailVerified: boolean;
  mobileVerified: boolean;
  NIDVerified: boolean;
}

// Declare the Schema of the Mongo model
var userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      unique: true,
    },
    NID: {
      type: String,
      unique: true,
      sparse: true,
    },
    roles: [
      {
        organizationId: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        role: {
          type: String,
          enum: Object.values(Roles),
          required: true,
        },
      },
    ],
    emailVerified: {
      type: Boolean,
      default: false,
    },
    mobileVerified: {
      type: Boolean,
      default: false,
    },
    NIDVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//Export the model
const User = mongoose.model<IUser>("User", userSchema);

export default User;