const { Client, Intents, Collection } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});
const mineflayer = require('mineflayer');
const fs = require('fs');

const { prefix, token, minecraftid } = require('../settings.json');

client.commands = new Collection();
let ModuleName = []

let JKCBot;

// load discord commands
fs.readdir('discord-commands/', (err, files) => {
    
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

// load minecraft commands
fs.readdir('commands/', (err, files) => {
    
    if (err) console.log(err);

    const jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
        return console.log(`Bot Couldn\'t Find Commands in folder ${dir}`);
    }
    
    jsfiles.forEach((f, i) => {
        const modules = require(`./commands/${f}`);
        
        modules.name.forEach(commandName => {            
            ModuleName = [...ModuleName, commandName]
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

client.login(token);

// mineflayer event section
const createJKCBot = () => {
    JKCBot = mineflayer.createBot(minecraftid.JukkyjungJR);
    JKCBot.once('spawn', () => {
        console.log('JKC Jr Bot spawn');
    });
  
    JKCBot.on('chat', async (username, message) => {
        if (username === JKCBot.username || !message.startsWith(prefix)) return;

        const messageArray = message.split(' ');
        const cmd = messageArray[0];
        const args = messageArray.slice(1);

        if (ModuleName.includes(cmd)) {
            require(`./commands/${cmd}.js`).run(JKCBot, args)
        }
    });
    JKCBot.on('error', (err) => console.log('JKC Jr Bot: ', err));
    JKCBot.on('end', createJKCBot);
}
createJKCBot();
