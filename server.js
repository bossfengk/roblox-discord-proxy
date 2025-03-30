require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
    try {
        const webhookURL = process.env.DISCORD_WEBHOOK_URL;
        const message = req.body;

        await axios.post(webhookURL, { content: JSON.stringify(message) });

        res.status(200).send("✅ Webhook sent!");
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).send("❌ Failed to send webhook.");
    }
});

app.listen(3000, () => console.log("🚀 Running on port 3000"));
