import { Hono } from "hono";
import routes from "./routes";

const app = new Hono();

app.get("/", (c) => c.text("Nabung app backend is live! 🔥"));
app.route("/", routes);

export default app;
