import nodemailer from "nodemailer";

class MailerService {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // replace with your SMTP host
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your email password or app-specific password
    },
  });
  message = (to: string, otp: string) => {
    return {
      from: "dev.extreme.devs@gmail.com",
      to: to,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP is ${otp}</p>`,
    };
  };
  sendMail = async (to: string, otp: string) => {
    await this.transporter.sendMail(this.message(to, otp));
  };
}

export default new MailerService();
