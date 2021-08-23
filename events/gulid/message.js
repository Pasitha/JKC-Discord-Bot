module.exports = (Discord, client, disbut, message) => {
    // set prefix as $
    const prefix = '$';

    // return if message was sent from another Bot
	// and message doesn't start with prefix then bot will discard that message
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// split arguments with space(' ')
	let args = message.content.substring(prefix.length).split(' ');

    // get command from client
    let command = client.commands.get(args[0].toLowerCase());

    if (command) command.execute(client, message, args, Discord, disbut);
}