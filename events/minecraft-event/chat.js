const config = require('../../settings.json');

const prefix = config.prefix;

module.exports = async (mineflayerBot, username, mcMessage) => {
    if (username === mineflayerBot.username || !mcMessage.startsWith(prefix)) return;

    const messageArray = mcMessage.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    switch (cmd.slice(prefix.length)) {
        case 'loaded':
            await mineflayerBot.waitForChunksToLoad();
            mineflayerBot.chat('Ready!');
        break;
        case 'pos':
            if (!args[0]) return mineflayerBot.chat(`ตอนนี้ ${mineflayerBot.username} อยู่ที่ x : ${mineflayerBot.entity.position.x.toFixed(2)}, y : ${mineflayerBot.entity.position.y.toFixed(2)}, z : ${mineflayerBot.entity.position.z.toFixed(2)}`);
            
            mineflayerBot.chat(`/tp Jukkyjung ${args[0]}`);
            if (!Object.keys(mineflayerBot.players).includes(args[0])) return mineflayerBot.chat(`ตอนนี้ในเซิฟไม่มีคนที่ชื่อ ${args[0]} อยู่ในเซิฟนะคะ`);
            
            await new Promise(resolve => setTimeout(resolve, 50));
            await mineflayerBot.waitForChunksToLoad();

            const position = mineflayerBot.entity.position;

            mineflayerBot.chat(`ตอนนี้ ${args[0]} อยู่ที่ x : ${position.x.toFixed(2)}, y : ${position.y.toFixed(2)}, z : ${position.z.toFixed(2)}`);
        break;
        case 'random':
            if (!args[0]) return mineflayerBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`)
            if (!args[1]) return mineflayerBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * parseInt(args[0]))) + 1} ค่ะ`)
            mineflayerBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (parseInt(args[1]) - parseInt(args[0]) + 1)) ) + parseInt(args[0])} ค่ะ`)
        break;
    }
}
