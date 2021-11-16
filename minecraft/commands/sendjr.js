const { MessageEmbed } = require("discord.js");

const config = require('../../settings.json');

module.exports.run = async (client, JKCJrBot, JKCSupBot, message, args) => {
    if (message.member.roles.cache.some(role => {
        return role.name === 'Jukucrush Member' ||
            role.name === 'Jukucrush Junior' || role.name === 'Jukuboost' || role.name === 'Moderator';
    })) {
        if (message.channel.id === '423047710413946880') {
            JKCJrBot.chat(`/tellraw @a [\"<\",{\"text\":\"${message.author.username}\",\"bold\":true,\"color\":\"blue\"},\"> ${args.map(function (sentence) { return sentence; }).join(' ')}\"]`);
        } else if (message.guild.id === '748140372814856292' && message.channel.id === '892428320136904744') {
            JKCSupBot.chat(`จาก ${message.author.username} ${args.map(function (sentence) {
                return sentence;
            }).join(' ')}`);
        } else {
            return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`คำสั่งนี้หนูไม่ให้สั่งในห้องนี้นะ!!! ไปสั่งหนูให้ถูกห้องเลยนะ`).setColor('#ff0000')] });
        }
    } else {
        return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`ฮั่นแน่!! อยากคุยกับคนในเซิฟใช่ม๊า~~~ ไปเอายศมาให้ได้สิ`).setColor('#ff0000')] });
    }
}

module.exports.name = ['sendjr'];
