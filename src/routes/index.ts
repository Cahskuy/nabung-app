import { Hono } from "hono";
import userRoute from "./user.route";

const routes = new Hono();

routes.route("/users", userRoute);

export default routes;
