import app from "./app";
import { connectToDatabase, prisma } from "./config/database";

async function startServer() {
  try {
    await connectToDatabase();

    Bun.serve({
      fetch: app.fetch,
      port: 3000,
    });

    console.log("🚀 Server running at http://localhost:3000");
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }

  process.on("SIGINT", async () => {
    console.log("\n Received SIGINT. Disconnecting Prisma...");
    try {
      await prisma.$disconnect();
      console.log("👋 Prisma disconnected from Supabase!");
    } catch (err) {
      console.error("⚠️ Error during disconnect:", err);
    } finally {
      process.exit(0);
    }
  });

  process.on("SIGTERM", async () => {
    console.log("\n📴 Received SIGTERM. Disconnecting Prisma...");
    try {
      await prisma.$disconnect();
      console.log("👋 Prisma disconnected from Supabase!");
    } catch (err) {
      console.error("⚠️ Error during disconnect:", err);
    } finally {
      process.exit(0);
    }
  });
}

startServer();
