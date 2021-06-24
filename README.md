![Jukucrush logo](https://triam.ddns.net/picture/Jukucrush_logo.png "Jukucrush logo")

# JKC-Discord-Bot
Discord bot for Jukucrush's official discord server

# SET UP
1. installs modules defined in the dependencies section of the __package.json__ file ```npm install``` or ```npm i```
2. Put your bot token at __index.js__ file at the last line of code [here](https://github.com/Pasitha/JKC-Discord-Bot/blob/727a8129cfac0a9b74e1ef95eec2524c805d5dc7/index.js#L244 "index.js")
3. and then run the script ```npm start```

# Feature (command)
1. __Youtube notification__ check feed of youtube channel that defined in [index.js](https://github.com/Pasitha/JKC-Discord-Bot/blob/main/index.js#L11-L35 "array youtube channels id ") whether the channel(s) have updated video, live stream, etc. or not
2. __random number__ random one number
- ```$random``` randomize a number from __1 to 100__
- ```$random some_number``` randomize a number from __1 to some_number__
- ```$random some_number another_number``` randomize a number from __some_number to another_number__
3. __poll__ create a poll question and vote with reaction button
- ```$vote question description choice1 choice2 choice3 ... choice10``` jkc-bot will create embedded poll and clickable react message for choosing options
4. __user information__ user information appears once the user types this command
- ```$info @user``` user information will be embedded by jkc-bot
