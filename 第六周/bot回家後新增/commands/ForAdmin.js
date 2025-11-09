const { SlashCommandBuilder ,PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("secret_command")
        .setDescription("for testing")
        .addUserOption(option =>
            option
                .setName("用戶")
                .setDescription("選擇")
                .setRequired(true)
            )
          .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
          .setDMPermission(false)
          ,

    async execute(interaction) {
        await interaction.deferReply({ephemeral:true}); 
        const user = interaction.options.getUser("用戶")
            await interaction.editReply(`嗨， ${user.username}！`);
            console.log(`${interaction.user.username} 使用了/${interaction.commandName}提及但沒有@${user.username}`);
        }
    }

