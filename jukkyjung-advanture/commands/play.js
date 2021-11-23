const { MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

const config = require('../../../settings.json');

module.exports.run = async (client, message, args) => {
    const canvas = Canvas.createCanvas(960, 540);
    const context = Canvas.getContext('2d');

    const background = await Canvas.loadImage(`../picture/jukkyjung-andavture/background/background-${Math.floor(Math.random() * 2) + 1}.png`);
    const jukkyjung = await Canvas.loadImage(`../picture/jukkyjung-andavture/jukkyjung.png`);

    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.drawImage(jukkyjung, 50, 0, 900, 900);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'game.png');

    message.channel.send({files: [attachment]});
}

module.exports.name = ['transfer'];
