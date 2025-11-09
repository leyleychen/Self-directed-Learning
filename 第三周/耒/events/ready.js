module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`以"${client.user.username}"的身分登入`);

        const deletecommands = await client.application.commands.fetch();
        if (deletecommands.size > 0) {
            console.log("正在刪除指令");
            for (const command of deletecommands.values()) {
                await command.delete();
                console.log(`已刪除指令/${command.name}`);
            }

            console.log("成功刪除所有指令\n正在新增新指令");
        }
    }
};
