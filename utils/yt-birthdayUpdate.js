const jkc_json_file = require('../jkc.json');
const fs = require('fs');
const request = new (require("rss-parser"));
const jsonstringify = require("json-stringify-pretty-compact");

module.exports = client => {
	setInterval(() => {
		if (jkc_json_file.member.length > 32) {
			console.log(jkc_json_file.member.length);
			return ;
		}
	
		for (let i = 0; i < jkc_json_file.member.length; i++) {
			if(jkc_json_file.member[i].allowUpdate) {
				request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${jkc_json_file.member[i].youtube.channelId}`).then((data) => {
	
					if (!jkc_json_file.member[i].youtube.lastVideoUpdate.includes(data.items[0].link)) {
						let channel = client.channels.cache.get("438885368436359168");
	
						if (channel) {
							let persuasion = ["เฮ้ทุกคนคะ !!! ช่อง", "ทุกคนนคะหนูจะบอกว่า ช่อง", "ง่าาาาาทุกคนนนนน ช่อง"];
							channel.send(`${persuasion[Math.floor((Math.random() * 3)) + 1]} **${data.items[0].author}** มีอัพเดตแล้วไปดูกันเร็ว!!! \n${data.items[0].link}`);
						}
	
						for (let j = 0; j < 3; j++) {
							jkc_json_file.member[i].youtube.lastVideoUpdate[j] = data.items[j].link;
						}
					}
	
					fs.writeFile('jkc.json', jsonstringify(jkc_json_file), (err) => {
						if (err) throw err;
					});
				}).catch(error => console.log(error));
			}
		}
	
		var today = new Date();
	
		if (today.getHours() != 0) return ;
		
		for (let i = 0; i < jkc_json_file.member.length; i++) {
			if (jkc_json_file.member[i].birthDay.includes((today.getMonth()+1)+'-'+today.getDate())) {
				
				let channel = client.channels.cache.get("552889042878857227");
	
				if (channel) {
					channel.send(`ทุกคนคะ วันนี้เป็นวันเกิดของ **${index}** แหละ มาร่วมฉลองให้กับวันคล้ายวันเกิดกันหน่อยเร็ว`);
				}
			}
		}
	}, 60000);
}
