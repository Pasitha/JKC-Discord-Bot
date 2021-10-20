const Discord = require('discord.js');
const mineflayer = require('mineflayer');
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

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const config = require('./settings.json');

const JKCJrBot = mineflayer.createBot(config.minecraftid.JukkyjungJR)
JKCJrBot.once('spawn', () => {
    console.log('JKC Jr Bot spawn');
});
const JKCSupBot = mineflayer.createBot(config.minecraftid.JukkyjungSUP);
JKCSupBot.once('spawn', () => {
    console.log('JKC Sup Bot spawn');
});

require('./utils/loadEvents')(client, { JKCJrBot, JKCSupBot });
require('./utils/loadCommands')(client);

require('./utils/ytUpdate')(client);

client.login(config.token);
