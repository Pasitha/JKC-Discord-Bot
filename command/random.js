module.exports = {
    name : 'random',
    description : 'randomize number command',
    execute(client, message, args) {
        // if first argument is not announced then send the randomized number from 1 to 100
        // randomize number from 1 to 100 and send to channel from user use this command
        if (!args[1])
            return message.channel.send(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`);

        // if the first argument is announced but doesn't have a second argument then send the random number from 1 to args[1](first argument)
        // randomize number from 1 to args[1] and send to channel from user use this command
        else if (args[1] && !args[2])
            return message.channel.send(`เลขที่ออกคือเลข ${Math.floor((Math.random() * parseInt(args[1]))) + 1} ค่ะ`);

        // if the second argument announced then send the random number from args[1](first augument) to args[2](second augument)
        // randomize number from args[1] to args[2] and send to channel from user use this command
        else if (args[2]) 
            return message.channel.send(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (parseInt(args[2]) - parseInt(args[1]) + 1)) ) + parseInt(args[1])} ค่ะ`);
    }
}