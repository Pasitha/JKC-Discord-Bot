const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const config = require('../../settings.json');

module.exports.run = async (client, JKCJrBot, JKCSupBot, message, args) => {
    let commonhelpEmbed = new MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL()).setURL('https://github.com/Pasitha/JKC-Discord-Bot')
        .setTitle('คำสั่งทั้งหมดของ JKC\'s Discord Bot').setDescription('ก่อนใช้ทุกคำสั่งใช้ให้พิมพ์นำหน้าด้วย \`$\` แล้วตามด้วยชื่อคำสั่งได้เลย')
        .addFields(
            { name: ' - \`$info\`', value: 'ใช้สำหรับบอกข้อมูลต่าง ๆ ของผู้ใช้โดยสามารถใช้ได้โดย \`$info @ผู้ใช้\`' },
            { name: ' - \`$jkc\`', value: ' -> \`$jkc\`ใช้สำหรับบอกข้อมูลของทีม JKC ช่องทางการติดต่อต่าง ๆ\n -> \`$jkc ดูไรดี\` ใช้สำหรับสุ่มคลิปจาก Jukucrush team มาให้รับชมกัน' },
            { name: ' - \`$mchead\`', value: 'ใช้สำหรับดูว่าหัวของ skin คนนั้น ๆ \nสามารถบอกคนที่ต้องการหาได้โดย \`$mchead MINECRAFT_NAME\`' },
            { name: ' - \`$mcskin\`', value: 'ใช้สำหรับดู skin คนนั้น ๆ \nสามารถบอกคนที่ต้องการหาได้โดย \`$mchead MINECRAFT_NAME\`' },
            { name: ' - \`$query\`', value: 'มีคำถามเกี่ยวกับทีม JKC ใช้คำสั่งนี้ได้เลยเดี๋ยวหนูจะตอบเท่าที่หนูตอบได้' },
            { name: ' - \`$random\`', value: 'ใช้สำหรับสุ่มตัวเลขตามช่วงต่าง ๆ' },
            { name: ' - \`$vote\`', value: 'ใช้สำหรับตั้งโพลโหวตส่งต่าง ๆ ที่ต้องการเสียงของคนหลาย ๆ คน' },
        )
        .setFooter(client.user.username + " | Version " + config.version, client.user.displayAvatarURL());

    let jkcCommandEmbed = new MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL()).setURL('https://github.com/Pasitha/JKC-Discord-Bot')
        .setTitle('คำสั่งเพิ่มเติมของ JKC\'s Discord Bot').setDescription('ก่อนใช้ทุกคำสั่งใช้ให้พิมพ์นำหน้าด้วย \`$\` แล้วตามด้วยชื่อคำสั่งได้เลย')
        .addFields(
            { name: ' - \`$position\`', value: 'ใช้ถามหาว่าภายในเซิฟ JKC Jr.5 ผู้เล่นคนนี้อยู่ที่พิกัดอะไร ตัวอย่างเช่น \`$position Pasitha\`\n(ตัวเล็กตัวใหญ่มีผลต่อชื่อเด้อ)' },
            { name: ' - \`$onlineplayer\`', value: 'ใช้สำหรับบอกว่าในเซิฟ JKC Jr.5 มีผู้เล่นอะไรที่ online อยู่บ้าง' },
        )
        .setFooter(client.user.username + " | Version " + config.version, client.user.displayAvatarURL());

    const rowhome = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('home_btn')
                .setLabel('คำสั่งทั่วไป')
                .setStyle('PRIMARY')
                .setEmoji('⌨️')
                .setDisabled(true),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('1')
                .setLabel('คำสั่งเพิ่มเติม')
                .setStyle('SECONDARY')
                .setEmoji('1️⃣'),
        )

    const row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('home_btn')
                .setLabel('หน้าแรก')
                .setStyle('PRIMARY')
                .setEmoji('⌨️'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('1')
                .setLabel('คำสั่งเพิ่มเติม')
                .setStyle('SECONDARY')
                .setEmoji('1️⃣')
                .setDisabled(true),
        )

    msg = await message.channel.send({ embeds: [commonhelpEmbed], components: [rowhome] });
    const collector = message.channel.createMessageComponentCollector({ time: 15000 });

    let authorID = message.author.id;

    collector.on('collect', async (b) => {
        if (authorID != message.author.id) return;
        if (b.customId === 'home_btn') {
            msg.edit({ embeds: [commonhelpEmbed], components: [rowhome] });
            b.deferUpdate();
        }
        if (b.customId === '1') {
            msg.edit({ embeds: [jkcCommandEmbed], components: [row1] });
            b.deferUpdate();
        }
    });

    collector.on('end', (collected, reason) => {
        if (reason && reason === `exit`) {
            msg.edit({ components: [] });
        }
        if (reason === `time` && collected.size == 0) {
            msg.edit({ components: [] });
        }
    });
}

module.exports.config = {
    name: "help",
    aliases: ['h', 'จุ๊กกก']
}
