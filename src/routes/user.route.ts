import { Hono } from "hono";
import { getUsers, getUserById } from "../controllers/user.controller";

const router = new Hono();

router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
