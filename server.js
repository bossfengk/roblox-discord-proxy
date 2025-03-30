require('dotenv').config(); // Load .env variables

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); // Allow JSON requests

const PORT = process.env.PORT || 3000; // Use Railway’s default port

app.post('/webhook', async (req, res) => {
    try {
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL; // Load from .env
        if (!webhookUrl) {
            return res.status(500).json({ error: "Webhook URL not set in .env" });
        }

        // Send the request to Discord webhook
        await axios.post(webhookUrl, { content: JSON.stringify(req.body) });

        res.status(200).json({ success: "Sent to Discord!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
