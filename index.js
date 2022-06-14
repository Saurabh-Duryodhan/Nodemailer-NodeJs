import dotenv from "dotenv";
dotenv.config();
import express from "express";
import nodemailer from "nodemailer";
const { PORT, EMAIL_ID, EMAIL_PASSWORD } = process.env;
const app = express();

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASSWORD,
    safe: true,
  },
});
const mailDetails = {
  from: EMAIL_ID,
  to: "srduryodhan97@gmail.com",
  subject: "Testing nodemailer",
  text: "This is a test email",
};

app.get("/sendmail", (req, res, next) => {
  mailTransport.sendMail(mailDetails, (err, data) => {
    err
      ? res.send(err.message)
      : console.log(data)
       res.send({ message: `Email send successfully` });
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
