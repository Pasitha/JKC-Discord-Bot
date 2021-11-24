const { MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

const config = require('../../settings.json');

module.exports.run = async (client, message, args) => {
    const canvas = Canvas.createCanvas(960, 540);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage(`../picture/jukkyjung-adventure/Jukkyjung_adventure_background${Math.floor(Math.random() * 3) + 1}.png`);
    const jukkyjung = await Canvas.loadImage(`../picture/jkc-discord-bot-fa/Jukubot_FA2.png`);

    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.drawImage(jukkyjung, 30, 200, 350, 350);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'game.png');

    message.channel.send({files: [attachment]});
}

module.exports.name = ['play'];
