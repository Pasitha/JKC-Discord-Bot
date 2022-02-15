module.exports.run = async (bot, args) => {
    if (!args[0]) return bot.chat(`ตอนนี้ ${bot.username} อยู่ที่ x : ${bot.entity.position.x.toFixed(2)}, y : ${bot.entity.position.y.toFixed(2)}, z : ${bot.entity.position.z.toFixed(2)}`);

    if (!Object.keys(bot.players).includes(args[0])) return bot.chat(`ตอนนี้ในเซิฟไม่มีคนที่ชื่อ ${args[0]} อยู่ในเซิฟนะคะ`);
    bot.chat(`/tp Jukkyjung ${args[0]}`);

    await new Promise(resolve => setTimeout(resolve, 50));
    await bot.waitForChunksToLoad();

    const position = bot.entity.position;

    return bot.chat(`ตอนนี้ ${args[1]} อยู่ที่ x : ${position.x.toFixed(2)}, y : ${position.y.toFixed(2)}, z : ${position.z.toFixed(2)}`);
}

module.exports.name = ['position', 'pos', 'whereis'];
