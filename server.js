const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();

// ✅ Serve static files (HTML, CSS, JS, images) from the current directory
app.use(express.static(path.join(__dirname)));

app.use(cors());
app.use(express.json());

// ✅ Default route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Email sending endpoint
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
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
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

// ✅ Run locally only (not on Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(5001, () => console.log("✅ Server running on port 5001"));
}

// ✅ Export app for Vercel
module.exports = app;
