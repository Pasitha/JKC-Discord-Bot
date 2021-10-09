const config = require('../../settings.json')
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, JKCJrBot, JKCSupBot, message, args) => {
    if (!args[0]) {
        return message.channel.send({embeds : [new MessageEmbed().setAuthor(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`)]});
    }

    if (!args[1]) {
        const maxlazy = parseInt(args[0])

        if (maxlazy === NaN) {
            // พี่ Max เเก้ด้วย
            return message.channel.send({embeds : [new MessageEmbed().setAuthor(`idk value`)]});
        }

        return message.channel.send({embeds : [new MessageEmbed().setAuthor(`เลขที่ออกคือเลข ${Math.floor((Math.random() * maxlazy)) + 1} ค่ะ`)]});
    }

    // พี่ Max เเก้ด้วย

    const maxlazy0 = parseInt(args[0])
    const maxlazy1 = parseInt(args[1])

    if (maxlazy0 === NaN || maxlazy1 === NaN) {
        // พี่ Max เเก้ด้วย
        return message.channel.send({embeds : [new MessageEmbed().setAuthor(`idk value`)]});
    }

    message.channel.send({embeds : [new MessageEmbed().setAuthor(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (maxlazy1 - maxlazy0 + 1)) ) + maxlazy0} ค่ะ`)]});
}

module.exports.config = {
    name: 'random',
    aliases: []
}
