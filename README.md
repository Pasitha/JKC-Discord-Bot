<div align="center">
	<a href="https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw"><img src="https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-logo/jkc-logo.png" width="546" alt="jkc-logo"></a><br>
	<a href="https://discord.gg/zmjUh4S"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Jukucrush's Discord Server" /></a>
	<a href="https://web.facebook.com/JukucrushTeam"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Jukucrush's Facebook fanpage" /></a>
	<a href="https://www.youtube.com/c/JukucrushTeam"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Jukucrush's Youtube" /></a>
	
</div>

# JKC-Discord-Bot
<div float="left">
	<img src="https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-discord-bot-fa/Jukubot_FA2.png" width="273">
	<img src="https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-discord-bot-fa/Jukubot_FA4.png" width="230">
</div>
Discord bot for <b>Jukucrush's official discord server</b>

# Project Requirements
[node.js v.16](https://nodejs.org/en/download/current/ "node.js")
discord.js v.13 (will be installed automatically after following step 2 in the "Installation and Setup" part)

## Installation and Setup
1. Clone the project 
	```sh-session
	git clone https://github.com/Pasitha/JKC-Discord-Bot.git
	```
2. Install required dependencies defined by me, Pasitha, in the __package.json__ file 
	```sh-session
	npm install
	```
3. Make sure your bot has __[Privileged Gateway Intents](https://discord.com/developers/applications "Discord Developer Portal")__
4. Set your bot token (required) and minecraft account (optional if you want the commands in the minecraft-commands section to be usable) in the __settings.json__ file (Note : Do not use the commands in the minecraft-commands section if you didn't put in your minecraft account information.)<br>
	<h4><b>Example</b></h4>
	
	```json
	{
  		"token": "TokenGoesHere",
 	 	"prefix": "$",
 		"ownerIDS": ["OwnerDiscordID", "Owner2DiscordID"],
 		"version": "v.0.1.4",
  		"lastrun": "xx/xx",
 		"minecraftid": {
   			"Pasitha": {
      			"host": "192.168.1.33",
      			"username": "pasitha@example.com",
      			"password": "thisisPasithapassword",
      			"auth": "microsoft",
      			"version": false,
      			"plugins": {},
      			"hideErrors": true,
      			"logErrors": true,
      			"loadInternalPlugins": true,
      			"client": null,
      			"brand": "vanilla",
      			"majorVersion": "1.17",
      			"protocolVersion": 756,
      			"port": 25565,
     			"closeTimeout": 120000,
      			"noPongTimeout": 5000
    			}
 		}
	}
	```
5. Then, __run__ the script you can use either
	```sh-session
	npm start
	```
	or
	```sh-session
	node .
	```
## Database Setup
1. __Migration__
 	- ```yarn start:migration```
2. __Studio__
	- ```yarn start:studio```
3. __Update__
	- ```node ./prisma/json2sql.js``` 

## Discord Commands
1. __Help__
	- ```$help``` , the bot will send an embed showing all the commands this bot has.
2. __User Information__
	- ```$info @user```, the bot will send an embed with the mentioned user's information.
	- ```$info```, the bot will send an embed with the user's information.
3. __Jukucrush__
	- ```$jkc```, the bot will send an embed with clickable buttons to Jukucrush Team's Official YouTube Channel, Facebook Page, and also this
very GitHub repository. 
	- ```$jkc ดูไรดี```, the bot will send an embed with a link to a random video, made by Jukucrush Team's members.
4. __Minecraft Skin, Minecraft Head__
	- ```$mcskin minecraftName```, the bot will send the player's minecraft skin back into the channel where the command is used. (Example : 
```$mcskin Pasitha```, the bot will send Pasitha's current minecraft skin.)
	- ```$mchead minecraftName```,  the bot will send the player's minecraft head back into the channel where the command is used. (Example : 
```$mchead Pasitha```, the bot will send Pasitha's current minecraft head.)
5. __My Account__ (Per-Server Data)
	- ```$account```, the bot will send an embed showing how much money you have in your account right now. (Base Amount : 100)
6. __Pay__ (Per-Server Data)
	- ```$pay @user amount```, the bot will transfer the money defined from the user who used the command to the user mentioned in the 
command.
7. __Query (FAQ)__
	- ```$query```, the bot will send an embed, with clickable buttons, showing Jukucrush's FAQs.
8. __Random Number__
	- ```$random```, the bot will randomize a number from __1 to 100__
	- ```$random definedNumber```, the bot will randomize a number from __1__ to __definedNumber__
	- ```$random number1 number2```, the bot will randomize a number from __number1__ to __number2__
9. __Poll__
	- ```$vote question description choice1 choice2 choice3 ... choice10```, the bot will send an embed with clickable reactions to choose 
between options.
10. __Where Is?__ (Made especially for Jukucrush Junior SS.5's members) 
	- ```$whereis locationName```, the bot will send an embed telling the coordinates of that place, both Overworld coordinates and Nether 
coordinates.
	- ```$whereis```, the bot will send an embed showing all the valid location names.

11. __Position__
	- ```$position minecraftName``` jkc-bot will create embedded for telling position of player
12. __onlineplayer__ It is a command used for checking all players in the server
	- ```$onlineplayer``` jkc-bot will create embedded for telling all player in server
13. __send to JKC Jr__ Used for sending messages from Discord to JKC Jr.5 server to talk to people in the server
	- ```$sendjr message``` jkc-bot will send messages from discord to the JKC Jr.5 server


## Minecraft Commands
1. __calculate__ used for some mathematical calculations
2. __position__ used to find the position of other players within the server
3. __random__ random one number
	- ```$random``` randomize a number from __1 to 100__
	- ```$random some_number``` randomize a number from __1 to some_number__
	- ```$random some_number another_number``` randomize a number from __some_number to another_number__
4. __send to jkc__ used for sending messages back to the discord. to reply from someone who sent a message from the discord

## Notification Feature
1. __Youtube notification__ check feed of youtube channel that defined in [jkc.json](https://github.com/Pasitha/JKC-Discord-Bot/blob/main/index.js#L11-L35 "array youtube channels id ") whether the channel(s) have updated video, live stream, etc. or not
2. __Birth day notification__ for checking who's birthday today is. Birth day defined in [jkc.json](https://github.com/Pasitha/JKC-Discord-Bot/blob/b1918d5e10470a529fe3542f6b2c80b588c30bcf/jkc.json#L4)

### Jukkyjung Fan Arts
<div float="left">
	<img src="https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-discord-bot-fa/Jukubot_FA1.png" width="150">
	<img src="https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-discord-bot-fa/Jukubot_FA2.png" width="200">
	<img src="https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-discord-bot-fa/Jukubot_FA3.png" width="200">
  	<img src="https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-discord-bot-fa/Jukubot_FA4.png" width="157">
	<img src="https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-discord-bot-fa/Jukubot_FA5.png" width="163">
	<img src="https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-discord-bot-fa/Jukubot_FA6.png" width="163">
</div>
