import { prisma } from "../config/database";
import { Context } from "hono";
import { encryptBalance, decryptBalance } from "../utils/encryption";

export async function getUsers(c: Context) {
  const users = await prisma.user.findMany();
  return c.json(users);
}

export async function createUsers(c: Context) {
  const { email, name, balance } = await c.req.json();
  const encryptedBalance = encryptBalance(balance);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      balance: encryptedBalance,
    },
  });

  return c.json({ message: "User created", user });
}

export async function getUserById(c: Context) {
  const id = Number(c.req.param("id"));
  let user = await prisma.user.findUnique({ where: { id } });
  if (!user) return c.notFound();
  user.balance = decryptBalance(user.balance).toString();
  return c.json(user);
}
