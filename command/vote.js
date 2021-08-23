module.exports = {
    name : 'vote',
    description : 'create a poll question and vote with reaction button',
    execute(client, message, args, Discord) {
        // require argument
        // if didn't have a first argument(title of poll) then sent message back
        if(!args[1]) return message.channel.send("รบกวนช่วยบอก Titleของpollนี้หน่อยค่ะ");
        // if didn't have a second argument(description of poll) then sent message back
        else if(!args[2]) return message.channel.send("รบกวนช่วยบอก Descriptionของpollนี้ให้หน่อยค่ะ");
        // if didn't have a third argument(choice of poll) then sent message back
        else if(!args[3]) return message.channel.send("รบกวนช่วยบอก Choiceของpollนี้หน่อยค่ะ");
        // if user has inout many argument of choice then sent message back
        else if(args[13]) return message.channel.send("ต้องขอประทานอภัยด้วยนะค่ะ choiceเยอะกว่า10ผมไม่รองรับค่ะ ต้องขออภัยจริง ๆ ค่ะ");

        // Emoji list number from 1 - 10
        const defEmojiList = [
            '\u0031\u20E3', // unicode emoji number 1
            '\u0032\u20E3', // unicode emoji number 2
            '\u0033\u20E3', // unicode emoji number 3
            '\u0034\u20E3', // unicode emoji number 4
            '\u0035\u20E3', // unicode emoji number 5
            '\u0036\u20E3', // unicode emoji number 6
            '\u0037\u20E3', // unicode emoji number 7
            '\u0038\u20E3', // unicode emoji number 8
            '\u0039\u20E3', // unicode emoji number 9
            '\uD83D\uDD1F'  // unicode emoji number 10
        ];

        // Create embedded with yello color(#FFD157), set title to args[1] Description to args[2]
        let embed = new Discord.MessageEmbed().setColor("#FFD157")
            .setTitle(args[1])
            .setDescription(args[2]);

        // loop for all the emoji in "defEmojiList"
        for(let index = 3; index < args.length; index++)
            // add choice in to embed
            embed.addField("Choice", `${defEmojiList[index - 3]} ${args[index]}`, true);

        // send embed to channel which user has sended
        message.channel.send(embed).then(function (message) {
            try {
                // loop for all the emoji
                for(let i = 0; i < args.length - 3; i++){
                    // add reaction to embed 
                    message.react(defEmojiList[i]);
                }
            } catch (error) {
                // if some emoji can't react
                console.error('มีอิโมจิบางตัวไม่สามารถ reactได้');
            }
        }).catch(function() {
            //Something
        });
    }
}