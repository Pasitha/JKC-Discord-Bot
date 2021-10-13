const { MessageEmbed } = require("discord.js");

const config = require('../../settings.json');
let account = require('../../database/account.json');

module.exports.run = (client, JKCJrBot, JKCSupBot, message, args) => {
    if (!Object.keys(account).includes(message.author.id)) {
        account[message.author.id] = {
            name: message.author.username,
            amount: 100
        }
    }

    return message.channel.send({ embeds: [new MessageEmbed().setTitle(`🤑บัญชีของ ${message.author.username}🤑`).setDescription(` - ตอนนี้คุณ ${message.author.username} มีเงินอยู่ :dollar: ${account[message.author.id].amount} แหน่ะ`)
        .setThumbnail(client.user.displayAvatarURL()).setColor('#FFD157')
        .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())] });
}

module.exports.config = {
    name: 'myaccount',
    aliases: ['account']
}
