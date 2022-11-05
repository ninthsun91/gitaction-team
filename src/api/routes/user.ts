import { Router } from "express";
import User from "../controllers/user";

const router = Router();

// router.route("/login");
router.route("/signup").post(User.signup);
// router.route("/:userId").get(User.signup).put();

export default router;
