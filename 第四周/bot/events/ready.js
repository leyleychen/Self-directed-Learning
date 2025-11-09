module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`以"${client.user.username}"的身分登入`);
    }
};
