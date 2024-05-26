import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    profilePic: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    bio: {
      type: String,
      maxLength: 999,
      default: "",
    },

    followers: {
      type: [String],
      default: [],
    },

    following: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
