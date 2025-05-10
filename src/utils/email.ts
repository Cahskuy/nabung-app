import { transporter } from "./mailer";

export const sendOtpEmail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: '"Nabung App" <noreply@nabung.com>',
    to,
    subject: "Your OTP Code",
    html: `<p>Your OTP code is: <b>${otp}</b>. It expires in 5 minutes.</p>`,
  });
};
