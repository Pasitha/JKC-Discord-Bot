const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios').default

const { version } = require('../../settings.json');

module.exports.run = async (client, message, args) => {
    const ShiorizeID = (await axios.get(`https://api.mojang.com/users/profiles/minecraft/Shiorize`)).data

    let jrshopEmbed = new MessageEmbed().setColor("#FFD157").setThumbnail(`https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-logo/JuniorLogo.png`)
        .setTitle('ร้านค้าออนไลน์').setDescription('อยากดูรายการของร้านไหนสามารถกดดูได้เลยนะคะ')
        .addField('1️⃣  ShiorizeFOOD', '\u200B')
        .setFooter('👋สามารถกดปุ่มเพื่อดูลายละเอียดเพิ่มเติมได้นะคะ');

    let ShiorizeShop = new MessageEmbed().setColor("#FFD157").setThumbnail(`https://mc-heads.net/avatar/${ShiorizeID.id}.png`)
        .setTitle('ShiorizeFOOD ยินดีให้บริการค่ะ').setDescription('')
        .setFooter(client.user.username + " | Version " + version, client.user.displayAvatarURL());

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
        );

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
        );

    // client.users.cache.get('772298728697495582').send({ embeds: [randomEmbed.setAuthor(`คือ หนูจะบอกว่าที่คุณใส่มาน่ะมันไม่ใช่ตัวเลขอะค่ะ ช่วยใส่ให้หนูใหม่ได้มั้ยคะ`).setColor('#ff0000')] });

    let msg = await message.channel.send({ embeds: [jrshopEmbed], components: [rowhome] });
    const collector = message.channel.createMessageComponentCollector({ time: 15000 });

    collector.on('collect', async (b) => {
        if (b.customId === 'home_btn') {
            msg.edit({ embeds: [jrshopEmbed], components: [rowhome] });
            b.deferUpdate();
        } else if (b.customId === '1') {
            msg.edit({ embeds: [ShiorizeShop], components: [row1] });
            b.deferUpdate();
        }
    });

    collector.on('end', (collected, reason) => {
        if (reason && reason === `exit`)
            msg.edit({ components: [] });
        else if (reason === `time` && collected.size == 0)
            msg.edit({ components: [] });
    });

}

module.exports.name = ['jrshop'];
