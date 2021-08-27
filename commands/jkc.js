const config = require('../settings.json')
const { MessageEmbed , MessageActionRow , MessageButton} = require("discord.js");

module.exports.run = async (client, message, args) => {
    const link = new MessageActionRow()
        .addComponents(new MessageButton().setURL('https://www.facebook.com/JukucrushTeam?ref=hl').setLabel('Fackbook').setStyle('LINK'))
        .addComponents(new MessageButton().setURL('https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw').setLabel('Youtube').setStyle('LINK'))
        .addComponents(new MessageButton().setURL('https://github.com/opecgame/JKC-Discord-Bot').setLabel('Github').setStyle('LINK'));
    
    const embedjkcinfo = new MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL()).setColor("#FFD157")
        .setTitle("--สวัสดีค่ะ น้องจุ๊ก เอง--").setURL('https://github.com/opecgame/JKC-Discord-Bot')
        .addField("📰สามารถติดตาม Jukucrush Team ได้ที่ Facebook", '[Facebook - Jukucrush Team](https://www.facebook.com/JukucrushTeam?ref=hl)')
        .addField("📌หรือที่ youtube", '[Youtube - Jukucrush Team](https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw)')
        .addField("👨🏻‍💻สามารถตรวจสอบคำสั่งและอัพเดตทั้งหมดได้ที่", '[Github JKC - Discord Bot](https://github.com/opecgame/JKC-Discord-Bot)')
        .setFooter(client.user.username + " | Version " + config.version, client.user.displayAvatarURL());
    
    message.channel.send({ embeds: [embedjkcinfo] , components: [link]})
}

module.exports.config = {
    name: "jkc",
    aliases: ['jukucrush']
}
