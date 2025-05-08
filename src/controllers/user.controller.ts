import { prisma } from "../config/database";
import { Context } from "hono";

export async function getUsers(c: Context) {
  const users = await prisma.user.findMany();
  return c.json(users);
}
