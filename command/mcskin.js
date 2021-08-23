module.exports = {
    name : 'mcskin',
    description : 'get minecraft player slin',
    execute(client, message, args) {
        if(!args[1]) return message.channel.send("อยากได้หัวใครช่วยบอกหนูหน่อยนะคะะ");

        require('request')(`https://api.mojang.com/users/profiles/minecraft/${args[1]}`, {json:true}, (error, response, body) => {
            try {
                const identifier = response.body.id;

                message.channel.send(`นี่ค่ะskinของคุณ **${args[1]}**`, {
                    files: [
                        `https://mc-heads.net/player/${identifier}.png`,
                        `https://mc-heads.net/skin/${identifier}.png`,
                    ]
                });
            } catch(err) {
                message.channel.send(`เอ๋ หนูไม่เจอคนชื่อนี้เลยนะคะ ลองตรวจสอบชื่อ ${args[1]} อีกทีนะคะ`);
            }
        });
    }
}