module.exports.run = (bot, args) => {
    client.guilds.cache.get('423007343127822338').channels.cache.get('423047710413946880').send(`<${username}> ${args.map((sentence) => {
        return sentence;
    }).join(' ')}`);
}

module.exports.name = ['sendjkc'];