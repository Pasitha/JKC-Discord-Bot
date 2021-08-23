// import some libs.
const Discord = require('discord.js');
const client = new Discord.Client();
const disbut = require('discord.js-buttons')(client);

const request = new (require("rss-parser"));

const file = require("fs");
const jsonstringify = require("json-stringify-pretty-compact");

let jkc_json_file = require('./jkc.json');

// check specified youtube channels every 60 second
setInterval(() => {
	// youtube update section
	if (jkc_json_file.member.length > 32) {
		console.log(jkc_json_file.member.length);
		return ;
	}

	// loop all member in jkc_json_file
	for (let i = 0; i < jkc_json_file.member.length; i++) {
		// check allow update
		if(jkc_json_file.member[i].allowUpdate) {
			// request to youtube feed rss 
		request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${jkc_json_file.member[i].youtube.channelId}`).then((data) => {

			// check new video for repeated video array pull by cross checking with cached file(jkc.json)
			if (!jkc_json_file.member[i].youtube.lastVideoUpdate.includes(data.items[0].link)) {

				// specify channel to notify
				let channel = client.channels.cache.get("438885368436359168");

				// check for channel
				if (channel) {
					let sentences = "";

					// randomize the sentences to send
					switch(Math.floor((Math.random() * 3)) + 1) {
						case 1:
							sentences = "เฮ้ทุกคนคะ !!! ช่อง";
						break;
						case 2:
							sentences = "ทุกคนนคะหนูจะบอกว่า ช่อง";
						break;
						case 3:
							sentences = "ง่าาาาาทุกคนนนนน ช่อง";
						break;
					}
					// notify channel named "วิดิโอใหม่"
					channel.send(`${sentences} **${data.items[0].author}** มีอัพเดตแล้วไปดูกันเร็ว!!! \n${data.items[0].link}`);
				}

				// store 3 most recent videos from ... channel to cached file(jkc.json)
				for (let j = 0; j < 3; j++) {
					// set 3 most recent videos to array
					jkc_json_file.member[i].youtube.lastVideoUpdate[j] = data.items[j].link;
				}
			}

			// update cache file(jkc.json) 
			file.writeFile('./jkc.json', jsonstringify(jkc_json_file), (err) => {
					if (err) throw err;
				});
			}).catch(error => console.log(error));
		}
	}

	// misc. info 

	// define date
	var today = new Date();

	// if not 6 AM. (GMT+7) then return 
	if (today.getHours() != 0) return ;
	
	// get all member birthday
	for (let i = 0; i < jkc_json_file.member.length; i++) {
		// check if birthday is up to date
		if (jkc_json_file.member[i].birthDay.includes((today.getMonth()+1)+'-'+today.getDate())) {
			
			// specify channel to notify
			let channel = client.channels.cache.get("552889042878857227");

			// check for channel
			if (channel) {
				// notify channel named "ห้องแชทหลัก"
				channel.send(`ทุกคนคะ วันนี้เป็นวันเกิดของ **${index}** แหละ มาร่วมฉลองให้กับวันคล้ายวันเกิดกันหน่อยเร็ว`);
			}
		}
	}
}, 60000); // 60000 means 60000 milisecond or 60 second

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
	require(`./handlers/${handler}`)(client, Discord, disbut);
})

// Login Bot with token : 
client.login('');
