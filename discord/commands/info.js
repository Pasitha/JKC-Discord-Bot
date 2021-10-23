const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const config = require('../../settings.json');

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    if (!user)
        return message.channel.send({
            embeds: [new MessageEmbed()
                .setColor('RED')
                .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())
                .setTitle(':x: Error | กรุณากล่าวถึงผู้ที่ต้องการทราบข้อมูล')
            ]
        });
    const member = message.mentions.members.last() || message.member;
    let roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString());
    roles.pop();

    moment.locale('th');
    const embeduserinfo = new MessageEmbed().setColor(member.displayHexColor).setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setAuthor('Member ' + `${member.user.username}#${member.user.discriminator}` + ' information', member.user.displayAvatarURL({ dynamic: true }))
        .addField('Name:', `\`${member.user.username}#${member.user.discriminator}\``, true)
        .addField('Joined at: ', `\`${moment(member.joinedAt).format('LL LTS')} ${moment(member.joinedAt).fromNow()}\``, true)
        .addField('User id:', `\`${member.id}\``, true)
        .addField(`${roles.length} Roles:`, `${roles.length < 10 ? roles.join('\n') : roles.length > 10 ? this.trimArray(roles) : 'ไม่มียศ'}`, true)
        .addField('Created at:', `\`${moment(member.user.createdTimestamp).format('LLL')} ${moment(member.user.createdTimestamp).fromNow()}\``, true)

    return message.channel.send({ embeds: [embeduserinfo] })
}

module.exports.name = ['info'];
