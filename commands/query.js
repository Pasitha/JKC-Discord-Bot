const config = require('../settings.json')
const Discord = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports.run = async (client, message, args) => {
    let QAndA_embed = new Discord.MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL())
        .setTitle('👱🏻‍♀️สวัสดีค่ะมีคำถามอะไรอยากถามหนูหรอคะ').setDescription('😅คำถามที่ทุกคนมักจะถามกัน')
        .addField('1️⃣ ตอนนี้เปิดรับสมัคร Junior มั้ย ?', '⏰ตอนนี้ยังไม่รับสมัครนะคะ')
        .addField('2️⃣ คำสั่งของ JKC Discord Bot (หนูนี้เองง) มีอะไรบ้าง ?', '⏰สามารถติดตามคำสั่งของหนูได้ที่ [Github JKC - Discord Bot](https://github.com/opecgame/JKC-Discord-Bot) นะคะ')
        .setFooter('👋สามารถกดปุ่มเพื่อถามลายละเอียดเพิ่มเติมได้นะคะ');

    let embed1 = new Discord.MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL())
    .setTitle('ตอนนี้เปิดรับสมัคร Junior มั้ย ?').setDescription('ตอนนี้ทางทีมของJukucrush Team ยังไม่เปิดรับสมัครนะคะ')

    let embed2 = new Discord.MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL())
    .setTitle('👱🏻คำสั่งของ JKC Discord Bot (หนูนี้เองง) มีอะไรบ้าง ?').setDescription('ใน Github มีคำสั่งทิ้งหมดของหนูเขียนเอาไว้ให้แล้วค่าาา อ่านในนั้นรู้ทั้ง Code และ คำสั่งเลยนะคะ😅')

    

    const rowhome = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('home_btn')
                .setLabel('หน้าแรก')
                .setStyle('PRIMARY')
                .setEmoji('🏡')
                .setDisabled(true),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('1')
                .setStyle('SECONDARY')
                .setEmoji('1️⃣'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('2')
                .setStyle('SECONDARY')
                .setEmoji('2️⃣'),
        )

    const row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('home_btn')
                .setLabel('หน้าแรก')
                .setStyle('PRIMARY')
                .setEmoji('🏡')
                ,
        )
        .addComponents(
            new MessageButton()
                .setCustomId('1')
                .setStyle('SECONDARY')
                .setEmoji('1️⃣')
                .setDisabled(true),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('2')
                .setStyle('SECONDARY')
                .setEmoji('2️⃣'),
        )

    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('home_btn')
                .setLabel('หน้าแรก')
                .setStyle('PRIMARY')
                .setEmoji('🏡')
                ,
        )
        .addComponents(
            new MessageButton()
                .setCustomId('1')
                .setStyle('SECONDARY')
                .setEmoji('1️⃣')
                ,
        )
        .addComponents(
            new MessageButton()
                .setCustomId('2')
                .setStyle('SECONDARY')
                .setEmoji('2️⃣')
                .setDisabled(true),
        )

    msg = message.channel.send({embeds: [QAndA_embed], components: [rowhome]})
    const collector = message.channel.createMessageComponentCollector();

    msg = await msg

    collector.on('collect', async (b) => {
        if (b.customId === 'home_btn') {
            msg.edit({embeds: [QAndA_embed], components: [rowhome]});
            b.deferUpdate();
        }
        if (b.customId === '1') {
            msg.edit({embeds: [embed1], components: [row1]});
            b.deferUpdate();
        }
        if (b.customId === '2') {
            msg.edit({embeds: [embed2], components: [row2]});
            b.deferUpdate();
        }
        
    });
    
    collector.on('end', (collected, reason) => {
        if (reason && reason === `exit`) {
            msg.edit({components: []});
        }
        if (reason === `time` && collected.size == 0) {
            msg.edit({components: []});
        }
    });
}
module.exports.config = {
    name: "query",
    aliases: []
}