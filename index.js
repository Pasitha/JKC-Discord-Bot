const Discord = require('discord.js');
const client = new Discord.Client({
    intents:[
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

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const config = require('./settings.json');
const { loadCommands } = require('./utils/loadCommands');
require('./utils/loadEvents')(client);


loadCommands(client);
client.login(config.token);
