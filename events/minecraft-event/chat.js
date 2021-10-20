const config = require('../../settings.json');

const prefix = config.prefix;

module.exports = async (client, mineflayerBot, username, mcMessage) => {
    if (username === mineflayerBot.username || !mcMessage.startsWith(prefix)) return;

    const messageArray = mcMessage.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    switch (cmd.slice(prefix.length)) {
        case 'cal':
            let operations = args.map(function (player) {
                return player;
            }).join(' ');

            try {
                mineflayerBot.chat(`จาก ${operations} หนูคิดแล้วได้เท่ากับ ${eval(operations)}`);
            } catch (e) {
                mineflayerBot.chat(`หนูว่าที่ให้หนูมาคำนวณนี้มันไม่น่าใช่ตัวเลขปกติใช่มะ`)
            }
            break;
        case 'help':
            mineflayerBot.chat(`ตอนนี้มีคำสั่งดังนี้ค่ะ [cal, pos, random, sendjkc] ตอนใช้อย่าลืมใส่ $ ก่อนด้วยนะคะ`);
            break;
        case 'loaded':
            await mineflayerBot.waitForChunksToLoad();
            mineflayerBot.chat('Ready!');
            break;
        case 'pos': case 'position':
            if (!args[0]) return mineflayerBot.chat(`ตอนนี้ ${mineflayerBot.username} อยู่ที่ x : ${mineflayerBot.entity.position.x.toFixed(2)}, y : ${mineflayerBot.entity.position.y.toFixed(2)}, z : ${mineflayerBot.entity.position.z.toFixed(2)}`);

            mineflayerBot.chat(`/tp Jukkyjung ${args[0]}`);
            if (!Object.keys(mineflayerBot.players).includes(args[0])) return mineflayerBot.chat(`ตอนนี้ในเซิฟไม่มีคนที่ชื่อ ${args[0]} อยู่ในเซิฟนะคะ`);

            await new Promise(resolve => setTimeout(resolve, 50));
            await mineflayerBot.waitForChunksToLoad();

            const position = mineflayerBot.entity.position;

            mineflayerBot.chat(`ตอนนี้ ${args[0]} อยู่ที่ x : ${position.x.toFixed(2)}, y : ${position.y.toFixed(2)}, z : ${position.z.toFixed(2)}`);
            break;
        case 'random': case 'roll':
            if (!args[0])
                return mineflayerBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`)
            else if (!args[1] && !isNaN(args[0]))
                return mineflayerBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * parseInt(args[0]))) + 1} ค่ะ`)
            else if (!isNaN(args[1]))
                return mineflayerBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (parseInt(args[1]) - parseInt(args[0]) + 1))) + parseInt(args[0])} ค่ะ`)
            else
                return mineflayerBot.chat(`คือ หนูจะบอกว่าที่คุณใส่มาน่ะมันไม่ใช่ตัวเลขอะค่ะ ช่วยใส่ให้หนูใหม่ได้มั้ยคะ`);
            break;
        case 'sendjkc':
            client.guilds.cache.get('423007343127822338').channels.cache.get('423047710413946880').send(`<${username}> ${args.map(function (sentence) {
                return sentence;
            }).join(' ')}`);
            break;
    }
}
