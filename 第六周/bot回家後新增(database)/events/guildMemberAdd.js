const Guild = require("../models/guild")

module.exports = {
    name: "guildMemberAdd",
    async execute(client,member) {
        const welcomeRole = await member.guild.roles.cache.find(role => role.name === "member")
        await member.roles.add(welcomeRole)

        const db = await Guild.findOne({where:{id : member.guild.id}})
        if(db.welcomeChannelId){
        const welcomeChannel = await member.guild.channels.fetch(db.welcomeChannelId)
        welcomeChannel.send(`Welcome to the server ${member.user}!`)
        }

    }
};