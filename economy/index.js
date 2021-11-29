const { Client, Intents, Collection} = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { prefix, token } = require('../settings.json');

client.commands = new Collection();

// interest system
setInterval(async () => {
    await prisma.$executeRaw`UPDATE user SET coins = coins*1.1 WHERE coins > 50000`;
    await prisma.$executeRaw`UPDATE user SET coins = coins*1.2 WHERE coins < 50000`;
    await prisma.$executeRaw`UPDATE user SET coins = coins*1.3 WHERE coins < 10000`;
}, 259200000);

// load discord commands
['bank', 'casino'].forEach(dir => {
    fs.readdir(`${dir}/commands`, (err, files) => {
        
        if (err) console.log(err);
    
        const jsfiles = files.filter(f => f.split('.').pop() === 'js');
        if (jsfiles.length <= 0) {
            return console.log(`Bot Couldn\'t Find Commands in folder ${dir}`);
        }
        
        jsfiles.forEach((f, i) => {
            const modules = require(`./${dir}/commands/${f}`);
            
            modules.name.forEach(commandName => {
                client.commands.set(commandName, modules);
            });
        });
    });
})

// discord event section
client.once('ready', () => {
    console.log('JKC Discord Bot: economy section ready');
});

client.on('messageCreate', message => {

	if (message.author.bot || !message.content.startsWith(prefix) || message.channel.type === 'dm') return;

	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

    const commandfile = client.commands.get(cmd.slice(prefix.length).toString().toLowerCase());
	if (commandfile)
		commandfile.run(client, message, args);
});

client.login(token);
