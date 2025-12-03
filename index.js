require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Start Express server only after bot is ready
    const app = express();
    app.use(express.json());

    app.post("/send", async (req, res) => {
        const { channelId, content } = req.body;
        try {
            const channel = await client.channels.fetch(channelId);
            if (!channel) return res.status(404).send("Channel not found");

            await channel.send(content);
            res.send("Message sent successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send("Failed to send message");
        }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (message.content === "!ping") {
        message.reply("Pong!");
    }
});

if (!process.env.TOKEN) {
    console.error("Error: TOKEN environment variable is not set!");
    process.exit(1);
}

client.login(process.env.TOKEN)
    .then(() => console.log("Bot logged in successfully."))
    .catch(err => {
        console.error("Failed to login. Check your token.");
        console.error(err);
    });
