const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

const configPath = path.resolve('config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { token, clientId } = config;

function getFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let commandFiles = [];

    for (const file of files) {
        const fullPath = path.resolve(dir, file.name);
        if (file.isDirectory()) {
            commandFiles = [...commandFiles, ...getFiles(fullPath)];
        } else if (file.name.endsWith(".js")) {
            commandFiles.push(fullPath);
        }
    }
    return commandFiles;
}

const commands = [];
const commandFiles = getFiles(path.resolve("commands"));

for (const file of commandFiles) {
    const command = require(file);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => {
        console.log("Creating commands!");
        commands.forEach(command => console.log(`Added /${command.name}`));
        console.log("Successfully created all commands!");
    })
    .catch(console.error);

module.exports = function deployCommands() {};
