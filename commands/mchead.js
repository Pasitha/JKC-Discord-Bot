const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [new MessageEmbed().setAuthor("อยากได้หัวใครช่วยบอกหนูหน่อยนะคะ").setColor('#ff0000')] });

    require('request')(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`, { json: true }, (error, response, body) => {
        try {
            const identifier = response.body.id;

            message.channel.send({ content: `${args[0]} Head`, files: [`https://mc-heads.net/avatar/${identifier}.png`, `https://mc-heads.net/head/${identifier}/${(args[1] === 'left' ? 'left' : 'right')}.png`,] });
        } catch {
            message.channel.send({ embeds: [new MessageEmbed().setAuthor(`หนูไม่พบผู้เล่นชื่อ ${args[0]} เลยนะคะ`).setColor('#ff0000')] });
        }
    });
}
module.exports.config = {
    name: "mchead",
    aliases: ['minecrafthead']
}
