const { MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

const config = require('../../settings.json');

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

    if (account.coins < 10) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ คุณไม่มีเงินพอสำหรับการเล่นนะคะ ค่าเล่นตาละ 10 JKC coins นะคะ`).setColor('#ff0000')] }); 

    const canvas = Canvas.createCanvas(960, 540);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage(`../picture/jukkyjung-adventure/Jukkyjung_adventure_background${Math.floor(Math.random() * 3) + 1}.png`);
    const jukkyjung = await Canvas.loadImage(`../picture/jkc-discord-bot-fa/Jukubot_FA2.png`);

    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.drawImage(jukkyjung, 30, 200, 350, 350);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'game.png');

    message.channel.send({files: [attachment]});

    await prisma.user.update({
        where: {
            discord_id: message.author.id
        },
        data: {
            ...account
        }
    });
}

module.exports.name = ['play'];
