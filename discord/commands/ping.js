const { MessageEmbed } = require('discord.js');

const config = require('../../settings.json');

module.exports.run = async (client, message, args) => {
    message.channel.send('⏰กำลังเช็คนะคะ').then(async (msg) => message.channel.send({embeds: [
        new MessageEmbed().setTitle('ping ของหนู').setColor('#FFD157').setThumbnail(client.user.displayAvatarURL())
        .addField(`🏓Latencyของหนู ตอนนี้อยู่ที่ประมาณ`, `\`${msg.createdTimestamp - message.createdTimestamp}มิลลิวินาที(ms)\``).addField(`🏓ส่วนของAPI Latency อยู่ที่ประมาณ`, `\`${Math.round(client.ws.ping)}มิลลิวินาที(ms)\``)
        .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())
    ]}));
}

module.exports.name = ['ping'];
