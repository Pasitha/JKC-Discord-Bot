const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [new MessageEmbed().setAuthor("อยากได้สกินของใครช่วยบอกหนูหน่อยนะคะ").setColor('#ff0000')] });

    require('request')(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`, { json: true }, (error, response, body) => {
        try {
            const identifier = response.body.id;
    
            message.channel.send({ content: `${args[0]} Skin`, files: [`https://mc-heads.net/player/${identifier}.png`, `https://mc-heads.net/skin/${identifier}.png`,] });
        } catch {
            message.channel.send({ embeds: [new MessageEmbed().setAuthor(`หนูไม่พบผู้เล่นชื่อ *${args[1]}* เลยนะคะ`).setColor('#ff0000')] });
        }
    });
}
module.exports.config = {
    name: "mcskin",
    aliases: ['minecraftskin']
}
