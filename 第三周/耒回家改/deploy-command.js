const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
let config = JSON.parse(fs.readFileSync(`${process.cwd()}/config/config.json`, 'utf8'));
const token = config.token
const clientId = config.clientId
function getFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let commandFiles = [];

  for (const file of files) {
    if (file.isDirectory()) {
      commandFiles = [
        ...commandFiles,
        ...getFiles(`${dir}/${file.name}`)
      ];
    } else if (file.name.endsWith(".js")) {
      commandFiles.push(`${dir}/${file.name}`);
    }
  }
  return commandFiles;
}

let commands = [];
const commandFiles = getFiles("./commands");

for (const file of commandFiles) {
  const command = require(file);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => {
    console.log("正在創建指令！");
    commands.forEach(command => {
      console.log(`以新增/${command.name}`);
    });
    console.log("成功創建所有指令！")
  })
  .catch(console.error);

async function deployCommands() {
  
}

module.exports = deployCommands;
