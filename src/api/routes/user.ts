import { Router } from "express";
import User from "../controllers/user";

const router = Router();

router.route("/login").post(User.login);
router.route("/signup").post(User.signup);
router.route("/:userId").get(User.userInfo)//.put().delete()

export default router;
