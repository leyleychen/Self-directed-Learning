const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
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
                
        ),

    async execute(interaction) {
        await interaction.deferReply(); 
        const user = interaction.options.getUser("用戶")
        const mention = interaction.options.getBoolean("提及")
        if(mention){
            await interaction.editReply(`嗨，<@${user.id}>！`);
            console.log(`${interaction.user.username} 使用了/${interaction.commandName}提及並@${user.username}`);
        }else{
            await interaction.editReply(`嗨， ${user.username}！`);
            console.log(`${interaction.user.username} 使用了/${interaction.commandName}提及但沒有@${user.username}`);
        }
    }
}
