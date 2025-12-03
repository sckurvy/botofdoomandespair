// Load environment variables from Render (or local .env)
require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

// Create a new Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Event: Bot ready
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Event: Message received
client.on("messageCreate", (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;

    if (message.content === "!ping") {
        message.reply("Pong!");
    }
});

// Log in using environment variable TOKEN
if (!process.env.TOKEN) {
    console.error("Error: TOKEN environment variable is not set!");
    process.exit(1); // Stop if no token
}

client.login(process.env.TOKEN)
    .then(() => console.log("Bot logged in successfully."))
    .catch(err => {
        console.error("Failed to login. Check your token.");
        console.error(err);
    });
