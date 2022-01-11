const { Client, Intents, Collection } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});
const fs = require('fs');
const request = new (require('rss-parser'));
const jsonstringify = require('json-stringify-pretty-compact');

const { version, prefix, token } = require('../settings.json');
const { member } = require('../database/jkc.json');

client.commands = new Collection();

// Youtube update
setInterval(() => {
    if (member.length > 32) {
        console.log(member.length);
        return;
    }

    for (let i = 0; i < member.length; i++) {
        if (member[i].allowUpdate) {
            request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${member[i].youtube.channelId}`).then((data) => {

                if (!member[i].youtube.lastVideoUpdate.includes(data.items[0].link)) {
                    let channel = client.channels.cache.get('438885368436359168');

                    if (channel) {
                        let persuasion = ['เฮ้ทุกคนคะ !!!', 'ทุกคนนคะหนูจะบอกว่า', 'ง่าาาาาทุกคนนนนน', 'นี้ ๆ ทุกคนตอนนี้'];
                        channel.send(`${persuasion[Math.floor((Math.random() * (persuasion.length - 1)))]} ช่อง **${data.items[0].author}** มีอัพเดตแล้วไปดูกันเร็ว!!! \n${data.items[0].link}`);
                    }

                    for (let j = 0; j < 3; j++) {
                        member[i].youtube.lastVideoUpdate[j] = data.items[j].link;
                    }
                }

                fs.writeFile('../database/jkc.json', jsonstringify({ member }), (err) => {
                    if (err) throw err;
                });
            }).catch(error => console.log(error));
        }
    }
}, 60000);

// BirthDay update
setInterval(() => {
    const todayStr = new Date().toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', timeZone: 'Asia/Bangkok' }).slice(0, 5);

    for (let i = 0; i < member.length; i++) {
        if (member[i].birthDay.slice(0, 5) === todayStr) {
            const HBDEmbed = new Discord.MessageEmbed()
                .setThumbnail(client.user.displayAvatarURL()).setColor("#FFD157")
                .setTitle(`🎂🎂🎂 สุขสันต์วันเกิดนะคะ 🥂 ${member[i].youtube.channelName} 🎂🎂🎂`)
                .setFooter(client.user.username + " | Version " + version, client.user.displayAvatarURL());

            return client.channels.cache.get("552889042878857227").send({ embeds: [HBDEmbed] });
        }
    }
}, 86400000);

// load discord commands
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
    console.log('JKC Discord Bot: discord section ready');
});

client.on('messageCreate', message => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const web = message.content.split(' ').filter(word => word.match(/https?:\/\//)).join(' ');
    if (web && message.content != '') {
        const regex = /https?:\/\/(www\.)?(drive.google.com|forms.gle|youtube.com|youtu.be|github.com|stackoverflow.com|web.facebook.com|facebook.com|cdn.discordapp.com|discord.com|discord.gg|media.discordapp.com|th.wikipedia.org|en.wikipedia.org|feedback.minecraft.net|minecraft.net|twitter.com|tenor.com|optifine.net|fabricmc.net|vt.tiktok.com|playvalorant.com|curseforge.com)\/?/;
    
        if (!regex.test(message.content)) {
            fs.appendFile('../database/website.csv', `\n\"${message.author.username}\",\"${message.author.id}\",\"${message.content.replace(/(\r\n|\n|\r)/gm, '')}\",\"${web}\"`, function (err) {
                if (err) throw err;
                message.delete();
            });
            return;
        }
    }
    if (!message.content.startsWith(prefix)) return;

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    const commandfile = client.commands.get(cmd.slice(prefix.length).toString().toLowerCase());
	if (commandfile)
		commandfile.run(client, message, args);
});

client.login(token);
