const { SlashCommandBuilder,PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const infraction = require("../../models/infraction")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("警告")
        .setDescription("選擇一個你要警告的對象")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName("用戶")
                .setDescription("要警告的對象")
                .setRequired(true)
            )
        .addStringOption(option =>
        option
                .setName("原因")
                .setDescription("警告的原因")
                .setRequired(false)
                .setMinLength(1)
                .setMaxLength(255)
                
        ),


    async execute(interaction) {
        await interaction.deferReply({ephemeral:true})
        const {options,member,guild}=interaction

        const target = await options.getMember("用戶")

        let reason = await options.getString("原因")
        const targetId = target.Id
        let embed;

        await infraction.create({
            userId:target.id,
            guildId : guild.id,
            reason:reason.name,
            type:"Warn",
            enforcerId:member.id
        }).then(result => {
            embed 
            .setColor("Red")
        })
        
    }
}