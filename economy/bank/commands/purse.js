const { MessageEmbed } = require("discord.js");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

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
    return message.channel.send({
        embeds: [new MessageEmbed()
            .setTitle(`🤑กระเป๋าตังของ ${message.author.username}🤑`)
            .setDescription((account.coins === 0) ? ` - ตอนนี้คุณไม่มีเงินเลยนะคะ ไปทำอะไรมาคะเนี่ย😓` : ` - ตอนนี้คุณมีเงินอยู่ :dollar: ${account.coins} แหน่ะ`)
            .setThumbnail(client.user.displayAvatarURL()).setColor('#FFD156')
            .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())]
    });
}

module.exports.name = ['purse', 'money'];
