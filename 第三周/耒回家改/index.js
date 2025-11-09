const fs = require('node:fs').promises;  // 使用 fs.promises 來執行非同步檔案操作
const path = require('path');
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

async function startIndex() {
    let config;
    try {
        const configPath = path.join(__dirname, 'config', 'config.json');  // 使用 __dirname 來確保相對路徑
        const configContent = await fs.readFile(configPath, 'utf8');
        config = JSON.parse(configContent);
    } catch (err) {
        console.error('無法讀取 config.json:', err);
        process.exit(1);
    }

    const token = config.token;
    if (!token) {
        console.error('config.json 中缺少 token');
        process.exit(1);
    }

    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

    // 初始化 client.commands 為 Collection
    client.commands = new Collection();

    // 加載所有指令
    await loadCommands(client);

    const eventPath = path.join(__dirname, "events");
    const eventFiles = await fs.readdir(eventPath);  // 使用 fs.promises.readdir

    for (const file of eventFiles.filter(file => file.endsWith(".js"))) {
        const filePath = path.join(eventPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        let command = client.commands.get(interaction.commandName);

        try {
            if (command && !interaction.replied) {
                await command.execute(interaction);
            }
        } catch (error) {
            console.error(error);
        }
    });

    await client.login(token);
}

// 新增 loadCommands 函數
async function loadCommands(client) {
    const commandFiles = await getFiles(path.join(__dirname, 'commands'));  // 使用 __dirname 確保路徑正確

    for (const commandFile of commandFiles) {
        const command = require(commandFile);
        // 使用 Collection 的 set 方法將指令加到 client.commands 中
        client.commands.set(command.data.name, command);
    }
}

async function getFiles(dir) {  // 標註為 async 函數
    const files = await fs.readdir(dir, { withFileTypes: true });  // 使用 async readdir
    let commandFiles = [];

    for (const file of files) {
        if (file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...await getFiles(path.join(dir, file.name))  // 使用 path.join 來保證路徑正確
            ];
        } else if (file.name.endsWith(".js")) {
            commandFiles.push(path.join(dir, file.name));  // 使用 path.join 來保證路徑正確
        }
    }
    return commandFiles;
}

startIndex().catch(console.error);
