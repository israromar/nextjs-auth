import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bycryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bycryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // or the appropriate port for your email service
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const pageRoute = emailType === "VERIFY" ? "verifyemail" : "reset-password";
    const mailOptions = {
      from: "iisraromar@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/${pageRoute}?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
        or copy and paste the link below in your browser. <br> ${
          process.env.DOMAIN
        }/${pageRoute}?token=${hashedToken}
        </p>`,
    };

    const mailerResponse = await transport.sendMail(mailOptions);
    return mailerResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
