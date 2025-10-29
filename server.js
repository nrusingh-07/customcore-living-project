import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: "CustomCore <onboarding@resend.dev>", // ✅ default sender
      to: "bigdogring@gmail.com", // ⚠️ put YOUR real email here
      subject: `New message from ${name}`,
      text: `From: ${email}\n\n${message}`,
    });

    console.log("✅ Email sent:", response);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.json({ success: false, error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
