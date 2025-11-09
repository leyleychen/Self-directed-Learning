const {token} = require("./config.json");
const {Client , Events , GatewayIntentBits , SlashCommandBuilder} = require("discord.js");

const client = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers]});

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
        .setDescription("Say hello to you or somebody")
        .addUserOption(option =>
            option
                .setName("用戶")
                .setDescription("hi的對象")
                .setRequired(true)
            )
        .addBooleanOption(booleanoption =>
        booleanoption
                .setName("提及")
                .setDescription("是否提及該用戶(預設為不提及)")
                .setRequired(false)
                
        )

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
        const user = interaction.options.getUser("用戶")
        const booleanoption = interaction.options.getBoolean("提及")
        if(booleanoption == true){
            await interaction.editReply(`嗨，<@${user.id}>！`);
            console.log(`${interaction.user.username} 使用了/${interaction.commandName}提及並@${user.username}`);
        }else{
            await interaction.editReply(`嗨， ${user.username}！`);
            console.log(`${interaction.user.username} 使用了/${interaction.commandName}提及但沒有@${user.username}`);
        }
        

    }
})

client.login(token)
