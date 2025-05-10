import { Hono } from "hono";
import authSchema from "../schema/auth.schema";
import { signup, verifyOtp } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/input-validator.middleware";

const router = new Hono();

router.post("/signup", validateRequest(authSchema.signup), signup);
router.post("/verify-otp", validateRequest(authSchema.verifyOtp), verifyOtp);

export default router;
