const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_INVITES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "GUILD_PRESENCES",
        "GUILD_VOICE_STATES",
        "GUILD_WEBHOOKS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
    ]
});
const fs = require('fs');
const request = new require('rss-parser');
const jsonstringify = require('json-stringify-pretty-compact');

const config = require('../settings.json');
const jkcData = require('../database/jkc.json');

client.commands = new Discord.Collection();

// load commands
fs.readdir('commands/', (err, files) => {
    
    if (err) console.log(err);

    const jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
        return console.log(`Bot Couldn\'t Find Commands in folder ${dir}`);
    }
    
    jsfiles.forEach((f, i) => {
        const module = require(`../commands/${f}`);
        
        module.config.name.forEach(commandName => {
            client.commands.set(commandName, module);
        });
    });
});

// Youtube update
setInterval(() => {
    if (jkcData.member.length > 32) {
        console.log(jkcData.member.length);
        return;
    }

    for (let i = 0; i < jkcData.member.length; i++) {
        if (jkcData.member[i].allowUpdate) {
            request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${jkcData.member[i].youtube.channelId}`).then((data) => {

                if (!jkcData.member[i].youtube.lastVideoUpdate.includes(data.items[0].link)) {
                    let channel = client.channels.cache.get('438885368436359168');

                    if (channel) {
                        let persuasion = ['เฮ้ทุกคนคะ !!!', 'ทุกคนนคะหนูจะบอกว่า', 'ง่าาาาาทุกคนนนนน', 'นี้ ๆ ทุกคนตอนนี้'];
                        channel.send(`${persuasion[Math.floor((Math.random() * (persuasion.length - 1)))]} ช่อง **${data.items[0].author}** มีอัพเดตแล้วไปดูกันเร็ว!!! \n${data.items[0].link}`);
                    }

                    for (let j = 0; j < 3; j++) {
                        jkcData.member[i].youtube.lastVideoUpdate[j] = data.items[j].link;
                    }
                }

                fs.writeFile('../database/jkc.json', jsonstringify(jkcData), (err) => {
                    if (err) throw err;
                });
            }).catch(error => console.log(error));
        }
    }
}, 60000);

// BirthDay update
setInterval(() => {
    const todayStr = new Date().toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', timeZone: 'Asia/Bangkok' }).slice(0, 5);

    if (config.lastrun !== todayStr) {
        config.lastrun = todayStr;
        fs.writeFile('../settings.json', jsonstringify(config), (err) => {
            if (err) throw err;
        });

        for (let i = 0; i < jkcData.member.length; i++) {
            if (jkcData.member[i].birthDay.slice(0, 5) === todayStr) {
                const HBDEmbed = new MessageEmbed()
                    .setThumbnail(client.user.displayAvatarURL()).setColor("#FFD157")
                    .setTitle(`🎂🎂🎂 สุขสันต์วันเกิดนะคะ 🥂 ${require('../jkc.json').member[0].youtube.channelName} 🎂🎂🎂`)
                    .setFooter(client.user.username + " | Version " + config.version, client.user.displayAvatarURL());

                return client.channels.cache.get("552889042878857227").send({ embeds: [HBDEmbed] });
            }
        }
    }
}, 3600000);

client.once('ready', () => {
    client.user.setStatus('idle');
    client.user.setPresence({ activities: [{ name: 'Discord' }], status: 'playing' });

    console.log('JKC Discord Bot is online!');
});

client.on('messageCreate', message => {
	if (message.content != '') {
		const web = message.content.match(/\bhttps?:\/\/\S+/gi);
		if (web) {
			if (!web.some(urls => [
                    'www.youtube.com', 'www.facebook.com', 'www.cdn.discord.app', 'github.com', 'www.google.com'
                ].includes(new URL(urls).hostname))) {
				return message.delete();
			}
		}
	}
    
    const prefix = config.prefix;

	if (message.author.bot || !message.content.startsWith(prefix) || message.channel.type === 'dm') return;

	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

    const commandfile = client.commands.get(cmd.slice(prefix.length).toString().toLowerCase());
	if (commandfile)
		commandfile.run(client, message, args);
});

client.login(config.token);
