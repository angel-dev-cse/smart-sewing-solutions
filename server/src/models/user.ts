import mongoose, { Schema, Document } from "mongoose";
import { Roles } from "./Role";
import bcrypt from "bcrypt";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  mobile: {
    countryCode: string;
    number: string;
  },
  NID?: string;
  roles: Array<{
    organizationId: mongoose.Schema.Types.ObjectId;
    role: string;
  }>;
  emailVerified: boolean;
  mobileVerified: boolean;
  NIDVerified: boolean;
  passwordResetToken: string;
  passwordResetTokenExpires: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
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
      countryCode: {
        type: String,
        required: true,
        validate: {
          validator: function (v: string) {
            return /^\+\d{1,3}$/.test(v); // Example: +1, +91
          },
          message: (props: { value: any }) =>
            `${props.value} is not a valid country code!`,
        },
      },
      number: {
        type: String,
        required: true,
        validate: {
          validator: function (v: string) {
            return /^\d{7,}$/.test(v); // Example: 1234567890
          },
          message: (props: { value: any }) =>
            `${props.value} must be at least 7 digit long!`,
        },
      },
    },
    NID: {
      type: String,
      unique: true,
      sparse: true,
    },
    roles: [
      {
        organizationId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        role: {
          type: String,
          enum: Object.values(Roles),
          required: true,
        },
      },
    ],
    SYSTEM_ADMIN: {
      type: Boolean,
      default: false,
    },
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
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Export the model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
