const{ SlashCommandBuilder , ChannelType , PermissionFlagsBits, WelcomeChannel } = require("discord.js");
const Guild = require("../../models/guild")

module.exports = {
    data:new SlashCommandBuilder()
    .setName("設置歡迎頻道")
    .setDescription("設置一個頻道來傳送歡迎訊息")
    .addChannelOption(option => option
      .setName("頻道")
      .setDescription("選擇一個頻道")
      .addChannelTypes(ChannelType.GuildText)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    ,

    async execute(interaction){
      await interaction.deferReply({ ephemeral:true })
      const {options,member}= await interaction
      if(interaction.guild.ownerId != member.id) return interaction.editReply("只有伺服器主人可以使用此指令")

        const channel = await options.getChannel("頻道")
        const [guild,created]=await Guild.findOrCreate({ where : {id : interaction.guild.id}})
          if(!channel) await guild.update({ welcomeChannelId : null })
            else await guild.update({welcomeChannelId : channel.id})

          if(!channel) interaction.editReply("成功刪除歡迎頻道")
            else interaction.editReply(`成功設置歡迎頻道 : ${channel}`)
        

}}
