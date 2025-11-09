const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("結束投票")
    .setDescription("結算投票結果並顯示結果")
    .addStringOption((option) =>
      option
        .setName("message_id")
        .setDescription("投票訊息的ID")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const messageId = interaction.options.getString("message_id");
    const { channel } = interaction;

    try {
      // 取得指定的訊息
      const pollMessage = await channel.messages.fetch(messageId);

      if (
        !pollMessage ||
        pollMessage.embeds.length === 0 ||
        !pollMessage.embeds[0].footer ||
        !pollMessage.embeds[0].footer.text.includes("點擊下面表情符號參與投票")
      ) {
        return interaction.editReply("未找到有效的投票訊息。");
      }

      const pollEmbed = pollMessage.embeds[0];
      const question = pollEmbed.title.replace("問題 : ", "");
      const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
      const results = {};

      // 初始化每個選項的票數
      emojis.forEach((emoji) => {
        results[emoji] = 0;
      });

      // 計算每個選項的票數
      for (const [emoji, _] of Object.entries(results)) {
        const reactions = await pollMessage.reactions.cache.get(emoji);
        if (reactions) {
          results[emoji] = reactions.count - 1; // 排除創建者的反應
        }
      }

      // 建立結果的 embed
      const resultEmbed = new EmbedBuilder()
        .setTitle(`投票結果：${question}`)
        .setColor(0x00FF00);

      // 為每個選項添加票數
      pollEmbed.fields.forEach((field, index) => {
        resultEmbed.addFields({
          name: `${field.name}`,
          value: `票數：${results[emojis[index]]}`,
        });
      });

      // 發送結果訊息
      await channel.send({ embeds: [resultEmbed] });
      await interaction.editReply("投票結算完成。");
    } catch (error) {
      console.error("無法找到訊息或其他錯誤：", error);
      await interaction.editReply("無法找到指定的投票訊息，請檢查訊息ID是否正確。");
    }
  },
};