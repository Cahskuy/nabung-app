import { MiddlewareHandler } from "hono";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema): MiddlewareHandler => {
  return async (c, next) => {
    const body = await c.req.json().catch(() => null);

    if (!body) {
      return c.json({ status: 400, message: "Invalid JSON" }, 400);
    }

    const result = schema.safeParse(body);

    if (!result.success) {
      const issue = result.error.issues?.[0];
      if (!issue) {
        return c.json({ status: 400, message: "Invalid request" }, 400);
      }

      const path = issue.path?.join(".") || "field";
      let msg = issue.message;

      // Optional: clean message
      if (msg === "Required") msg = "is required";
      else if (msg.includes("Invalid")) msg = "must be valid";

      const message = `${path} ${msg.toLowerCase()}`;
      return c.json({ status: 400, message }, 400);
    }

    await next();
  };
};
