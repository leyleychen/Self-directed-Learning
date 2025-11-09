const Guild = require("../models/guild")

module.exports = {
    name: "guildMemberAdd",
    async execute(client,member) {
        const db = await Guild.findOne({where:{id : member.guild.id}})

        if(db.welcomeRoleId){
        const welcomeRole = await member.guild.roles.fetch(db.welcomeRolelId)
        await member.roles.add(welcomeRole)

        }

        if(db.welcomeChannelId){
        const welcomeChannel = await member.guild.channels.fetch(db.welcomeChannelId)
        welcomeChannel.send(`Welcome to the server ${member.user}!`)
        }

    }
};