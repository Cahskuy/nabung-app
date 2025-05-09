import { Buffer } from "buffer";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const SECRET_KEY = process.env.SECRET_KEY!;

if (SECRET_KEY.length !== 32) {
  throw new Error("❌ SECRET_KEY must be exactly 32 characters.");
}

export function encryptBalance(amount: number): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(SECRET_KEY), iv);
  let encrypted = cipher.update(amount.toString(), "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decryptBalance(encrypted: string): number {
  const parts = encrypted?.split(":");

  if (!parts || parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error("Encrypted string must be in 'string:string' format.");
  }

  const [ivHex, encryptedText] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(SECRET_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return Number(decrypted);
}
