import express from "express";
import User from "../models/User.js";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  setPassword,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/settings", verifyToken, getUser);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/:id/setpassword/pass", verifyToken, setPassword);

export default router;
