const fs = require('fs');
const request = new (require('rss-parser'));
const jsonstringify = require('json-stringify-pretty-compact');

const jkc_json_file = require('../database/jkc.json');

module.exports = client => {
	setInterval(() => {
		if (jkc_json_file.member.length > 32) {
			console.log(jkc_json_file.member.length);
			return;
		}

		for (let i = 0; i < jkc_json_file.member.length; i++) {
			if (jkc_json_file.member[i].allowUpdate) {
				request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${jkc_json_file.member[i].youtube.channelId}`).then((data) => {

					if (!jkc_json_file.member[i].youtube.lastVideoUpdate.includes(data.items[0].link)) {
						let channel = client.channels.cache.get('438885368436359168');

						if (channel) {
							let persuasion = ['เฮ้ทุกคนคะ !!!', 'ทุกคนนคะหนูจะบอกว่า', 'ง่าาาาาทุกคนนนนน', 'นี้ ๆ ทุกคนตอนนี้'];
							channel.send(`${persuasion[Math.floor((Math.random() * (persuasion.length - 1)))]} ช่อง **${data.items[0].author}** มีอัพเดตแล้วไปดูกันเร็ว!!! \n${data.items[0].link}`);
						}

						for (let j = 0; j < 3; j++) {
							jkc_json_file.member[i].youtube.lastVideoUpdate[j] = data.items[j].link;
						}
					}

					fs.writeFile('./database/jkc.json', jsonstringify(jkc_json_file), (err) => {
						if (err) throw err;
					});
				}).catch(error => console.log(error));
			}
		}
	}, 60000);
}
