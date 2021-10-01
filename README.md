<div align="center">
	<a href="https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw"><img src="https://triam.ddns.net/picture/Jukucrush_logo.png" width="546" alt="jkc-logo"></a><br>
	<a href="https://discord.gg/zmjUh4S"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Jukucrush's Discord Server" /></a>
	<a href="https://web.facebook.com/JukucrushTeam"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Jukucrush's Facebook fanpage" /></a>
	<a href="https://www.youtube.com/c/JukucrushTeam"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Jukucrush's Youtube" /></a>
	
</div>

# JKC-Discord-Bot
<img src="https://triam.ddns.net/picture/Jukubot.png" width="273">
Discord bot for <b>Jukucrush's official discord server</b>

# Project requirement
[node.js v16](https://nodejs.org/en/download/current/ "node.js") <br>
[discord.js v13](https://discord.js.org/ "discord.js")

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

## Feature (command)
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
5. __query__ commands for asking frequently asked questions(in jukucrush team)
	- ```$query``` jkc-bot will create embedded questions and clickable react message for choosing options for more explanation
6. __random number__ random one number
	- ```$random``` randomize a number from __1 to 100__
	- ```$random some_number``` randomize a number from __1 to some_number__
	- ```$random some_number another_number``` randomize a number from __some_number to another_number__
7. __poll__ create a poll question and vote with reaction button
	- ```$vote question description choice1 choice2 choice3 ... choice10``` jkc-bot will create embedded poll and clickable react message for choosing options
8. __where is__ It is a command used to find out who is at which coordinates in the JKC-Jr.5 server
	- ```$whereis locations_name``` jkc-bot will create embedded for telling the coordinates of that place

## Notification Feature
1. __Youtube notification__ check feed of youtube channel that defined in [jkc.json](https://github.com/Pasitha/JKC-Discord-Bot/blob/main/index.js#L11-L35 "array youtube channels id ") whether the channel(s) have updated video, live stream, etc. or not
2. __Birth day notification__ for checking who's birthday today is. Birth day defined in [jkc.json](https://github.com/Pasitha/JKC-Discord-Bot/blob/b1918d5e10470a529fe3542f6b2c80b588c30bcf/jkc.json#L4)
