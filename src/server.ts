import app from "./app";
import { connectToDatabase } from "./config/database";

async function startServer() {
  await connectToDatabase();

  Bun.serve({
    fetch: app.fetch,
    port: 3000,
  });

  console.log("🚀 Server running at http://localhost:3000");
}

startServer();
