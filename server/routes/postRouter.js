import express from "express";
import {
  createPost,
  deletePost,
  feedPosts,
  getAllPosts,
  getPost,
  likePost,
  replyPost,
} from "../controllers/postController.js";
import isAuthorizedUser from "../middlewares/isAuthorizedUser.js";

const router = express.Router();

router.get("/feed", isAuthorizedUser, feedPosts);
router.get("/:userId", getAllPosts);
router.get("/:username/:id", getPost);
router.post("/create", isAuthorizedUser, createPost);
router.post("/like/:id", isAuthorizedUser, likePost);
router.post("/reply/:id", isAuthorizedUser, replyPost);
router.delete("/delete/:id", isAuthorizedUser, deletePost);

export default router;
