const config = require('../../settings.json')
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, JKCJrBot, JKCSupBot, message, args) => {

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
    const roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);
    
    moment.locale('th');
    const embeduserinfo = new MessageEmbed().setColor(member.displayHexColor).setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL());
    try { embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 })) } catch { }
    try { embeduserinfo.setAuthor('Member ' + `${member.user.username}#${member.user.discriminator}` + ' information', member.user.displayAvatarURL({ dynamic: true })) } catch { }
    try { embeduserinfo.addField('Name:', `\`${member.user.username}#${member.user.discriminator}\``, true) } catch { }
    try { embeduserinfo.addField('Joined at: ', `\`${moment(member.joinedAt).format('LL LTS')} ${moment(member.joinedAt).fromNow()}\``, true) } catch { }
    try { embeduserinfo.addField('User id:', `\`${member.id}\``, true) } catch { }
    try { embeduserinfo.addField(`${roles.length} Roles:`, `${roles.length < 10 ? roles.join('\n') : roles.length > 10 ? this.trimArray(roles) : 'ไม่มียศ'}`, true) } catch { }
    try { embeduserinfo.addField('Created at:', `\`${moment(member.user.createdTimestamp).format('LLL')} ${moment(member.user.createdTimestamp).fromNow()}\``, true) } catch { }

    return message.channel.send({ embeds: [embeduserinfo] })
}

module.exports.config = {
    name: 'info',
    aliases: ['if']
}
