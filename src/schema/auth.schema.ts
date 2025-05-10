import { z } from "zod";

const authSchema = {
  signup: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(3),
  }),

  verifyOtp: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
  }),
};

export default authSchema;
