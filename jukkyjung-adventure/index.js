const { Client, Intents, Collection } = require('discord.js');
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGE,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});
const fs = require('fs');

const { prefix, token } = require('../settings.json');

client.commands = new Discord.Collection();

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
    client.user.setStatus('idle');
    client.user.setPresence({ activities: [{ name: 'Discord' }], status: 'playing' });

    console.log('Jukkyjung advanture: is now ready');
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
