import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    //User schema
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    isChef: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

export default UserModel;
