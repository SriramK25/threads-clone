import Post from "../models/postModel.js";
import User from "../models/userModel.js";

async function createPost(request, response) {
  try {
    // GET DATA FROM REQUEST BODY
    const { postedBy, postContent, postImage } = request.body;

    if (!postedBy || !postContent) {
      return response.status(400).json({
        status: "failed",
        message: "User must be Authorized / Post must have some Descriptions",
      });
    }

    const user = await User.findById(postedBy);

    // IF POSTED BY ID AND LOGGED IN USER ID ARE NOT SAME, THES RESPONSE 400 (BAD REQUEST)
    if (postedBy !== request.user._id.toString()) {
      return response.status(400).json({
        status: "failed",
        message: "Cannot Post for someone else",
      });
    }

    // CREATE NEW POST WITH POST MODEL
    const newPost = Post({ postedBy, postImage, postContent });

    // SAVE IN POSTS COLLECTION
    await newPost.save();

    // SEND 200 (SUCCESS) RESPONSE
    response.status(201).json({ status: "success", post: newPost });
  } catch (error) {
    return response.status(404).json({
      status: "failed",
      message: "User not found",
      errMsg: error.message,
    });
  }
}

async function getPost(request, response) {
  try {
    const { id } = request.params;

    const post = await Post.findById(id);

    if (!post) {
      response
        .status(404)
        .json({ status: "failed", message: "Post not found" });
    }

    response.status(200).json({ status: "success", post });
  } catch (error) {
    response.status(404).json({
      status: "failed",
      message: error.message,
      summary: "from getPost catchBlock Post not found",
    });
  }
}

async function deletePost(request, response) {
  try {
    // GET POST ID FROM BROWSER URL
    const { id: postId } = request.params;

    // FIND THE POST ON DB
    const post = await Post.findById(postId);

    // IF POST.POSTEDBY ID NOT MATCHED WITH CURRENT USER
    if (post.postedBy.toString() !== request.user._id.toString()) {
      return response
        .status(401)
        .json({ status: "failed", message: "Cannot delete others post" });
    }

    // DELETE POST
    await Post.findByIdAndDelete(postId);

    // SEND 200 (SUCCESS) RESPONSE
    response
      .status(200)
      .json({ status: "success", message: "Post deleted successfully" });
  } catch (error) {
    response.status(404).json({ status: "failed", message: "Post not found" });
  }
}

async function likePost(request, response) {
  try {
    const { id } = request.params;

    const post = await Post.findById(id);

    post.likes.includes(request.user._id)
      ? await Post.findByIdAndUpdate(id, {
          $pull: { likes: request.user._id },
        })
      : await Post.findByIdAndUpdate(id, {
          $push: { likes: request.user._id },
        });

    response.status(200).json({ status: "success", message: "Done" });
  } catch (error) {
    response.status(404).json({
      status: "failed",
      message: "Post Not Found",
      summary: error.message,
    });
  }
}

async function replyPost(request, response) {
  try {
    const { id: postId } = request.params;

    const { _id: userId, username, name, profilePic } = request.user;

    const { replyText } = request.body;

    if (!replyText) {
      return response
        .status(401)
        .json({ status: "failed", message: "Reply cannot be empty" });
    }

    const post = await Post.findById(postId);

    const reply = {
      userId,
      name,
      username,
      profilePic,
      replyText,
    };

    post.replies.unshift(reply);

    await post.save();

    response.status(201).json({ status: "success", reply });
  } catch (error) {
    response.status(404).json({
      status: "failed",
      message: "Post Not Found",
      summary: error.message,
    });
  }
}

async function feedPosts(request, response) {
  try {
    const userId = request.user._id;

    const user = await User.findOne({ _id: userId });

    // console.log(userId);
    // console.log(user);
    // response.status(200).json({ status: "success", user });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    const following = user.following;

    const feedPost = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    response.status(200).json({ status: "success", feedPost });
  } catch (error) {
    response.status(404).json({
      status: "failed",
      message: "No Post from following",
      summary: error.message,
    });
  }
}

async function getAllPosts(request, response) {
  try {
    const { userId } = request.params;

    const posts = await Post.find({ postedBy: userId }).sort({ createdAt: -1 });

    response.status(200).json({ status: "success", posts });
  } catch (error) {
    response.status(500).json({ status: "failed", message: error });
  }
}

export {
  createPost,
  getPost,
  deletePost,
  likePost,
  replyPost,
  feedPosts,
  getAllPosts,
};
