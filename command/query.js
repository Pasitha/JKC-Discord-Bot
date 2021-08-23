module.exports = {
    name : 'query',
    description : '',
    execute(client, message, args, Discord) {
        // array of emojis as choice
        const choice_list = [
            '1️⃣', '2️⃣'
        ];

        // create embedded message
        let QAndA_embed = new Discord.MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL())
            .setTitle('👱🏻‍♀️สวัสดีค่ะมีคำถามอะไรอยากถามหนูหรอคะ').setDescription('😅คำถามที่ทุกคนมักจะถามกัน')
            .addField('1️⃣ ตอนนี้เปิดรับสมัคร Junior มั้ย ?', '⏰ตอนนี้ยังไม่รับสมัครนะคะ')
            .addField('2️⃣ คำสั่งของ JKC Discord Bot (หนูนี้เองง) มีอะไรบ้าง ?', '⏰สามารถติดตามคำสั่งของหนูได้ที่ [Github JKC - Discord Bot](https://github.com/Pasitha/JKC-Discord-Bot) นะคะ')
            .setFooter('👋สามารถกด Reaction เพื่อถามลายละเอียดเพิ่มเติมได้นะคะ');

        // send embedded message with reaction emoji as choice  
        message.channel.send(QAndA_embed);
        // react message
        message.react(choice_list[0]).then(() => message.react(choice_list[1]));

        // i legit don't understand this and don't intend to (Lmao, jk)
        // check if selected emoji from choice_list and check if the user who answered is the same user who activated function query
        const filter = (reaction, user) => {
            return choice_list.includes(reaction.emoji.name) && user.id === message.author.id;
        };

        // wait for reaction for 60000 milisecond
        message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
            // get the first emoji was react
            const reaction = collected.first();

            // check which emoji is which
            if (reaction.emoji.name === '1️⃣') {
                message.reply('ตอนนี้ทางทีมของJukucrush Team ยังไม่เปิดรับสมัครนะคะ');
            } else if (reaction.emoji.name === '2️⃣') {
                message.reply('ใน Github มีคำสั่งทิ้งหมดของหนูเขียนเอาไว้ให้แล้วค่าาา อ่านในนั้นรู้ทั้ง Code และ คำสั่งเลยนะคะะ');
            } else {
                message.reply('มีคำถามนี้ด้วยหรอคะเนี่ยย');
            }
        }).catch(collected => {
            // if doesn't get any reaction then reply with
            message.reply('ถ้าไม่สงสัยแล้วก็ไม่เป็นไรค่ะะ ขอบคุณสำหรับคำถามนะคะะะ 😘');
        });
    }
}