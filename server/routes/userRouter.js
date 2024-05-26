import express from "express";
import {
  followAndUnfollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/userController.js";
import isAuthorizedUser from "../middlewares/isAuthorizedUser.js";

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", isAuthorizedUser, followAndUnfollowUser);
router.put("/update/:id", isAuthorizedUser, updateUser);

export default router;
