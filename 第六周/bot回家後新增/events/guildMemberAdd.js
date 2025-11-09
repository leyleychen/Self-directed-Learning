module.exports = {
    name: "guildMemberAdd",
    async execute(client,member) {
        try {
            const guild = member.guild;
            if (!guild) {
                console.error("Guild is undefined.");
                return;
            }


            if (!guild.roles) {
                console.error("Guild roles are undefined.");
                return;
            }

            const welcomeRole = guild.roles.cache.find(role => role.name === "member");
            
            if (welcomeRole) {
                await member.roles.add(welcomeRole);
                console.log(`Assigned role '${welcomeRole.name}' to ${member.user.tag}.`);
            } else {
                console.warn("Welcome role not found.");
            }
            const welcomeChannel = guild.channels.cache.find(channel => channel.name === "welcome");

            if (welcomeChannel && welcomeChannel.isTextBased()) {
                await welcomeChannel.send(`Welcome to the server, ${member.user}!`);
                console.log(`Sent welcome message to ${member.user.tag}.`);
            } else {
                console.warn("Welcome channel not found or not text-based.");
            }
        } catch (error) {
            console.error("Error handling guildMemberAdd event:", error);
        }
    }
};
