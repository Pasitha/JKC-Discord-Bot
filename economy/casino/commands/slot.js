const { MessageEmbed, MessageAttachment } = reqire("discord.js");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const Canvas = require('canvas');

const config = require('../../../settings.json');

module.exports.run = async (client, message, args) => {
    let account = await prisma.user.findUnique({
        where: {
            discord_id: message.author.id
        }
    });
    if (!account) {
        account = await prisma.user.create({
            data: {
                discord_id: message.author.id,
                discord_name: message.author.username
            }
        });
    }
    
    const attachment = new MessageAttachment('../picture/jkc-casino/casino.png', 'casino.png');
    let msg = await message.channel.send({files: [attachment]});
    
    const filter = (reaction, user) => {
        return (reaction.emoji.name === '1️⃣') && user.id === message.author.id;
    };

    const collector = msg.createReactionCollector({ filter , time: 15000 });
    if (account.coins < 100) {
        msg.react('1️⃣').catch(error => console.error('One of the emojis failed to react:', error));
        
        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === '1️⃣') {
                account.coins -= 100;
                
                const canvas = Canvas.createCanvas(960, 540);
                const context = canvas.getContext('2d');

                const background = await canvas.loadImage('../picture/jkc-casino/slot/JKC_discordSlot_matchine.png');

                context.drawImage(background, 0, 0, canvas.width, canvas.height);
                context.strokeRect(0, 0, canvas.width, canvas.height);

                const slot1 = Math.floor(Math.random()*10) + 1;
                const slot2 = Math.floor(Math.random()*10) + 1;
                const slot3 = Math.floor(Math.random()*10) + 1;

                const first_slot_wheel = await canvas.loadImage(`../picture/jkc-casino/slot-wheel/${slot1}.png`);
                const second_slot_wheel = await canvas.loadImage(`../picture/jkc-casino/slot-wheel/${slot2}.png`);
                const third_slot_wheel = await canvas.loadImage(`../picture/jkc-casino/slot-wheel/${slot3}.png`);

                context.drawImage(first_slot_wheel, 20, 20, 250, 250);
                context.drawImage(second_slot_wheel, 40, 20, 250, 250);
                context.drawImage(third_slot_wheel, 60, 20, 250, 250);

                if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
                    account.coins += 100*0.5;

                    return message.channel.send({ embeds: [new MessageEmbed.setTitle('ยินดีด้วย')] });
                }
            }
        });
    }
};

module.exports.name = ['slot'];
