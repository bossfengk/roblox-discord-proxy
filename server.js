require('dotenv').config(); // Load .env variables

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000; // Use Railway's assigned port

app.use(express.json());

app.post('/webhook', async (req, res) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL; // Get Webhook URL from env
    if (!webhookUrl) {
        return res.status(500).json({ error: "Webhook URL not set!" });
    }

    try {
        const response = await axios.post(webhookUrl, {
            content: req.body.message || "Default message",
        });
        res.json({ success: true, response: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
