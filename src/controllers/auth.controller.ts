import { Context } from "hono";
import redis from "../utils/redis";
import { prisma } from "../config/database";
import bcrypt from "bcryptjs";
import { encryptBalance } from "../utils/encryption";
import { sendOtpEmail } from "../utils/email";

export const signup = async (c: Context) => {
  try {
    const { email, password, name } = await c.req.json();

    const exist = await redis.get("signup:${email}");
    if (exist) return c.json({ message: "OTP already sent" }, 429);

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return c.json({ message: "User already exists" }, 409);

    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = JSON.stringify({ email, name, password: hashedPassword });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(`otp:${email}`, otp, "EX", 120);
    await redis.set(`signup:${email}`, payload, "EX", 120);

    await sendOtpEmail(email, otp);
    console.log(`[OTP to ${email}]: ${otp}`);

    return c.json({ message: "OTP sent" }, 200);
  } catch (err) {
    return c.json(
      {
        status: false,
        message: "Server Error",
      },
      500
    );
  }
};

export const verifyOtp = async (c: Context) => {
  try {
    const { email, otp } = await c.req.json();

    const cachedOtp = await redis.get(`otp:${email}`);
    const cachedUser = await redis.get(`signup:${email}`);
    if (!cachedOtp || !cachedUser)
      return c.json({ message: "OTP expired" }, 410);
    if (cachedOtp !== otp) return c.json({ message: "Invalid OTP" }, 401);

    const { name, password } = JSON.parse(cachedUser);
    const balance = encryptBalance(0);

    const user = await prisma.user.create({
      data: { email, name, password, balance },
    });

    await redis.del(`otp:${email}`);
    await redis.del(`signup:${email}`);

    return c.json({ message: "Signup successful", user }, 201);
  } catch (err) {
    return c.json(
      {
        status: false,
        message: "Server Error",
      },
      500
    );
  }
};
