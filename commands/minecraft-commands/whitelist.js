const { MessageEmbed } = require("discord.js");
const config = require('../../settings.json');

module.exports.run = async (client, JKCJrBot, JKCSupBot, message, args) => {
    if (message.guild.id === '748140372814856292' && message.channel.id === '892428320136904744') {
        require('request')(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`, { json: true }, (error, response, body) => {
            try {
                const identifier = response.body.id;

                message.channel.send({ embeds: [
                    new MessageEmbed().setTitle('เพิ่มWhitelistสำเร็จ!!').setDescription(`หนูได้เพิ่ม ${args[0]} ในwhitelistเรียบร้อยแล้วค่ะ`)
                    .setThumbnail(`https://mc-heads.net/avatar/${identifier}`).setColor('#FFD157')
                ] });
                JKCSupBot.chat(`/whitelist add ${args[0]}`);
            } catch {
                message.channel.send({ embeds: [new MessageEmbed().setAuthor(`หนูไม่พบผู้เล่นชื่อ ${args[0]} เลยนะคะ`).setColor('#ff0000')] });
            }
        });
    } else {
        return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`ไปเจอคำสั่งนี้มากจากไหน!!!`).setColor('#ff0000')] });
    }
}

module.exports.config = {
    name: "whitelist",
    aliases: ['wl', 'w']
}
