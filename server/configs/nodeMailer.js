import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER.trim(),
    pass: process.env.SMTP_PASS.trim(),
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP ERROR");
    console.log(error);
  } else {
    console.log("SMTP READY");
  }
});

console.log("USER =", JSON.stringify(process.env.SMTP_USER));
console.log("PASS =", JSON.stringify(process.env.SMTP_PASS));
console.log("PASS LENGTH =", process.env.SMTP_PASS?.length);

export default transporter;