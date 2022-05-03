const { MessageEmbed } = require('discord.js');

const config = require('../../settings.json');

module.exports.run = async (client, JKCJrBot, message, args) => {
    if (message.guild.id === '423007343127822338') {
        if (!args[0]) return message.channel.send({
            embeds: [
                new MessageEmbed().setTitle('Jukucrush junior SS.5').setDescription(`${JKCJrBot.username}`).addField('ตอนนี้ในเซิฟอยู่ทีพิกัด', `x:${JKCJrBot.entity.position.x.toFixed(2)}, y:${JKCJrBot.entity.position.y.toFixed(2)}, z:${JKCJrBot.entity.position.z.toFixed(2)}`)
                    .setThumbnail(`https://mc-heads.net/avatar/${JKCJrBot.players[JKCJrBot.username].entity.uuid}`).setColor('#FFD157')
                    .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())
            ]
        });

        if (!Object.keys(JKCJrBot.players).includes(args[0])) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`ตอนนี้ในเซิฟไม่มีคนที่ชื่อ ${args[0]} อยู่ในเซิฟนะคะ`).setColor('#ff0000')] });;

        JKCJrBot.chat(`/tp Jukkyjung ${args[0]}`);
        await new Promise(resolve => setTimeout(resolve, 50));

        const position = JKCJrBot.entity.position;
        await JKCJrBot.waitForChunksToLoad();

        message.channel.send({
            embeds: [
                new MessageEmbed().setTitle('Jukucrush junior SS.5').setDescription(`${args[0]}`).addField('ตอนนี้ในเซิฟอยู่ทีพิกัด', `\`x : ${position.x.toFixed(2)}\ny : ${position.y.toFixed(2)}\nz : ${position.z.toFixed(2)}\``)
                    .setThumbnail(`https://mc-heads.net/avatar/${JKCJrBot.players[args[0]].entity.uuid}`).setColor('#FFD157')
                    .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())
            ]
        });
    } else if (message.guild.id === '748140372814856292') {
        if (!args[0]) return message.channel.send({
            embeds: [
                new MessageEmbed().setTitle('Supporter Server').setDescription(`${JKCSupBot.username}`).addField('ตอนนี้ในเซิฟอยู่ทีพิกัด', `x:${JKCSupBot.entity.position.x.toFixed(2)}, y:${JKCSupBot.entity.position.y.toFixed(2)}, z:${JKCSupBot.entity.position.z.toFixed(2)}`)
                    .setThumbnail(`https://mc-heads.net/avatar/${JKCSupBot.players[JKCSupBot.username].entity.uuid}`).setColor('#FFD157')
                    .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())
            ]
        });

        if (!Object.keys(JKCSupBot.players).includes(args[0])) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`ตอนนี้ในเซิฟไม่มีคนที่ชื่อ ${args[0]} อยู่ในเซิฟนะคะ`).setColor('#ff0000')] });;

        JKCSupBot.chat(`/tp Jukkyjung ${args[0]}`);
        await new Promise(resolve => setTimeout(resolve, 50));

        const position = JKCSupBot.entity.position;
        await JKCSupBot.waitForChunksToLoad();

        message.channel.send({
            embeds: [
                new MessageEmbed().setTitle('Supporter Server').setDescription(`${args[0]}`).addField('ตอนนี้ในเซิฟอยู่ทีพิกัด', `\`x : ${position.x.toFixed(2)}\ny : ${position.y.toFixed(2)}\nz : ${position.z.toFixed(2)}\``)
                    .setThumbnail(`https://mc-heads.net/avatar/${JKCSupBot.players[args[0]].entity.uuid}`).setColor('#FFD157')
                    .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())
            ]
        });
    } else {
        return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`คำสั่งนี้หนูไม่ให้สั่งในห้องนี้นะ!!! ไปสั่งหนูให้ถูกห้องเลยนะ`).setColor('#ff0000')] });
    }
}

module.exports.name = ['pos']; 
