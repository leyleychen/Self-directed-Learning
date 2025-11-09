const fs = require('node:fs').promises;
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.commands = new Collection(); // Initialize the commands collection

async function startIndex() {
    let config;
    try {
        const configPath = path.resolve('config.json');
        const configContent = await fs.readFile(configPath, 'utf8');
        config = JSON.parse(configContent);
    } catch (err) {
        console.error('Failed to read config.json:', err);
        process.exit(1);
    }

    const { token } = config;
    if (!token) {
        console.error('Token is missing in config.json');
        process.exit(1);
    }

    // Load commands into the client
    const commandPath = path.resolve('commands');
    const commandFiles = await fs.readdir(commandPath);

    for (const file of commandFiles.filter(file => file.endsWith(".js"))) {
        const filePath = path.join(commandPath, file);
        const command = require(filePath);
        client.commands.set(command.data.name, command); // Add commands to collection
    }

    // Load events
    const eventPath = path.resolve('events');
    const eventFiles = await fs.readdir(eventPath);

    for (const file of eventFiles.filter(file => file.endsWith(".js"))) {
        const filePath = path.join(eventPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args)); // Pass client
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args)); // Pass client
        }
    }

    await client.login(token);
    console.log('Bot is running!');
}

startIndex().catch(console.error);
