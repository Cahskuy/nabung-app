import { Hono } from "hono";
import {
  getUsers,
  createUsers,
  getUserById,
} from "../controllers/user.controller";

const userRoute = new Hono();

userRoute.get("/", getUsers);
userRoute.get("/:id", getUserById);
userRoute.post("/", createUsers);

export default userRoute;
