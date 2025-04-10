
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/", async (req, res) => {
    const message = req.body.message || "پیام جدیدی از TradingView";
    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });
        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send("Error sending message");
    }
});

app.get("/", (req, res) => {
    res.send("Bot is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
