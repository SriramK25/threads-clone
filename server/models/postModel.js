import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: String,
      required: true,
      ref: "User",
    },

    postContent: {
      type: String,
      maxLength: 750,
      default: "",
    },
    postImage: {
      type: String,
      default: "",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },

    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        name: {
          type: String,
          required: true,
        },

        profilePic: {
          type: String,
          default: "",
        },
        replyText: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
