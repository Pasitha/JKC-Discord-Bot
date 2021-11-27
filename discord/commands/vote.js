const { MessageEmbed } = require("discord.js");

const { version } = require('../../settings.json');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [new MessageEmbed().setAuthor("รบกวนช่วยบอก Titleของpollนี้หน่อยค่ะ")] });
    else if (!args[1]) return message.channel.send({ embeds: [new MessageEmbed().setColor('#ff0000').setAuthor("รบกวนช่วยบอก Description ของ poll นี้ให้หน่อยค่ะ")] });
    else if (!args[2]) return message.channel.send({ embeds: [new MessageEmbed().setColor('#ff0000').setAuthor("รบกวนช่วยบอก Choice ของ poll นี้หน่อยค่ะ")] });
    else if (args[12]) return message.channel.send({ embeds: [new MessageEmbed().setColor('#ff0000').setAuthor("ต้องขอประทานอภัยด้วยนะค่ะ choice เยอะกว่า 10 หนูไม่รองรับค่ะ ต้องขออภัยจริง ๆ ค่ะ")] });

    const defEmojiList = [
        '\u0031\u20E3',
        '\u0032\u20E3',
        '\u0033\u20E3',
        '\u0034\u20E3',
        '\u0035\u20E3',
        '\u0036\u20E3',
        '\u0037\u20E3',
        '\u0038\u20E3',
        '\u0039\u20E3',
        '\uD83D\uDD1F'
    ];

    let embed = new MessageEmbed().setColor("#FFD157")
        .setTitle(args[0]).setDescription(args[1]).setThumbnail(client.user.displayAvatarURL())
        .setFooter(client.user.username + " | Version " + version, client.user.displayAvatarURL());

    for (let index = 2; index < args.length; index++)
        embed.addField("Choice", `${defEmojiList[index - 2]} ${args[index]}`, true);

    message.channel.send({ embeds: [embed] }).then(function (message) {
        try {
            for (let i = 0; i < args.length - 2; i++)
                message.react(defEmojiList[i]);
        } catch (error) {
            console.log(error);
        }
    }).catch((error) => console.log(error));
}

module.exports.name = ['vote', 'poll'];
