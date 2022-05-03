const { MessageEmbed } = require("discord.js");

const config = require('../../settings.json');

module.exports.run = async (client, JKCJrBot, message, args) => {
    const onlienPlayer = new MessageEmbed().setThumbnail(client.user.displayAvatarURL()).setColor('#FFD157')
        .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL());

    if (message.guild.id === '423007343127822338') {
        let onlineplayerlist = Object.keys(JKCJrBot.players).map(function (player) {
            return player;
        }).join(', ');

        onlienPlayer.setTitle('Jukucrush Junior SS.5').setDescription(`online ทั้งหมด ${Object.keys(JKCJrBot.players).length} คน`)
            .addField('ผู้เล่นที่อยู่ในเซิฟ', onlineplayerlist);
        return message.channel.send({ embeds: [onlienPlayer] });
    } else if (message.guild.id === '748140372814856292') {
        let onlineplayerlist = Object.keys(JKCSupBot.players).map(function (player) {
            return player;
        }).join(', ');

        onlienPlayer.setTitle('Jukucrush Supporter Server').setDescription(`online ทั้งหมด ${Object.keys(JKCSupBot.players).length} คน`)
            .addField('ผู้เล่นที่อยู่ในเซิฟ', onlineplayerlist);
        return message.channel.send({ embeds: [onlienPlayer] });
    } else {
        return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`คำสั่งนี้หนูไม่ให้สั่งในห้องนี้นะ!!! ไปสั่งหนูให้ถูกห้องเลยนะ`).setColor('#ff0000')] });
    }
}

module.exports.name = ['list', 'onlineplayer'];
