import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/userModel.js";
import generateJwtAndSetCookie from "../helpers/generateJwtAndSetCookie.js";
import hashPassword from "../helpers/hashPassword.js";

async function signupUser(request, response) {
  try {
    const { name, username, email, password } = request.body;

    // SEARCH FOR USER OBJ WITH EMAIL/USERNAME IN REQUEST BODY
    const isUserAlreadyExistInDB = await User.findOne({
      $or: [{ email }, { username }],
    });

    // SEND 409 (DUPLICATE/CONFLICT) RESPONSE AND EXIT
    if (isUserAlreadyExistInDB) {
      response
        .status(409)
        .json({ status: "failed", message: "User already exist" });
      return;
    }

    // HASH THE PASSWORD
    const hashedPassword = await hashPassword(password);

    // CREATE NEW USER
    const newUser = User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // SAVE NEW USER IN DB UNDER USERS COLLECTION
    await newUser.save();

    // GENERATE JWT TOKEN AND SET TOKEN IN COOKIE
    generateJwtAndSetCookie(newUser._id, response);

    // SEND 201 (CREATED) RESPONSE
    response.status(201).json({
      status: "success",
      _id: newUser._id,
      name,
      username,
      email,
    });
  } catch (error) {
    response.status(409).json({ status: "failed", message: error.message });
  }
}

async function loginUser(request, response) {
  try {
    const { email, password } = request.body;

    // FIND USER WITH EMAIL IN DB
    const user = await User.findOne({ email });

    // WHEN NO EMAIL MATCH WITH USER EMAIL
    if (!user) {
      return response.status(404).json({
        status: "failed",
        message: `User not found`,
      });
    }

    // CHECK PASSWORD
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    // IF WRONG PASSWORD
    if (!isCorrectPassword) {
      return response.status(400).json({
        status: "failed",
        message: "Incorrect password",
      });
    }

    // GENERATE JWT TOKEN AND SET IT IN COOKIES
    generateJwtAndSetCookie(user._id, response);

    // SENDING 200 (SUCCESS) RESPONSE IF EVERYTHING IS OK
    if (user && isCorrectPassword) {
      return response.status(200).json({
        status: "success",
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

function logoutUser(request, response) {
  try {
    // GET COOKIE DATA FROM REQUEST AND EMPTY THE TOKEN
    // IF EMPTY/NO TOKEN, THE USER IS NOT AUTHORIZED
    response.cookie("token", "", { maxAge: 10 });
    response
      .status(200)
      .json({ status: "success", message: "User logedout successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

async function followAndUnfollowUser(request, response) {
  try {
    // GETTING ID FROM BROWSER URL
    const { id: url_Id } = request.params;

    // GETTING THE USER PROFILE TO FOLLOW
    const userToFollow = await User.findById(url_Id);

    // ITS THE USER WHO CLICK THE FOLLOW BUTTON
    const nativeUser = await User.findById(request.user._id);

    if (!userToFollow) {
      return response
        .status(400)
        .json({ message: "Cannot follow this user", status: "failed" });
    }

    // IF USER TRY TO FOLLOW THEMSELF SEND 400 (BAD REQUEST)
    if (userToFollow.username === nativeUser.username) {
      return response.status(400).json({
        status: "failed",
        message: "Cannot follow/unfollow yourself",
      });
    }

    // CHECK IF THE USER ALREADY FOLLOW THEM
    const isFollowing = nativeUser.following.includes(url_Id);

    // IS USER ALREADY FOLLOW THEM THEN UNFOLLOW ELSE FOLLOW
    if (isFollowing) {
      await User.findByIdAndUpdate(nativeUser._id, {
        $pull: { following: url_Id },
      });
      await User.findByIdAndUpdate(url_Id, {
        $pull: { followers: nativeUser._id },
      });
      // RESPONSE 200 (SUCCESS) AFTER EVERYTHING IS OK

      response.status(200).json({
        message: "unfollowed",
      });
    } else {
      await User.findByIdAndUpdate(nativeUser._id, {
        $push: { following: url_Id },
      });
      await User.findByIdAndUpdate(url_Id, {
        $push: { followers: nativeUser._id },
      });
      // RESPONSE 200 (SUCCESS) AFTER EVERYTHING IS OK

      response.status(200).json({
        message: "followed",
      });
    }
  } catch (error) {
    response.status(500).json({ error: error.message, message: "Invalid ID" });
  }
}

async function updateUser(request, response) {
  // GETTING ID FROM BROWSER URL
  const { id: url_Id } = request.params;

  // DESTRUCTUTING NECESSARY FIELDS FROM REQUEST BODY
  const { name, username, bio } = request.body;
  let { profilePic } = request.body;

  try {
    // GETTING THE USER
    let user = await User.findById(url_Id);

    // SEND 400 (BAD RESPONSE) IF BROWSER URL AND CURRENT USER URL IS NOT MATCHED
    if (url_Id !== request.user._id.toString()) {
      return response.status(400).json({
        status: "failed",
        message: "Cannot update other user's profile",
      });
    }

    if (profilePic) {
      if (user.profilePic !== "") {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }

      const uploadedImage = await cloudinary.uploader.upload(profilePic);

      profilePic = uploadedImage.secure_url;
      console.log("ProfilePIC=>", profilePic);
    }

    // ELSE UPDATE THE FIELDS
    user.name = name || user.name;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    // SAVE CHANGES
    await user.save();

    // SEND 200 (SUCCESS) RESPONSE
    response.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: error.message, summary: "Invalid ID" });
  }
}

async function getUserProfile(request, response) {
  const { id } = request.params;
  const user = await User.findById(id).select("-password");

  response.status(200).json({
    status: "success",
    user,
  });

  try {
  } catch (error) {
    response
      .status(500)
      .json({ message: error.message, summary: "Invalid ID" });
  }
}
export {
  signupUser,
  loginUser,
  logoutUser,
  followAndUnfollowUser,
  updateUser,
  getUserProfile,
};
