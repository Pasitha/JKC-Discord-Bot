const config = require('../settings.json')
const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports.run = async (client, message, args) => {
    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
      
        let costs = new Array();
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;

                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }
    
    function similarity(s1, s2) {
        let longer = s1;
        let shorter = s2;
    
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }

        let longerLength = longer.length;
        if (longerLength == 0) {
              return 1.0;
        }
    
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }
    
    const position = require('../locations.json');
    const key = Object.keys(position);
    
    function setPositionEmbed(position) {
        return `\`x : ${position[0]}\`\n\`y : ${position[1]}\`\n\`z : ${position[2]}\``;
    }

    for (const elementKey of key) {
        if (!args[0]) {

        }

        if (similarity(args[0].toLowerCase(), elementKey) > 0.5) {

            const attachment = new MessageAttachment(`./picture/jkc-jr5/${position[elementKey].pictureName}`, position[elementKey].pictureName);
            message.channel.send({
                embeds : [new MessageEmbed().setTitle(elementKey.toString().toUpperCase())
                    .addFields(
                        {name : "Nether Link : ", value : setPositionEmbed(position[elementKey].get_position.nether)},
                        {name : "overworld : ", value : setPositionEmbed(position[elementKey].get_position.overworld)}
                    ).setColor("#FFD157")
                    .setThumbnail("https://triam.ddns.net/picture/Jukucrush_logo.png")
                    .setFooter(client.user.username + " | Version " + config.version, client.user.displayAvatarURL())
                ]
                , files: [attachment] });
        }
    }
}

module.exports.config = {
    name: "whereis",
    aliases: ['ws']
}
