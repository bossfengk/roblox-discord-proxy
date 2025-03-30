require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Webhook Proxy Route
app.post("/webhook", async (req, res) => {
    try {
        const webhookURL = process.env.DISCORD_WEBHOOK_URL; // Get webhook URL from environment variables
        const message = req.body; // Get data from Roblox

        await axios.post(webhookURL, { content: JSON.stringify(message) }); // Send to Discord

        res.status(200).send("✅ Webhook sent to Discord!");
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).send("❌ Failed to send webhook.");
    }
});

app.listen(3000, () => console.log("🚀 Proxy server running on port 3000"));
