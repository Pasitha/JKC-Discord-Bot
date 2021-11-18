const { MessageEmbed, MessageAttachment } = require("discord.js");
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
    if (account.coins > 100) {
        msg.react('1️⃣').catch(error => console.error('One of the emojis failed to react:', error));
        
        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === '1️⃣') {
                msg.delete();
                account.coins -= 100;
                
                const canvas = Canvas.createCanvas(960, 540);
                const context = canvas.getContext('2d');

                const background = await Canvas.loadImage('../picture/jkc-casino/slot/JKC_discordSlot_machine.png');

                context.drawImage(background, 0, 0, canvas.width, canvas.height);
                context.strokeRect(0, 0, canvas.width, canvas.height);

                const slot1 = Math.floor(Math.random()*7) + 1;
                const slot2 = Math.floor(Math.random()*7) + 1;
                const slot3 = Math.floor(Math.random()*7) + 1;

                const first_slot_wheel = await Canvas.loadImage(`../picture/jkc-casino/slot/slot_wheel_${slot1}.png`);
                const second_slot_wheel = await Canvas.loadImage(`../picture/jkc-casino/slot/slot_wheel_${slot2}.png`);
                const third_slot_wheel = await Canvas.loadImage(`../picture/jkc-casino/slot/slot_wheel_${slot3}.png`);

                context.drawImage(first_slot_wheel, 205, 127, 96, 143);
                context.drawImage(second_slot_wheel, 357, 127, 96, 143);
                context.drawImage(third_slot_wheel, 504, 127, 96, 143);

                const attach = new MessageAttachment(canvas.toBuffer(), 'slot.png');

                message.channel.send({ files: [attach] });
                if (slot1 === slot2 && slot2 === slot3) {
                    account.coins += slot1 * (slot1 * 10000);
                }
                await prisma.user.update({
                    where: {
                        discord_id: message.author.id
                    },
                    data: {
                        ...account
                    }
                });
            }
        });
    }
};

module.exports.name = ['slot'];
