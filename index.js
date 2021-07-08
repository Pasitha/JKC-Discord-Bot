// import Discord, rss-parser, json-stringify-pretty-compact
const Discord = require('discord.js');
const request = new (require("rss-parser"));
const file = require("fs");
const jsonstringify = require("json-stringify-pretty-compact");

// create Discord client
const client = new Discord.Client();

let jkc_json_file = require('./jkc.json');

// check specified youtube channels every 60 second
setInterval(() => {
	// youtube update section
	
	// loop all member in jkc_json_file
	for (let i = 0; i < jkc_json_file.member.length; i++) {
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

	// misc. info 

	// define date
	var today = new Date();

	// if not 6 AM. (GMT+7) then return 
	if (today.getHours() != 0) return ;
	
	// get all member birthday
	for (let index in birthday) {
		// check if birthday is up to date
		if (birthday[index].includes((today.getMonth()+1)+'-'+today.getDate())) {
			
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

// set prefix as $
const prefix = '$';

// Bot will activate when ready
client.once('ready', () => {
	console.log(`Ready!`);

	// set Discord custom status
	client.user.setActivity("JKC JR5 SERVER",  { type: 'WATCHING' });
});

// get messge from channel that this bot has permission to
client.on('message', message=> {

	// return if message was sent from another Bot
	if (message.author.bot) return;

	// if message doesn't start with prefix then bot will discard that message
	if (message.content[0] != prefix) return;

	// split arguments with space(' ')
	let args = message.content.substring(prefix.length).split(' ');

	// switch case to check for command
	switch(args[0]){

		case 'query':
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
		break;

		// if command is $random
		case 'random':
			// if first argument is not announced then send the randomized number from 1 to 100
			if(!args[1]){
				// randomize number from 1 to 100 and send to channel from user use this command
				return message.channel.send(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`);
			} // if the first argument is announced but doesn't have a second argument then send the random number from 1 to args[1](first argument)
			else if(args[1] && !args[2]) { 
				// randomize number from 1 to args[1] and send to channel from user use this command
				return message.channel.send(`เลขที่ออกคือเลข ${Math.floor((Math.random() * parseInt(args[1]))) + 1} ค่ะ`);
			} // if the second argument announced then send the random number from args[1](first augument) to args[2](second augument)
			else if(args[2]) { 
				// randomize number from args[1] to args[2] and send to channel from user use this command
				return message.channel.send(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (parseInt(args[2]) - parseInt(args[1]) + 1)) ) + parseInt(args[1])} ค่ะ`);
			}
		break;

		// if command is $vote
		case 'vote':
		case 'poll':
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
		break;

		// if command is $vote
		case 'info':

			// function get target from mention
			function getMember(message, toFind = '') {
				toFind = toFind.toLowerCase();

				// get user data and infomation
				let target = message.guild.members.cache.get(toFind);

				// check is can find target
				if (!target && message.mentions.members)
					target = message.mentions.members.first();

				// if target didn't have some value but toFind have
				if (!target && toFind) {
					// find target from toFind
					target = message.guild.roles.cache.find(member => {
						// return infomation
						return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind)
					});
				}

				// is target didn't have some value
				if (!target)
					target = message.member;

				// return user infomations
				return target;
			}

			// get date format US 
			function formatDate(date) {
				return new Intl.DateTimeFormat('en-US').format(date)
			}

			// call function getMember to get user infomation
			const member = getMember(message, args.join(" "));

			// get first Mentioned User
			const user_mentions = message.mentions.users.first() || message.author;

			// get date when user join discord server
			const joined = formatDate(member.joinedAt);
			// get array of roles
			const roles = member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || 'none';

			// get data when user use discord for a first time
			const created = formatDate(member.user.createdAt);

			// cretae an embed and decorate it
			const info_embed = new Discord.MessageEmbed()
				.setThumbnail(user_mentions.avatarURL({ dynamic: true }))
				.setColor(member.displayHexColor === '#000000' ? '#ffffff' : message.member.displayHexColor)
				.addField('Member information:', `**> Display name:** : ${member.displayName} **> Joined at:** : ${joined} **> Roles:** : ${roles}`, true)
				.addField('User information:', `**> ID:** : ${member.user.id} **> Username:** : ${member.user.username} **> Tag:** : ${member.user.tag} **> Created at:** : ${created}`, true)
				.setTimestamp()
				.setFooter(member.displayName, user_mentions.avatarURL({ dynamic: true }));

			// if user play somegame addFileld to embed what game that user play
			if (member.user.presence.game)
				info_embed.addField('Currently playing', `**> Name:** : ${member.user.presence.game.name}`);

			// send embed to chat channal 
			message.channel.send(info_embed);
		break;

		case 'h':
		case 'help':
			let help_embed = new Discord.MessageEmbed().setColor("#FFD157")
				.setTitle("--สวัสดีค่ะ น้องจุ๊ก เอง--")
				.addField("📰สามารถติดตาม Jukucrush Team ได้ที่ Facebook", '[Facebook - Jukucrush Team](https://www.facebook.com/JukucrushTeam?ref=hl)')
				.addField("📌หรือที่ youtube", '[Youtube - Jukucrush Team](https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw)')
				.addField("👨🏻‍💻สามารถตรวจสอบคำสั่งและอัพเดตทั้งหมดได้ที่", '[Github JKC - Discord Bot](https://github.com/Pasitha/JKC-Discord-Bot)');
			// send embedded message to specify channe 
			message.channel.send(help_embed);
		break;
	}
});

// Login Bot with token : 
client.login('');
