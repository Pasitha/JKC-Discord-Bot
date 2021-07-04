// import Discord, rss-parser
const Discord = require('discord.js');
const request = new (require("rss-parser"));
// include database.js
const database = require("./database");

// create Discord client
const client = new Discord.Client();

// array of youtube channal id's each member JKC team
const JKC_youtube_id = [
	'UCf5WOYccfrhSVpeJLmc8DoQ', // BossNiti
	'UCawiV5orP_u3XWEg95SRDmA', // PirorohTH
	'UCvAD35ExopO_imh2hG8joVA', // truefaster
	'UCD6F39uqBBM2LfXGb6aD8sQ', // FreshZ
	'UCwAbFRVXeZ9EE2-1DVqJmew', // PAZPAT
	'UCxvOQKSiIiwqipcyEJhujTQ', // ArmCrater
	'UCTk2mxyDsqRlRn5HzAo4Zzg', // PeeMeenCH
	'UCzuq_sAxRbPcY31yvsAQk0Q', // XSOLUTION
	'UCg1PNJ6WqUM10KWrSNyzAjA', // SiaJi
	'UC1VzAZISuwQ-lwb-oHWhvmQ', // GucciGuy
	'UCfs20_RtMU90py7DYbbnjPA', // RKGz
	'UCoZGzmRcvXQt4Mv3LS_49Bg', // SiMonZWolf
	'UCzT0URjXQqYM1XaT3sHbcVA', // SherlockCs
	'UCJtNCvCTLX8Z-K4dgcOnM1w', // SoontornG
	'UC0Ihen7U7rxWcgvCC9_smXA', // First PaYa *
	'UC8oaVGY5t28NEv-gwht0wig', // PSYCHOrnz
	'UCMHGJtaJ2EFHTXB8E-_UX1Q', // kin zaza
	'UCKTLYtDr2oVIhVKb9KZbt1Q', // Hasaki Ch. | ハサキ レイ *
	'UCuKHNZ2eCMJbRzd8cZH6V8Q', // Lonely Crown
	'UCe_dyRiP9XVRxPjWNBBiQBw', // Pooh37
	'UCOA81B6mrIGq-iABJrXqd7w', // ItsSakata_
	'UCQ0efagGGhyxHGsuBix9UFQ', // TheCyple Channel
];

// get last post video link from cache.json 
const postVideo = database.cachejson.youtubelink;

// loop get all element from listjkc
for (postVideoint in JKC_youtube_id) {
	// is length of listjkc not as legnth of postVideo
	if (JKC_youtube_id.length != postVideo.lenght) {
		// then push array in to postVideo
		postVideo.push([]);
	}
}

