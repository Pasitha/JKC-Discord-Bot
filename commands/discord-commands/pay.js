const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const jsonstringify = require('json-stringify-pretty-compact');

const config = require('../../settings.json');
let account = require('../../database/account.json');

module.exports.run = (client, JKCJrBot, JKCSupBot, message, args) => {
    if (!Object.keys(account).includes(message.author.id)) {
        account[message.author.id] = {
            name: message.author.username,
            amount: 100
        }
    }

    if (account[message.author.id].amount > 0) {
        let user = message.mentions.users.first();

        if (!user || user.id === message.author.id) {
            return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`อยากโดนตังให้ใครหรอคะ บอกหนูหน่อยจิ`).setColor('#ff0000')] });
        } else {
            if (!Object.keys(account).includes(user.id)) {
                account[user.id] = {
                    name: user.username,
                    amount: 100
                }
            }

            if (!/([0-9]+)/.test(args[1])) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`ช่วยบอกจำนวนเงินที่จะโอนให้ด้วยนะคะ`).setColor('#ff0000')] });
            if (parseInt(args[1]) < 0) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`ฮั่นแน่!! จะทำอะไรน่ะ ไปใส่จำนวนเงินมาใหม่เลย`).setColor('#ff0000')] });

            if (parseInt(args[1]) <= account[message.author.id].amount) {
                account[message.author.id].amount -= parseInt(args[1]);
                account[user.id].amount += parseInt(args[1]);

                fs.writeFile('./database/account.json', jsonstringify(account), (err) => {
                    if (err) throw err;
                });

                return message.channel.send({ embeds: [new MessageEmbed().setTitle(`โอนเงินสำเร็จค่ะะ`).setDescription(`ตอนนี้หนูโอนของ ${message.author.username} ไปให้ ${user.username} เป็นจำนวนเงิน ${args[1]} เรียบร้อยค่ะ`)
                    .setThumbnail(client.user.displayAvatarURL()).setColor('#FFD157')
                    .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())] });
            } else {
                return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`คุณไม่มีเงินพอให้โอนนะคะ โปรดตรวจสอบเงินในบัญชีของคุณด้วย`)] });
            }
        }
    } else {
        return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`คุณไม่มีเงินให้โอนเลยนะคะ`).setColor('#ff0000')] });
    }
}

module.exports.config = {
    name: 'pay',
    aliases: ['give']
}
