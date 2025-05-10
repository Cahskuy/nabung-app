import { Hono } from "hono";
import userRoute from "./user.route";
import authRoute from "./auth.route";

const routes = new Hono();

routes.route("/users", userRoute);
routes.route("/auth", authRoute);

export default routes;
