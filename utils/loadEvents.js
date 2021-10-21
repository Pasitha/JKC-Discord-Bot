const fs = require('fs');


module.exports = async (client,{JKCSupBot,JKCJrBot}) => {
    ['discord-event', 'minecraft-event'].forEach(dir => {
        fs.readdir(`events/${dir}`, (_err, files) => {
            if (dir === 'discord-event') {
                files.forEach((file) => {
                    if (!file.endsWith('.js')) return;
                    const event = require(`../events/${dir}/${file}`);
                    let eventName = file.split('.')[0];

                    client.on(eventName, event.bind(null, client, JKCJrBot, JKCSupBot));
                    delete require.cache[require.resolve(`../events/${dir}/${file}`)];
                });
            }
            if (dir === 'minecraft-event') {
                files.forEach((file) => {
                    if (!file.endsWith('.js')) return;
                    const event = require(`../events/${dir}/${file}`);
                    let eventName = file.split('.')[0];

                    JKCJrBot.on(eventName, event.bind(null, JKCJrBot));
                    JKCSupBot.on(eventName, event.bind(null, JKCSupBot));
                    delete require.cache[require.resolve(`../events/${dir}/${file}`)];
                });
            }
        });
    });
}