// loop every 60 sec is any channal update something...
setInterval(() => {
	// loop all element in listjkc
	for (let indexId in JKC_youtube_id) {
		
		// request to youtube rss
		request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${JKC_youtube_id[indexId]}`).then((data) => {
			
			// get video link 
			const link = data.items[0].link;

			// check is the newest link already is postVideo???
			if (!postVideo[indexId].includes(link)) {
				// is not then pust new link in to array
				postVideo[indexId].push(link);

				// update to cache.json 
				database.cachejson.youtubelink = postVideo;
				database.setJSONCache(database.cachejson);
				database.saveDatabase();

				// alert to channel "วิดิโอใหม่"
				let channel = client.channels.cache.get("438885368436359168");

				// is channel valid
				if (channel) {
					let sentences = "";

					// random the sentences to send
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
					// send alert to channel with random message
					channel.send(`${sentences} **${data.items[0].author}** มีอัพเดตแล้วไปดูกันเร็ว!!! \n${link}`);
				}
			}
		}).catch(error => console.log(error));
	}
}, 60000); // 60000 it mean 60000 milisecond or 60 second

// prefix for all command
const prefix = '$';

// Set up Bot if ready
client.once('ready', () => {
	console.log(`Ready!`);

	// set some Activity
	client.user.setActivity("JKC JR5 SERVER",  { type: 'WATCHING' });
});

// get message
client.on('message', message=> {

	// return if message sent from Bot
	if (message.author.bot) return;

	// if message doesn't start with prefix
	if (message.content[0] != prefix) return;

	// make variable name "args"(argument) every element is split by space(' ')
	let args = message.content.substring(prefix.length).split(' ');

	// Command case
	switch(args[0]){

		case 'h':
		case 'help':
			// create help embed
			let help_embed = new Discord.MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL()).setTitle("--สวัสดีค่ะ น้องจุ๊ก เอง--")
				.addField("📰สามารถติดตาม Jukucrush Team ได้ที่ Facebook", '[Facebook - Jukucrush Team](https://www.facebook.com/JukucrushTeam?ref=hl)')
				.addField("📌หรือที่ youtube", '[Youtube - Jukucrush Team](https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw)')
				.addField("👨🏻‍💻สามารถตรวจสอบคำสั่งและอัพเดตทั้งหมดได้ที่", '[Github JKC - Discord Bot](https://github.com/Pasitha/JKC-Discord-Bot)');
			
			// send embed to chat channal 
			message.channel.send(help_embed);
		break;
			
		case 'query':
			// array of emoji
			const choice_list = [
				// "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"
				'1️⃣',
				'2️⃣'
			];

			// create embed
			let QAndA_embed = new Discord.MessageEmbed().setColor("#FFD157").setThumbnail(client.user.displayAvatarURL())
				.setTitle('👱🏻‍♀️สวัสดีค่ะมีคำถามอะไรอยากถามหนูหรอคะ').setDescription('😅คำถามที่ทุกคนมักจะถามกัน')
				.addField('1️⃣ ตอนนี้เปิดรับสมัคร Junior มั้ย ?', '⏰ตอนนี้ยังไม่รับสมัครนะคะ')
				.addField('2️⃣ คำสั่งของ JKC Discord Bot (หนูนี้เองง) มีอะไรบ้าง ?', '⏰สามารถติดตามคำสั่งของหนูได้ที่ [Github JKC - Discord Bot](https://github.com/Pasitha/JKC-Discord-Bot) นะคะ')
				.setFooter('👋สามารถกด Reaction เพื่อถามลายละเอียดเพิ่มเติมได้นะคะ');

			// send and react message
			message.channel.send(QAndA_embed);
			message.react(choice_list[0]).then(() => message.react(choice_list[1]));

			// filter emoji name
			const filter = (reaction, user) => {
				return choice_list.includes(reaction.emoji.name) && user.id === message.author.id;
			};

			// wait for message reaction 60000 milisecond
			message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
				// get the first emoji was react 
				const reaction = collected.first();

				// check which emoji is 
				if (reaction.emoji.name === '1️⃣') {
					message.reply('ตอนนี้ทางทีมของJukucrush Team ยังไม่เปิดรับสมัครนะคะ');
				} else if (reaction.emoji.name === '2️⃣') {
					message.reply('ใน Github มีคำสั่งทิ้งหมดของหนูเขียนเอาไว้ให้แล้วค่าาา อ่านในนั้นรู้ทั้ง Code และ คำสั่งเลยนะคะะ');
				} else {
					message.reply('มีคำถามนี้ด้วยหรอคะเนี่ยย');
				}
			}).catch(collected => {
				// if doesn't any reaction reply to user
				message.reply('ถ้าไม่สงสัยแล้วก็ไม่เป็นไรค่ะะ ขอบคุณสำหรับคำถามนะคะะะ 😘');
			});
		break;

		// if command is $random
		case 'random':
			// if didn't have a first argument then send the random number from 1 to 100
			if(!args[1]){ 
				// random number from 1 to 100 and send to channel from user use this command
				return message.channel.send(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`);
			} // if have a first argument but didn't have a second argument then send the random number from 1 to args[1](first argument)
			else if(args[1] && !args[2]) { 
				// random number from 1 to args[1] and send to channel from user use this command
				return message.channel.send(`เลขที่ออกคือเลข ${Math.floor((Math.random() * parseInt(args[1]))) + 1} ค่ะ`);
			} // if have a second argument then send the random number from args[1](first augument) to args[2](second augument)
			else if(args[2]) { 
				// random number from args[1] to args[2] and send to channel from user use this command
				return message.channel.send(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (parseInt(args[2]) - parseInt(args[1]) + 1)) ) + parseInt(args[1])} ค่ะ`);
			}
		break;

		// if command is $vote
		case 'vote':
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
				'\u0031\u20E3', // number 1 
				'\u0032\u20E3', // number 2
				'\u0033\u20E3', // number 3
				'\u0034\u20E3', // number 4
				'\u0035\u20E3', // number 5
				'\u0036\u20E3', // number 6
				'\u0037\u20E3', // number 7
				'\u0038\u20E3', // number 8
				'\u0039\u20E3', // number 9
				'\uD83D\uDD1F'  // number 10
			];

			// Create embed with yello color(#FFD157), set title to args[1] Description to args[2]
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
			// delete Command Message
			message.delete();

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
	}
});

// Login Bot with token
client.login('%/*Bot token*/%');
// Remove %/*Bot token*/% and insert your discord bot token here
