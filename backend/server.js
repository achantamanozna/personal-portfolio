const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio backend is running." });
});

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  // For the internship demo, we log the message.
  // Later you can connect MongoDB or an email service here.
  console.log("New contact message:", {
    name, email, subject, message,
    receivedAt: new Date().toISOString()
  });

  res.json({ message: "Thanks! Your message was received successfully." });
});

app.listen(PORT, () => {
  console.log(`Portfolio backend running at http://localhost:${PORT}`);
});
