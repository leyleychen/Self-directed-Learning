const {token} = require("./config.json");
const {Client , Events , GatewayIntentBits , SlashCommandBuilder} = require("discord.js"); 

const client = new Client({intents:[GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, bot=>{
    console.log(`正在以"${bot.user.username}"的身分登入`)

    const smile = new SlashCommandBuilder()
        .setName("smile")
        .setDescription("Replies with :)");
    

    const hi = new SlashCommandBuilder()
        .setName("hi")
        .setDescription("Say hello to you or somebody");
        
    const smileCommand = smile.toJSON();
    const hiCommand = hi.toJSON();
    client.application.commands.create(smileCommand);
    client.application.commands.create(hiCommand);

});

client.on(Events.InteractionCreate , interaction =>{
    if(!interaction.isChatInputCommand()) return;
    
    if(interaction.commandName === "smile"){
        interaction.reply(":)")
    }
    if(interaction.commandName === "hi"){
        interaction.reply(`${interaction.user.username}`);
    }

})

client.login(token)