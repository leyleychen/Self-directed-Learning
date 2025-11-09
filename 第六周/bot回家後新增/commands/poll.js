const{ SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
    data : new SlashCommandBuilder()
    .setName("投票")
    .setDescription("建立一個投票")
    .addStringOption(option => option
      .setName("問題")
      .setDescription("你想投票的問題")
      .setMaxLength(30)
      .setMinLength(1)
      .setRequired(true)
    )
    .addStringOption(option => option
      .setName("選項1")
      .setDescription("第一個選項")
      .setMaxLength(30)
      .setMinLength(1)
      .setRequired(true)
    
    )
    .addStringOption(option => option
      .setName("選項2")
      .setDescription("第二個選項")
      .setMaxLength(30)
      .setMinLength(1)
      .setRequired(true)
    
    )
    .addStringOption(option => option
      .setName("選項3")
      .setDescription("第三個選項")
      .setMaxLength(30)
      .setMinLength(1)
    
    )
    .addStringOption(option => option
      .setName("選項4")
      .setDescription("第四個選項")
      .setMaxLength(30)
      .setMinLength(1)
    
    )
    .addStringOption(option => option
      .setName("選項5")
      .setDescription("第五個選項")
      .setMaxLength(30)
      .setMinLength(1)
    
    )
    
    ,

    async execute(interaction){
      await interaction.deferReply({ephemeral: true})
      const {channel}=await interaction;
      const options = await interaction.options.data;
      const emojis = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"]
      
      const embed = new EmbedBuilder()
      .setTitle(`問題 : ${options[0].value}`)
      .setFooter({ text: "點擊下面表情符號參與投票" })
      .setColor(0x00FF00);

      for(let i = 1 ; i < options.length ; i++){
        let emoji = emojis[i-1]
        let option=options[i]
        embed.addFields(
          
        {
          name: `${emoji} ${option.value}`,
          value: " "
        }
      )
    }
     const message = await channel.send({embeds:[embed]})
     for(let i = 1 ; i < options.length ; i++){
      let emoji = emojis[i-1]
      await message.react(emoji)
     }

     await interaction.editReply("成功創建投票")
    console.log(`${interaction.user.username} 使用了/${interaction.commandName}`);
}}
