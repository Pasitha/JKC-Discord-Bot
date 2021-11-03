const { MessageEmbed } = require("discord.js");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const config = require('../../../settings.json');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ คุณจะโอนเงินให้ใครหรอคะ??`).setColor('#ff0000')] });
    
    let account_1 = await prisma.account.findUnique({
        where: {
            discord_id: message.author.id
        }
    });
    if (!account_1) {
        account_1 = await prisma.account.create({
            data: {
                discord_id: message.author.id,
                discord_name: message.author.username
            }
        });
    }

    if (account_1.coins > 0) {
        let user = message.mentions.users.first();
        if (!user || user.id === message.author.id) {
            return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`อยากโดนตังให้ใครหรอคะ บอกหนูหน่อยจิ`).setColor('#ff0000')] });
        } else {
            let account_2 = await prisma.account.findUnique({
                where: {
                    discord_id: user.id
                }
            });
            if (!account_2) {
                account_2 = await prisma.account.create({
                    data: {
                        discord_id: user.id,
                        discord_name: user.username
                    }
                });
            }

            let result = /([0-9]+)/.exec(args[0]);
            if (result[0] !== result.input) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ ที่ใส่มามันไม่ใช่ตัวเลขนะคะ รบกวนใส่ใหม่อีกทีนะคะ`).setColor('#ff0000')] });
            if (parseInt(args[1]) < 0) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`ฮั่นแน่!! จะทำอะไรน่ะ ไปใส่จำนวนเงินมาใหม่เลย`).setColor('#ff0000')] });

            if (parseInt(args[1]) <= account_1.coins) {
                account_1.coins -= parseInt(args[1]);
                account_2.coins += parseInt(args[1]);

                let account_1_history = JSON.parse(account_1.history);
                account_1_history.push({
                    "date": new Date().toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', timeZone: 'Asia/Bangkok' }),
                    "count": args[1],
                    "receiver_id": user.id
                });
                let account_2_history = JSON.parse(account_2.history);
                account_2_history.push({
                    "date": new Date().toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', timeZone: 'Asia/Bangkok' }),
                    "count": args[1],
                    "transferor_id": user.id
                });

                account_1.history = JSON.stringify(account_1_history);
                account_2.history = JSON.stringify(account_2_history);

                await prisma.account.update({
                    where: {
                        discord_id: account_1.discord_id
                    },
                    data: {
                        ...account_1
                    }
                });
                await prisma.account.update({
                    where: {
                        discord_id: account_2.discord_id
                    },
                    data: {
                        ...account_2
                    }
                });

                return message.channel.send({
                    embeds: [new MessageEmbed().setTitle(`💸โอนเงินสำเร็จค่ะะ💸`).setDescription(`ตอนนี้หนูโอนของ ${message.author.username} ไปให้ ${user.username} เป็นจำนวนเงิน ${args[1]} เรียบร้อยค่ะ💸`)
                        .setThumbnail(client.user.displayAvatarURL()).setColor('#FFD157')
                        .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())]
                });
            } else {
                return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`คุณไม่มีเงินพอให้โอนนะคะ โปรดตรวจสอบเงินในบัญชีของคุณด้วย`)] });
            }
        }
    } else {
        return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`คุณไม่มีเงินให้โอนเลยนะคะ`).setColor('#ff0000')] });
    }
}

module.exports.name = ['transfer'];
