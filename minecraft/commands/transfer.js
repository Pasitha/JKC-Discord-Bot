module.exports.run = (bot, args) => {
    if (!args[0]) return JKCJrBot.chat('รบกวนบอกหนูหน่อยนะคะว่าจะโยนให้ใคร');
    if (!Object.keys(JKCJrBot.players).includes(args[0])) return JKCJrBot.chat(`หนูไม่เจอผู้เล่นที่ชื่อ ${args[0]} เลยนะคะ`);
    if (!args[1]) return JKCJrBot.chat(`รบกวนบอกหนูหน่อยนะคะว่าจะโยนให้ ${args[0]} เท่าไหร่`);
    if (isNaN(args[1])) return JKCJrBot.chat('เอิ่ม...นี้มันไม่ใช่ตัวเลขไม่ใช่หรอคะ');

    JKCJrBot.chat(`/tp Jukkyjung ${username}`);

    await new Promise(resolve => setTimeout(resolve, 50));
    await JKCJrBot.waitForChunksToLoad();

    if (!bot.players[username].entity?.heldItem?.name) return bot.chat('รบกวนช่วยถือเพชรไว้หน่อยนะคะ');

    if (JKCJrBot.players[username].entity.heldItem.name === "diamond") {
        if (JKCJrBot.players[username].entity.heldItem.count >= Math.floor(parseInt(args[1]))) {
            JKCJrBot.chat(`/clear ${username} minecraft:diamond ${args[1]}`);
            JKCJrBot.chat(`/give ${args[0]} minecraft:diamond ${args[1]}`);
        } else {
            JKCJrBot.chat('มีเพขรไม่พอนะคะ');
        }
    } else {
        JKCJrBot.chat('รบกวนถือเพชรไว้ในมือหน่อยนะคะ');
    }
}

module.exports.name = ['transfer', 'trans'];
