const{ SlashCommandBuilder ,EmbedBuilder} = require("discord.js");


module.exports = {
    data:new SlashCommandBuilder()
    .setName("頭像")
    .setDescription("放大你的頭像")
    .addUserOption(option =>
      option
          .setName("對象")
          .setDescription("放大的對象")
          .setRequired(true)
      )
      .addIntegerOption(option =>
        option.setName("解析度")
              .setDescription("解析度越大，圖片的清晰度越高，但圖片會顯示得更大，受空間限制)")
              .setRequired(true)
              .addChoices(
                  { name: "16px", value: 16 },
                  { name: "32px", value: 32 },
                  { name: "64px", value: 64 },
                  { name: "128px", value: 128 },
                  { name: "256px", value: 256 },
                  { name: "512px", value: 512 },
              )
            )
          
          .addBooleanOption(option =>
            option
                .setName("公開")
                .setDescription("要不要公開")
                .setRequired(true))

          .addBooleanOption(option =>
              option
                  .setName("提及")
                  .setDescription("Description中是否提及(預設為不提及)")
                  .setRequired(false)),
    async execute(interaction){
      const 提及 = interaction.options.getBoolean("提及")
      const user = interaction.options.getUser("對象")
      const userid = 提及 ? `<@${user.id}>` : `${user.tag}`
      const InteractionUser = interaction.user.tag
      const 解析度 = interaction.options.getInteger("解析度");
      const 公開 = interaction.options.getBoolean("公開")
      const embed = new EmbedBuilder()
      .setTitle("頭像")
      .setDescription(`${userid}的頭像`)
      .addFields(
        { name: "使用者", value: `使用此指令的人 : ${InteractionUser}`, inline: false },
        { name: "解析度", value: `你選的解析度是${解析度}px`, inline: false },
        { name: "對象的頭像url", value: `完整頭像：[點我前往](${user.displayAvatarURL()})`, inline: false },
      )
      .setColor(0x0099FF)
      .setAuthor({ name:"jerrychen6091" , iconURL: "https://cdn.discordapp.com/avatars/886594065662083073/4ed4a91c55ab54af28d8a0071bd3219e.webp" })
      .setTimestamp()
      .setImage(user.displayAvatarURL({ dynamic: true, size: 解析度 }))
    interaction.reply({
      embeds:[embed],
      ephemeral: !公開
    });
    console.log(`${interaction.user.username} 使用了/${interaction.commandName}`);
}}
