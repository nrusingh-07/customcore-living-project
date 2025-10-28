const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    console.log("📩 Incoming message:", name, email, message);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // ✅ use your Gmail as sender
      replyTo: email,
      to: process.env.EMAIL_USER, // send to yourself
      subject: `New Inquiry from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);

    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    res.json({ success: false, error: error.message });
  }
});

// app.listen(5001, () => console.log("✅ Server running on port 5001"));
// ✅ For Vercel: export the app instead of starting a local server
if (process.env.NODE_ENV !== "production") {
  // Run locally on your machine
  app.listen(5001, () => console.log("✅ Server running on port 5001"));
}

// Vercel needs the app exported (no app.listen)
module.exports = app;

