module.exports.run = async (bot, args) => {
    let operations = args.map((player) => {
        return player;
    }).join(' ');

    try {
        bot.chat(`จาก ${operations} หนูคิดแล้วได้เท่ากับ ${eval(operations)}`);
    } catch (e) {
        bot.chat(`หนูว่าที่ให้หนูมาคำนวณนี้มันไม่น่าใช่ตัวเลขปกติใช่มะ`)
    }
    return;
}

module.exports.name = ['cal'];