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

const config = require('../settings.json');

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
