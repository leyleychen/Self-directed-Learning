const{ SlashCommandBuilder } = require("discord.js");


module.exports = {
    data:new SlashCommandBuilder()
    .setName("introduce")
    .setDescription("About me"),

    async execute(interaction){
    await interaction.deferReply(); 
    interaction.editReply("這是Jerry的自主學習bot");
    console.log(`${interaction.user.username} 使用了/${interaction.commandName}`);
}}
