const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});
const mineflayer = require('mineflayer');
const fs = require('fs');

const { prefix } = require('../settings.json');

client.commands = new Discord.Collection();

let JKCJrBot = mineflayer.createBot(config.minecraftid.JukkyjungJR);
let JKCSupBot = mineflayer.createBot(config.minecraftid.JukkyjungSUP);

// load commands
fs.readdir('commands/', (err, files) => {
    
    if (err) console.log(err);

    const jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
        return console.log(`Bot Couldn\'t Find Commands in folder ${dir}`);
    }
    
    jsfiles.forEach((f, i) => {
        const modules = require(`./commands/${f}`);
        
        modules.name.forEach(commandName => {
            client.commands.set(commandName, modules);
        });
    });
});

// discord event section
client.once('ready', () => {
    console.log('JKC Discord Bot: minecraft section ready');
});

client.on('messageCreate', message => {
    if (message.author.bot || !message.content.startsWith(prefix) || message.channel.type === 'dm') return;

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    const commandfile = client.commands.get(cmd.slice(prefix.length).toString().toLowerCase());
	if (commandfile)
		commandfile.run(client, JKCJrBot, JKCSupBot, message, args);
});

client.login(config.token);

// mineflayer event section
const createJKCJrBot = () => {
    JKCJrBot = mineflayer.createBot(config.minecraftid.JukkyjungJR);
    JKCJrBot.once('spawn', () => {
        console.log('JKC Jr Bot spawn');
    });
  
    JKCJrBot.on('chat', async (username, message) => {
        if (username === JKCJrBot.username || !message.startsWith(prefix)) return;

        const messageArray = message.split(' ');
        const cmd = messageArray[0];
        const args = messageArray.slice(1);

        switch (cmd.slice(prefix.length)) {
            case 'cal':
                let operations = args.map((player) => {
                    return player;
                }).join(' ');

                try {
                    JKCJrBot.chat(`จาก ${operations} หนูคิดแล้วได้เท่ากับ ${eval(operations)}`);
                } catch (e) {
                    JKCJrBot.chat(`หนูว่าที่ให้หนูมาคำนวณนี้มันไม่น่าใช่ตัวเลขปกติใช่มะ`)
                }
                break;
            case 'help':
                JKCJrBot.chat(`ตอนนี้มีคำสั่งดังนี้ค่ะ [cal, pos, random, sendjkc] ตอนใช้อย่าลืมใส่ $ ก่อนด้วยนะคะ`);
                break;
            case 'loaded':
                await JKCJrBot.waitForChunksToLoad();
                JKCJrBot.chat('Ready!');
                break;
            case 'pos': case 'position':
                if (!args[0]) return JKCJrBot.chat(`ตอนนี้ ${JKCJrBot.username} อยู่ที่ x : ${JKCJrBot.entity.position.x.toFixed(2)}, y : ${JKCJrBot.entity.position.y.toFixed(2)}, z : ${JKCJrBot.entity.position.z.toFixed(2)}`);

                if (!Object.keys(JKCJrBot.players).includes(args[0])) return JKCJrBot.chat(`ตอนนี้ในเซิฟไม่มีคนที่ชื่อ ${args[0]} อยู่ในเซิฟนะคะ`);
                JKCJrBot.chat(`/tp Jukkyjung ${args[0]}`);

                await new Promise(resolve => setTimeout(resolve, 50));
                await JKCJrBot.waitForChunksToLoad();

                const position = JKCJrBot.entity.position;

                JKCJrBot.chat(`ตอนนี้ ${args[0]} อยู่ที่ x : ${position.x.toFixed(2)}, y : ${position.y.toFixed(2)}, z : ${position.z.toFixed(2)}`);
                break;
            case 'random': case 'roll':
                if (!args[0])
                    return JKCJrBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`)
                else if (!args[1] && !isNaN(args[0]))
                    return JKCJrBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * parseInt(args[0]))) + 1} ค่ะ`)
                else if (!isNaN(args[1]))
                    return JKCJrBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (parseInt(args[1]) - parseInt(args[0]) + 1))) + parseInt(args[0])} ค่ะ`)
                else
                    return JKCJrBot.chat(`คือ หนูจะบอกว่าที่คุณใส่มาน่ะมันไม่ใช่ตัวเลขอะค่ะ ช่วยใส่ให้หนูใหม่ได้มั้ยคะ`);
            case 'sendjkc':
                client.guilds.cache.get('423007343127822338').channels.cache.get('423047710413946880').send(`<${username}> ${args.map(function (sentence) {
                    return sentence;
                }).join(' ')}`);
                break;
            case 'trans': case 'transfer': case 'pay':
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
                break;
        }
    });
    JKCJrBot.on('error', (err) => console.log('JKC Jr Bot: ', err));
    JKCJrBot.on('end', createJKCJrBot);
}
createJKCJrBot();

const createJKCSupBot = () => {
    JKCSupBot = mineflayer.createBot(config.minecraftid.JukkyjungSUP);
    JKCSupBot.once('spawn', () => {
        console.log('JKC Sup Bot spawn');
    });
  
    JKCSupBot.on('chat', async (username, message) => {
        if (username === JKCSupBot.username || !message.startsWith(prefix)) return;

        const messageArray = message.split(' ');
        const cmd = messageArray[0];
        const args = messageArray.slice(1);

        switch (cmd.slice(prefix.length)) {
            case 'cal':
                let operations = args.map((player) => {
                    return player;
                }).join(' ');

                try {
                    JKCSupBot.chat(`จาก ${operations} หนูคิดแล้วได้เท่ากับ ${eval(operations)}`);
                } catch (e) {
                    JKCSupBot.chat(`หนูว่าที่ให้หนูมาคำนวณนี้มันไม่น่าใช่ตัวเลขปกติใช่มะ`)
                }
                break;
            case 'help':
                JKCSupBot.chat(`ตอนนี้มีคำสั่งดังนี้ค่ะ [cal, pos, random, sendjkc] ตอนใช้อย่าลืมใส่ $ ก่อนด้วยนะคะ`);
                break;
            case 'loaded':
                await JKCSupBot.waitForChunksToLoad();
                JKCSupBot.chat('Ready!');
                break;
            case 'pos': case 'position':
                if (!args[0]) return JKCSupBot.chat(`ตอนนี้ ${JKCSupBot.username} อยู่ที่ x : ${JKCSupBot.entity.position.x.toFixed(2)}, y : ${JKCSupBot.entity.position.y.toFixed(2)}, z : ${JKCSupBot.entity.position.z.toFixed(2)}`);

                JKCSupBot.chat(`/tp Jukkyjung ${args[0]}`);
                if (!Object.keys(JKCSupBot.players).includes(args[0])) return JKCSupBot.chat(`ตอนนี้ในเซิฟไม่มีคนที่ชื่อ ${args[0]} อยู่ในเซิฟนะคะ`);

                await new Promise(resolve => setTimeout(resolve, 50));
                await JKCSupBot.waitForChunksToLoad();

                const position = JKCSupBot.entity.position;

                JKCSupBot.chat(`ตอนนี้ ${args[0]} อยู่ที่ x : ${position.x.toFixed(2)}, y : ${position.y.toFixed(2)}, z : ${position.z.toFixed(2)}`);
                break;
            case 'random': case 'roll':
                if (!args[0])
                    return JKCSupBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`)
                else if (!args[1] && !isNaN(args[0]))
                    return JKCSupBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * parseInt(args[0]))) + 1} ค่ะ`)
                else if (!isNaN(args[1]))
                    return JKCSupBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (parseInt(args[1]) - parseInt(args[0]) + 1))) + parseInt(args[0])} ค่ะ`)
                else
                    return JKCSupBot.chat(`คือ หนูจะบอกว่าที่คุณใส่มาน่ะมันไม่ใช่ตัวเลขอะค่ะ ช่วยใส่ให้หนูใหม่ได้มั้ยคะ`);
            case 'send':
                client.guilds.cache.get('423007343127822338').channels.cache.get('423047710413946880').send(`<${username}> ${args.map(function (sentence) {
                    return sentence;
                }).join(' ')}`);
                break;
        }
    });
    JKCSupBot.on('error', (err) => console.log('JKC Sup Bot: ', err));
    JKCSupBot.on('end', createJKCSupBot);
}
createJKCSupBot();
