const {token} = require("./config.json");
const {Client , Events , GatewayIntentBits , SlashCommandBuilder} = require("discord.js");
const smile = new SlashCommandBuilder()

const client = new Client({intents:[GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, async bot=>{
    
    console.log(`正在以"${bot.user.username}"的身分登入`);
    const deletecommands = await client.application.commands.fetch();
    if(deletecommands.size > 0){
        console.log("正在刪除指令");
        for (const command of deletecommands.values()) {
            await command.delete();
            console.log(`已刪除指令/${command.name}`);
        }
    
        console.log("成功刪除所有指令\n正在新增新指令");
    }
    

    const introduce = new SlashCommandBuilder()
        .setName("introduce")
        .setDescription("About me");

    const hi = new SlashCommandBuilder()
        .setName("hi")
        .setDescription("Say hello to you or somebody");

    const introduceCommand = introduce.toJSON();
    const hiCommand = hi.toJSON();
    await client.application.commands.create(introduceCommand);
    console.log(`已新增/${introduceCommand.name}`);
    await client.application.commands.create(hiCommand);
    console.log(`已新增/${hiCommand.name}`);

});

client.on(Events.InteractionCreate , async interaction =>{
    if(!interaction.isCommand()) return;

    if(interaction.commandName === "introduce"){
        await interaction.deferReply(); 
        interaction.editReply("這是Jerry的自主學習bot");
        console.log(`${interaction.user.username} 使用了/${interaction.commandName}`);
    } else if(interaction.commandName === "hi"){
        await interaction.deferReply(); 
        interaction.editReply(`嗨，${interaction.user.username}！`);
        console.log(`${interaction.user.username} 使用了/${interaction.commandName}`);

    }
})

client.login(token)