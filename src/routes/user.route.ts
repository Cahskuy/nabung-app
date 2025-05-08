import { Hono } from "hono";
import { getUsers } from "../controllers/user.controller";

const userRoute = new Hono();

userRoute.get("/", getUsers);

export default userRoute;
