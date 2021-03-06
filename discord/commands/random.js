const { MessageEmbed } = require("discord.js");

const config = require('../../settings.json');

module.exports.run = async (client, message, args) => {
    let randomEmbed = new MessageEmbed().setFooter(client.user.username + " | Version " + version, client.user.displayAvatarURL()).setColor("#FFD157");

    if (!args[0])
        return message.channel.send({ embeds: [randomEmbed().setAuthor(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`)] });
    else if (!args[1] && !isNaN(args[0]))
        return message.channel.send({ embeds: [randomEmbed().setAuthor(`เลขที่ออกคือเลข ${Math.floor((Math.random() * parseInt(args[0]))) + 1} ค่ะ`)] });
    else if (!isNaN(args[1]))
        return message.channel.send({ embeds: [randomEmbed().setAuthor(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (parseInt(args[1]) - parseInt(args[0]) + 1))) + parseInt(args[0])} ค่ะ`)] });
    else
        return message.channel.send({ embeds: [randomEmbed().setAuthor(`คือ หนูจะบอกว่าที่คุณใส่มาน่ะมันไม่ใช่ตัวเลขอะค่ะ ช่วยใส่ให้หนูใหม่ได้มั้ยคะ`).setColor('#ff0000')] });
}

module.exports.name = ['random', 'roll'];
