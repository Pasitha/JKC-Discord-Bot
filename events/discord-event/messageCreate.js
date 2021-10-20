const config = require('../../settings.json');

module.exports = async (client, JKCJrBot, JKCSupBot, message) => {
	const prefix = config.prefix;

	if (message.author.bot || !message.content.startsWith(prefix) || message.channel.type === 'dm') return;
	if (message.content != '') {
		if (!message.content.match(/\bhttps?:\/\/\S+/gi).some(urls => [
			'www.youtube.com', 'www.facebook.com', 'www.cdn.discord.app', 'github.com', 'www.google.com'
		].includes(new URL(urls).hostname))) return message.delete();
	}
	if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) return message.channel.send(`Prefix : \`${prefix}\``);

	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	const commandfile = client.commands.get(cmd.slice(prefix.length).toString().toLowerCase()) || client.commands.get(client.aliases.get(cmd.slice(prefix.length).toString().toLowerCase()));
	if (commandfile)
		commandfile.run(client, JKCJrBot, JKCSupBot, message, args);
}
