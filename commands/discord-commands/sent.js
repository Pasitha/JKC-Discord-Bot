module.exports.run = (client, JKCJrBot, JKCSupBot, message, args) => {

    if (message.channel.id === '879020817659363398') {
        string = "";

        for (let i in args)
            string += args[i] + ' ';
        client.guilds.cache.get('423007343127822338').channels.cache.get('552889042878857227').send(string);
    }
}

module.exports.config = {
    name: 'send',
    aliases: ['s', 'sen']
}
