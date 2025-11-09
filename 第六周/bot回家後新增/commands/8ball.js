const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("神奇八號球")
        .setDescription("8-ball")
        .addStringOption(option => option
            .setName("問題")
            .setDescription("一個你想問的問題")
            .setMaxLength(50)
            .setMinLength(2)
            .setRequired(true)
        )
        .addBooleanOption(option => option
            .setName("公開")
            .setDescription("要不要公開(預設為公開)")
        ),

    async execute(interaction) {
        const { options, user } = interaction;
        const 公開 = options.getBoolean("公開") ?? true;
        const question = options.getString("問題");
        await interaction.deferReply({ ephemeral: !公開 });
        console.log(`${interaction.user.username} 使用了/${interaction.commandName}`);

        if (!question.endsWith("?")) {
            return interaction.editReply({ ephemeral: true, content: '句子結尾請加入"?"' });
        }

        let randomNum = Math.floor(Math.random() * responses.length);

        const embed = new EmbedBuilder()
            .setTitle("神奇八號球")
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor(0xFFD700)
            .addFields(
                { name: "問題", value: question },
                { name: "回覆", value: responses[randomNum] }
            );
        interaction.editReply({ ephemeral: !公開, embeds: [embed] });
    }
};

const responses = [
    "是的，毫無疑問！",
    "大有可能！",
    "看起來很有希望。",
    "是的，但可能有些挑戰。",
    "答案是肯定的。",
    "前景不明，請再試一次。",
    "不太可能。",
    "恐怕不行。",
    "這次無法預測。",
    "最好的選擇是保持耐心。",
    "不確定，請再次問我。",
    "答案不確定。",
    "抱歉，這個問題超出我的理解範疇。",
    "一切都有可能。",
    "這是個好兆頭！",
    "千萬別放棄。",
    "結果可能出乎意料。",
    "勇敢地向前走吧！",
    "你應該考慮另一種方法。",
    "很難說，但有希望。",
    "當下不宜做決定。",
    "繼續努力，會有好結果。",
    "不要太快做出結論。",
    "看來現在不是時候。",
    "你會找到解決方案的，別擔心。"
];
