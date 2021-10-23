const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const config = require('../../settings.json');

module.exports.run = async (client, JKCJrBot, JKCSupBot, message, args) => {
    if (!args[0]) {
        const link = new MessageActionRow()
            .addComponents(new MessageButton().setURL('https://www.facebook.com/JukucrushTeam?ref=hl').setLabel('Facebook').setStyle('LINK'))
            .addComponents(new MessageButton().setURL('https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw').setLabel('YouTube').setStyle('LINK'))
            .addComponents(new MessageButton().setURL('https://github.com/opecgame/JKC-Discord-Bot').setLabel('GitHub').setStyle('LINK'));

        const embedjkcinfo = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL()).setColor('#FFD157')
            .setTitle('--สวัสดีค่ะ น้องจุ๊ก เอง--').setURL('https://github.com/Pasitha/JKC-Discord-Bot')
            .addField('📰สามารถติดตาม Jukucrush Team ได้ที่ Facebook', '[Facebook - Jukucrush Team](https://www.facebook.com/JukucrushTeam?ref=hl)')
            .addField('📌หรือที่ youtube', '[Youtube - Jukucrush Team](https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw)')
            .addField('👨🏻‍💻สามารถตรวจสอบคำสั่งและอัพเดตทั้งหมดได้ที่', '[Github JKC - Discord Bot](https://github.com/Pasitha/JKC-Discord-Bot)')
            .addField('👉🏻หรือสามารถพิมพ์', '```$help```')
            .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL());

        return message.channel.send({ embeds: [embedjkcinfo], components: [link] });
    } else if (args[0] === 'ดูไรดี') {
        function youtube_parser(url) {
            let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            let match = url.match(regExp);
            return (match && match[7].length == 11) ? match[7] : false;
        }

        const JKC = require('../../database/jkc.json');
        const randomMember = Math.floor(Math.random() * JKC.member.length);
        let randomRecentClip = null;

        while (!randomRecentClip)
            randomRecentClip = JKC.member[randomMember].youtube.lastVideoUpdate[Math.floor(Math.random() * 3)];

        const recentClipEmbed = new MessageEmbed()
            .setThumbnail('https://github.com/Pasitha/JKC-Discord-Bot/raw/main/picture/jkc-logo/jkc-logo.png').setColor('#FFD157')
            .setTitle('หาอะไรดูใช่มั้ยคะ').setURL(randomRecentClip).setImage(`https://img.youtube.com/vi/${youtube_parser(randomRecentClip)}/0.jpg`)
            .addField('นี้เลยหนูแนะนำลองไปดูคลิปนี้เลย', `ของช่อง [${JKC.member[randomMember].youtube.channelName}](${randomRecentClip}) ไปดูกันนนน`)
            .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL());

        return message.channel.send({ embeds: [recentClipEmbed] });
    }
}

module.exports.config = {
    name: 'jkc',
    aliases: ['jukucrush']
}
