const{ SlashCommandBuilder , ChannelType , PermissionFlagsBits, WelcomeChannel, EmbedBuilder } = require("discord.js");
const Guild = require("../../models/guild")

module.exports = {
    data:new SlashCommandBuilder()
    .setName("設置歡迎身分組")
    .setDescription("設置一個給新成員的身分組")
    .addRoleOption(option => option
      .setName("身分組")
      .setDescription("選擇給一個給新成員的身分組")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    ,

    async execute(interaction){
      await interaction.deferReply({ ephemeral:true })
      const {options,member}= await interaction
      if(interaction.guild.ownerId != member.id) return interaction.editReply("只有伺服器主人可以使用此指令")

        const role = await options.getRole("身分組")
        const [guild,created]=await Guild.findOrCreate({ where : {id : interaction.guild.id}})
          if(!role) await guild.update({ welcomeRoleId : null })
            else await guild.update({welcomeRoleId : role.id})

          if(!role) return interaction.editReply("成功刪除歡迎身分組");
          const embed = new EmbedBuilder()
          .setTitle(`成功設置歡迎身分組:`)
          .setDescription(role)
          .setColor("Gold");
          interaction.editReply({ embeds : [embed] })
        

}}
