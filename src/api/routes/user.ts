import { Router } from "express";

const router = Router();

router.route("/login");
router.route("/signup");
router.route("/:userId").get().put();

export default router;
