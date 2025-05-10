import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // or your provider's SMTP
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email app password (not your email login password)
  },
});

// optional: verify the connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Email config error:", error);
  } else {
    console.log("Email server is ready to take messages");
  }
});
