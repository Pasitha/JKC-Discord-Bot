const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const config = require('../../settings.json');

module.exports.run = async (client, message, args) => {
    let discordCommands = new MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL()).setURL('https://github.com/Pasitha/JKC-Discord-Bot')
        .setTitle('คำสั่งทั้งหมดของ JKC\'s Discord Bot').setDescription('ก่อนใช้ทุกคำสั่งใช้ให้พิมพ์นำหน้าด้วย \`$\` แล้วตามด้วยชื่อคำสั่งได้เลย')
        .addFields(
            { name: ' - \`$info\`', value: 'ใช้สำหรับบอกข้อมูลต่าง ๆ ของผู้ใช้\nโดยสามารถใช้ได้โดย \`$info @ผู้ใช้\`' },
            { name: ' - \`$jkc\`', value: ' -> \`$jkc\`ใช้สำหรับบอกข้อมูลของทีม JKC ช่องทางการติดต่อต่าง ๆ\n -> \`$jkc ดูไรดี\` ใช้สำหรับสุ่มคลิปจาก Jukucrush team มาให้รับชมกัน' },
            { name: ' - \`$mchead\`', value: 'ใช้สำหรับดูว่าหัวของ skin คนนั้น ๆ \nสามารถบอกคนที่ต้องการหาได้โดย \`$mchead MINECRAFT_NAME\`' },
            { name: ' - \`$mcskin\`', value: 'ใช้สำหรับดู skin คนนั้น ๆ \nสามารถบอกคนที่ต้องการหาได้โดย \`$mchead MINECRAFT_NAME\`' },
            { name: ' - \`$query\`', value: 'มีคำถามเกี่ยวกับทีม JKC ใช้คำสั่งนี้ได้เลยเดี๋ยวหนูจะตอบเท่าที่หนูตอบได้' },
            { name: ' - \`$random\`', value: 'ใช้สำหรับสุ่มตัวเลขตามช่วงต่าง ๆ' },
            { name: ' - \`$vote\`', value: 'ใช้สำหรับตั้งโพลโหวตส่งต่าง ๆ ที่ต้องการเสียงของคนหลาย ๆ คน' },
        )
        .setFooter(client.user.username + " | Version " + config.version, client.user.displayAvatarURL());

    let minecraftCommands = new MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL()).setURL('https://github.com/Pasitha/JKC-Discord-Bot')
        .setTitle('คำสั่งเพิ่มเติมของ JKC\'s Discord Bot').setDescription('ก่อนใช้ทุกคำสั่งใช้ให้พิมพ์นำหน้าด้วย \`$\` แล้วตามด้วยชื่อคำสั่งได้เลย')
        .addFields(
            { name: ' - \`$position\`', value: 'ใช้ถามหาว่าภายในเซิฟ JKC Jr.5 ผู้เล่นคนนี้อยู่ที่พิกัดอะไร ตัวอย่างเช่น \`$position Pasitha\`\n(ตัวเล็กตัวใหญ่มีผลต่อชื่อเด้อ)' },
            { name: ' - \`$onlineplayer\`', value: 'ใช้สำหรับบอกว่าในเซิฟ JKC Jr.5 มีผู้เล่นอะไรที่ online อยู่บ้าง' },
            { name: ' - \`$\`', value: 'ใช้สำหรับบอกว่าในเซิฟ JKC Jr.5 มีผู้เล่นอะไรที่ online อยู่บ้าง' },
        )
        .setFooter(client.user.username + " | Version " + config.version, client.user.displayAvatarURL());

    let economyCommands = new MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL()).setURL('https://github.com/Pasitha/JKC-Discord-Bot')
        .setTitle('คำสั่งเพิ่มเติมของ JKC\'s Discord Bot').setDescription('ก่อนใช้ทุกคำสั่งใช้ให้พิมพ์นำหน้าด้วย \`$\` แล้วตามด้วยชื่อคำสั่งได้เลย')
        .addFields(
            { name: ' - \`$purse\`', value: 'ใช้สำหรับเช็คเงินในกระเป๋าตังว่ามีเงินอยู่เท่าไหร่' },
            { name: ' - \`$account\`', value: 'ใช้สำหรับเช็คว่าในบัญชีธนาคารมีเงินฝากอยู่เท่าไหร่' },
            { name: ' - \`$deposit\`', value: 'ใช้สำหรับฝากเงินเข้าธนาคาร' },
            { name: ' - \`$withdraw\`', value: 'ใช้สำหรับถอนเงินออกจากธนาคาร' },
            { name: ' - \`$transfer\`', value: 'ใช้สำหรับโอนเงินจากบัญชีนึงไปอีกบัญชีนึง\nตัวอย่างเช่น `$transfer @pasitha 50` จะเป็นการโอนเงิน' },
        )
        .setFooter(client.user.username + " | Version " + config.version, client.user.displayAvatarURL());

    const rowhome = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('home_btn')
                .setLabel('คำสั่ง Discord')
                .setStyle('PRIMARY')
                .setEmoji('⌨️')
                .setDisabled(true),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('1')
                .setLabel('คำสั่ง Minecraft')
                .setStyle('SECONDARY')
                .setEmoji('1️⃣'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('2')
                .setLabel('คำสั่ง Economy')
                .setStyle('SECONDARY')
                .setEmoji('2️⃣'),
        );

    const row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('home_btn')
                .setLabel('คำสั่ง Discord')
                .setStyle('PRIMARY')
                .setEmoji('⌨️')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('1')
                .setLabel('คำสั่ง Minecraft')
                .setStyle('SECONDARY')
                .setEmoji('1️⃣')
                .setDisabled(true),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('2')
                .setLabel('คำสั่ง Economy')
                .setStyle('SECONDARY')
                .setEmoji('2️⃣'),
        );

    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('home_btn')
                .setLabel('คำสั่ง Discord')
                .setStyle('PRIMARY')
                .setEmoji('⌨️')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('1')
                .setLabel('คำสั่ง Minecraft')
                .setStyle('SECONDARY')
                .setEmoji('1️⃣')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('2')
                .setLabel('คำสั่ง Economy')
                .setStyle('SECONDARY')
                .setEmoji('2️⃣')
                .setDisabled(true),
        );

    msg = await message.channel.send({ embeds: [discordCommands], components: [rowhome] });
    const collector = message.channel.createMessageComponentCollector({ time: 15000 });

    let authorID = message.author.id;

    collector.on('collect', async (b) => {
        if (authorID != message.author.id) return;
        if (b.customId === 'home_btn') {
            msg.edit({ embeds: [discordCommands], components: [rowhome] });
            b.deferUpdate();
        } else if (b.customId === '1') {
            msg.edit({ embeds: [minecraftCommands], components: [row1] });
            b.deferUpdate();
        } else if (b.customId === '2') {
            msg.edit({ embeds: [economyCommands], components: [row2] });
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

module.exports.name = ['help'];
