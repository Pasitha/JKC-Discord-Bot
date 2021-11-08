const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const Canvas = require('canvas');

const config = require('../../../settings.json');

module.exports.run = async (client, message, args) => {
    // const canvas = Canvas.createCanvas(960, 540);
    // const context = canvas.getContext('2d');
    
    // const background = await Canvas.loadImage(`./Jukkyjung_adventure_background${Math.floor(Math.random() * 5) + 1}.png`);

    // context.drawImage(background, 0, 0, canvas.width, canvas.height);

    // context.strokeRect(0, 0, canvas.width, canvas.height);

    // const avatar = await Canvas.loadImage(message.member.displayAvatarURL({ format: 'jpg' }));

    // context.drawImage(avatar, 25, 25, 200, 200);
    // const attachment = new MessageAttachment(canvas.toBuffer(), 'game_display.png');
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
