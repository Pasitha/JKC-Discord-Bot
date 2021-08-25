const config = require('../settings.json')
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [new MessageEmbed().setAuthor("อยากได้สกินของใครช่วยบอกหนูหน่อยนะคะ").setColor('#ff0000')] });

    require('request')(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`, { json: true }, (error, response, body) => {
        const identifier = response.body.id;
        message.channel.send({ content: `${args[0]} Skin`, files: [`https://mc-heads.net/player/${identifier}.png`, `https://mc-heads.net/skin/${identifier}.png`,] });
    });
}
module.exports.config = {
    name: "mcskin",
    aliases: ['minecraftskin']
}
