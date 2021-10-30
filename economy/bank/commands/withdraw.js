const { MessageEmbed } = require("discord.js");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const config = require('../../../settings.json');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ ช่วยบอกหนูด้วยนะคะว่าอยากจะฝากเงินเท่าไหร่หรอคะ??`).setColor('#ff0000')] });
    if (!/([0-9]+)/.test(args[0]) || parseInt(args[0]) < 0) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ คุณกำลังพยายามทำอะไรหรอคะ😓`).setColor('#ff0000')] });
    // if (!args[0].isInteger()) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ หนูไม่รับเศษเงินนะคะ ขอเงินแบบเต็มเม็ดเต็มหน่วยหน่อยนะคะ`).setColor('#ff0000')] });

    let account = await prisma.account.findUnique({
        where: {
            discord_id: message.author.id
        }
    });
    if (!account) {
        account = await prisma.account.create({
            data: {
                discord_id: message.author.id,
                discord_name: message.author.username
            }
        });
    }

    if (args[0] > account.coins) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ คุณมีเงินในบัญชีไม่พอนะคะ`).setColor('#ff0000')] });

    let user = await prisma.user.findUnique({
        where: {
            discord_id: message.author.id
        }
    });
    if (!user) {
        account = await prisma.user.create({
            data: {
                discord_id: message.author.id,
                discord_name: message.author.username
            }
        });
    }

    user.coins += parseInt(args[0]);
    account.coins -= parseInt(args[0]);

    await prisma.user.update({
        where: {
            discord_id: message.author.id
        },
        data: {
            ...user
        }
    });
    await prisma.account.update({
        where: {
            discord_id: message.author.id
        },
        data: {
            ...account
        }
    });

    return message.channel.send({ embeds: [
        new MessageEmbed().setTitle('ถอนเงินสำเร็จค่ะ').setDescription(`ตอนนี้เงินในบัญชีเหลือ ${account.coins} นะคะ😘`)
    ]});
}

module.exports.name = ['withdraw'];
