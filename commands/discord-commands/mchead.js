const { MessageEmbed } = require("discord.js");
const axios = require('axios').default

module.exports.run = async (client, JKCJrBot, JKCSupBot, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [new MessageEmbed().setAuthor("อยากได้หัวใครช่วยบอกหนูหน่อยนะคะ").setColor('#ff0000')] });
    const { id: identifier } = (await axios.get(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`)).data
    try {
        message.channel.send({ content: `${args[0]} Head`, files: [`https://mc-heads.net/avatar/${identifier}.png`, `https://mc-heads.net/head/${identifier}/${(args[1] === 'left' ? 'left' : 'right')}.png`,] });
    } catch {
        message.channel.send({ embeds: [new MessageEmbed().setAuthor(`หนูไม่พบผู้เล่นชื่อ ${args[0]} เลยนะคะ`).setColor('#ff0000')] });
    }
}

module.exports.config = {
    name: "mchead",
    aliases: ['minecrafthead']
}
