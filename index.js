const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

// Tiny web server to keep Render free plan alive
const app = express();
app.get("/", (req, res) => res.send("Bot is running"));
app.listen(process.env.PORT || 3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// === HARD-CODED TOKEN ===
const TOKEN = "MTQ0MzYxODYwOTE0MTM4NzI5Ng.GWvJbs.OKalfRSw4Q8eYKlYGm_mhKsC4YQW6erD_4etFA";

client.login(TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});
