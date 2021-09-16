const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const jsonstringify = require("json-stringify-pretty-compact");
const config = require('../settings.json');

let jkc_json_file = require('../jkc.json');

module.exports = client => {
    const todayStr = new Date().toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', timeZone: 'Asia/Bangkok' }).slice(0,5);

    if (config.lastrun !== todayStr) {
        config.lastrun = todayStr;
        fs.writeFile('settings.json', jsonstringify(config), (err) => {
            if (err) throw err;
        });
        
        for (let i = 0; i < jkc_json_file.member.length; i++) {
            if (jkc_json_file.member[i].birthDay.slice(0, 5) === todayStr) {
                const HBDEmbed = new MessageEmbed()
                    .setThumbnail(client.user.displayAvatarURL()).setColor("#FFD157")
                    .setTitle(`🎂🎂🎂 สุขสันต์วันเกิดนะคะ 🥂 ${require('../jkc.json').member[0].youtube.channelName} 🎂🎂🎂`)
                    .setFooter(client.user.username + " | Version " + config.version, client.user.displayAvatarURL());
            
                return client.channels.cache.get("552889042878857227").send({ embeds : [HBDEmbed] });
            }
        }
    }
}
