<div align="center">
	<a href="https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw"><img src="https://github.com/Pasitha/JKC-Discord-Bot/blob/main/picture/jkc-logo/jkc-logo.png" width="546" alt="jkc-logo"></a><br>
	<a href="https://discord.gg/zmjUh4S"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Jukucrush's Discord Server" /></a>
	<a href="https://web.facebook.com/JukucrushTeam"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Jukucrush's Facebook fanpage" /></a>
	<a href="https://www.youtube.com/c/JukucrushTeam"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Jukucrush's Youtube" /></a>
	
</div>

# JKC-Discord-Bot
<div float="left">
	<img src="./picture/jkc-discord-bot-fa/Jukubot_FA2.png" width="273">
	<img src="./picture/jkc-discord-bot-fa/Jukubot_FA4.png" width="230">
</div>
Discord bot for <b>Jukucrush's official discord server</b>

# Project requirement
[node.js v16](https://nodejs.org/en/download/current/ "node.js")

## INSTALLATION AND SET UP
1. clone the project
	```sh-session
	git clone https://github.com/Pasitha/JKC-Discord-Bot.git
	```
2. installs modules defined in the dependencies section of the __package.json__ file 
	```sh-session
	npm install
	```
3. make sure your bot has __[Privileged Gateway Intents](https://discord.com/developers/applications "Discord Developer Portal")__
4. set your bot token and minecraft account at __setting.js__ file at the token value<br>
	<h4><b>Example</b></h4>
	
	```json
	{
	  "token": "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz1234567",
	  "prefix": "$",
	  "ownerIDS": ["111111111111111111"],
	  "version": "v.0.1.3",
	  "lastrun": "xx/xx",
	  "minecraftid": {
	    "Pasitha": {
	      "host": "192.168.1.33",
	      "username": "pasitha@example.com",
	      "password": "thisisPasithapassword",
	      "auth": "microsoft"
	    }
	  }
	}
	```
5. and then __run__ the script 
	```sh-session
	npm start
	```
	or
	```sh-session
	node .
	```
## DATABASE SET UP
1. migration
	```sh-session
	yarn start:migration
	```
2. studio
	```sh-session
	yarn start:studio
	```
3. update 
	```sh-session
	node ./prisma/json2sql.js
	```
## Discord Commands
1. __help__ need help from this jkc-bot?, type this command
	- ```$help``` jkc-bot will create embedded help infomation
2. __user information__ user information appears once the user types this command
	- ```$info @user``` user information will be embedded by jkc-bot
3. __jkc__ want to get some jukucrush infomation, type this command
	- ```$jkc``` jkc-bot will create embedded about jkc infomation
	- ```$jkc ดูไรดี``` jkc-bot will randomize a video form jkc team
4. __minecraft skin__ get your minecraft skin
	- ```$mcskin minecraft_name``` jkc-bot will send minecraft skin of player back to the channel
	- ```$mchead minecraft_name``` jkc-bot will send minecraft head of player back to the channel
5. __my account__ command for checking how much money is inside the account
	- ```$account``` jkc-bot will send your account infomation
6. __pay__ an instruction used for transferring money to other people on that server
	- ```$pay @user amount``` The bot will transfer funds from the ordering account to the mentioned users
7. __query__ commands for asking frequently asked questions(in jukucrush team)
	- ```$query``` jkc-bot will create embedded questions and clickable react message for choosing options for more explanation
8. __random number__ random one number
	- ```$random``` randomize a number from __1 to 100__
	- ```$random some_number``` randomize a number from __1 to some_number__
	- ```$random some_number another_number``` randomize a number from __some_number to another_number__
9. __poll__ create a poll question and vote with reaction button
	- ```$vote question description choice1 choice2 choice3 ... choice10``` jkc-bot will create embedded poll and clickable react message for choosing options
10. __where is__ It is a command used to find out who is at which coordinates in the JKC-Jr.5 server
	- ```$whereis locations_name``` jkc-bot will create embedded for telling the coordinates of that place

11. __position__ is a command used to check whether Where is the player located within the server?
	- ```$position minecraft_name``` jkc-bot will create embedded for telling position of player
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
	<img src="./picture/jkc-discord-bot-fa/Jukubot_FA1.png" width="150">
	<img src="./picture/jkc-discord-bot-fa/Jukubot_FA2.png" width="200">
	<img src="./picture/jkc-discord-bot-fa/Jukubot_FA3.png" width="200">
  	<img src="./picture/jkc-discord-bot-fa/Jukubot_FA4.png" width="157">
	<img src="./picture/jkc-discord-bot-fa/Jukubot_FA5.png" width="163">
	<img src="./picture/jkc-discord-bot-fa/Jukubot_FA6.png" width="163">
</div>
