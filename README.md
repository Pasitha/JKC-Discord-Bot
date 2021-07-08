<div align="center">
	<a href="https://www.youtube.com/channel/UC-lNawOSpzmBSO-IqKImcfw"><img src="https://triam.ddns.net/picture/Jukucrush_logo.png" width="546" alt="jkc-logo"></a><br>
	<a href="https://discord.gg/zmjUh4S"><img src="https://img.shields.io/discord/222078108977594368?color=5865F2&logo=discord&logoColor=white" alt="Jukucrush's Discord Server" /></a>
</div>

# JKC-Discord-Bot
<img src="https://triam.ddns.net/picture/Jukubot.png" width="273">
Discord bot for <b>Jukucrush's official discord server</b>

# Project requirement
[discord.js v12](https://discord.js.org/ "discord.js")

## INSTALLATION AND SET UP
1. clone the project
	```sh-session
	git clone https://github.com/Pasitha/JKC-Discord-Bot.git
	```
2. installs modules defined in the dependencies section of the __package.json__ file 
	```sh-session
	npm install
	```
3. put your bot token at __index.js__ file at the last line of code 
	```js
	...
	
	// Login Bot with token : 
	client.login('');
	```
4. and then run the script 
	```sh-session
	npm start
	```

## Feature (command)
1. __Youtube notification__ check feed of youtube channel that defined in [jkc.json](https://github.com/Pasitha/JKC-Discord-Bot/blob/main/index.js#L11-L35 "array youtube channels id ") whether the channel(s) have updated video, live stream, etc. or not
2. __Birth day notification__ for checking who's birthday today is. Birth day defined in [jkc.json](https://github.com/Pasitha/JKC-Discord-Bot/blob/b1918d5e10470a529fe3542f6b2c80b588c30bcf/jkc.json#L4)
3. __random number__ random one number
	- ```$random``` randomize a number from __1 to 100__
	- ```$random some_number``` randomize a number from __1 to some_number__
	- ```$random some_number another_number``` randomize a number from __some_number to another_number__
4. __poll__ create a poll question and vote with reaction button
	- ```$vote question description choice1 choice2 choice3 ... choice10``` jkc-bot will create embedded poll and clickable react message for choosing options
5. __user information__ user information appears once the user types this command
	- ```$info @user``` user information will be embedded by jkc-bot
6. __query__ commands for asking frequently asked questions(in jukucrush team)
	- ```$query``` jkc-bot will create embedded questions and clickable react message for choosing options for more explanation
7. __help__ need help from this jkc-bot?, type this command
	- ```$help``` jkc-bot will create embedded help infomation
