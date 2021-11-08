const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const Canvas = require('canvas');

const config = require('../../../settings.json');

module.exports.run = async (client, message, args) => {
    const filter = (reaction, user) => {
        return (reaction.emoji.name === '1️⃣') && user.id === message.author.id;
    };

    const attachment = new MessageAttachment('../picture/jkc-casino/casino.png', 'casino.png');
    let msg = await message.channel.send({files: [attachment]});

    const collector = msg.createReactionCollector({ filter , time: 15000 });
    msg.react('▶️').catch(error => console.error('One of the emojis failed to react:', error));
    
    collector.on('collect', async (reaction, user) => {
        if (reaction.emoji.name === '1️⃣') {
            const slot_matchine_wheels = ['🍒', '🍌', '🥥', '🍱', '🍲', '🍰', '🎂'];

            
        }
    });
};

module.exports.name = ['slot'];
