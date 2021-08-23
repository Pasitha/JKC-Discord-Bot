module.exports = {
    name : 'jkc',
    description : 'need help from this jkc-bot?, type this command',
    execute(client, message, args, Discord, disbut) {

        let jkc_facebook_button = new disbut.MessageButton().setStyle('url').setLabel("Fackbook").setURL('https://www.facebook.com/JukucrushTeam?ref=hl');
        let jkc_youtube_button = new disbut.MessageButton().setStyle('url').setLabel("Youtube").setURL('https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw');
        let jkc_github_button = new disbut.MessageButton().setStyle('url').setLabel("Github").setURL('https://github.com/Pasitha/JKC-Discord-Bot');

        let help_embed = new Discord.MessageEmbed().setThumbnail(client.user.displayAvatarURL()).setColor("#FFD157")
            .setTitle("--สวัสดีค่ะ น้องจุ๊ก เอง--").setURL('https://github.com/Pasitha/JKC-Discord-Bot')
            .addField("📰สามารถติดตาม Jukucrush Team ได้ที่ Facebook", '[Facebook - Jukucrush Team](https://www.facebook.com/JukucrushTeam?ref=hl)')
            .addField("📌หรือที่ youtube", '[Youtube - Jukucrush Team](https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw)')
            .addField("👨🏻‍💻สามารถตรวจสอบคำสั่งและอัพเดตทั้งหมดได้ที่", '[Github JKC - Discord Bot](https://github.com/Pasitha/JKC-Discord-Bot)')
            .setFooter("Jukucrush Discord's Bot", client.user.displayAvatarURL());
        
        // send embedded message to specify channel
        message.channel.send("ข้อมูล JKC", {
            buttons: [jkc_facebook_button, jkc_youtube_button, jkc_github_button],
            embed: help_embed
        });
    }
}