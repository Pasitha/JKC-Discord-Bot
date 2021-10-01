const config = require('../../settings.json')
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, JKCJrBot, JKCSupBot, message, args) => {
    if (!args[0]) return message.channel.send({embeds : [new MessageEmbed().setAuthor(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`)]});
    if (!args[1]) return message.channel.send({embeds : [new MessageEmbed().setAuthor(`เลขที่ออกคือเลข ${Math.floor((Math.random() * parseInt(args[0]))) + 1} ค่ะ`)]});
    message.channel.send({embeds : [new MessageEmbed().setAuthor(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (parseInt(args[1]) - parseInt(args[0]) + 1)) ) + parseInt(args[0])} ค่ะ`)]});
}

module.exports.config = {
    name: 'random',
    aliases: []
}
