const config = require('../settings.json')
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    let helpEmbed = new MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL()).setURL('https://github.com/Pasitha/JKC-Discord-Bot')
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
    
    message.channel.send({embeds: [helpEmbed]});
}

module.exports.config = {
    name: "help",
    aliases: ['h', 'จุ๊กกก']
}
