const fs = require('fs');

module.exports = (client, Discord) => {
    const command_flies = fs.readdirSync('./command/').filter(file => file.endsWith('.js'));

    for (const file of command_flies) {
        const command = require(`../command/${file}`);

        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}