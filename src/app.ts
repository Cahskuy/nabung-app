import { Hono } from "hono";
import { logger } from "hono/logger";
import routes from "./routes";

const app = new Hono();

app.use(logger());
app.get("/", (c) => c.text("Nabung app backend is live! 🔥"));
app.route("/", routes);

export default app;
