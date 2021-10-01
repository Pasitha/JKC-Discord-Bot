const fs = require('fs');
const mineflayer = require('mineflayer');

const config = require('../settings.json');

module.exports = async client => {
    const JKCJrBot = mineflayer.createBot( config.minecraftid.JukkyjungJR )
    JKCJrBot.once('spawn', () => {
        console.log('JKC Jr Bot spawn');
        // setInterval(() => {
        //     const entity = JKCJrBot.nearestEntity()
        //     if (entity !== null) {
        //         if (entity.type === 'player') {
        //             JKCJrBot.lookAt(entity.position.offset(0, 1.6, 0))
        //         } else if (entity.type === 'mob') {
        //             JKCJrBot.lookAt(entity.position)
        //         }
        //     }
        // }, 50);
    });
    await new Promise(resolve => setTimeout(resolve, 500));

    const JKCSupBot = mineflayer.createBot( config.minecraftid.JukkyjungSUP );
    JKCSupBot.once('spawn', () => {
        console.log('JKC Sup Bot spawn');
        // setInterval(() => {
        //     const entity = JKCSupBot.nearestEntity()
        //     if (entity !== null) {
        //         if (entity.type === 'player') {
        //             JKCSupBot.lookAt(entity.position.offset(0, 1.6, 0))
        //         } else if (entity.type === 'mob') {
        //             JKCSupBot.lookAt(entity.position)
        //         }
        //     }
        // }, 50);
    });
    await new Promise(resolve => setTimeout(resolve, 500));

    ['discord-event', 'minecraft-event'].forEach(dir => {
        fs.readdir(`events/${dir}`, (_err, files) => {
            if (dir === 'discord-event') {
                files.forEach((file) => {
                    if (!file.endsWith('.js')) return;
                    const event = require(`../events/${dir}/${file}`);
                    let eventName = file.split('.')[0];
        
                    client.on(eventName, event.bind(null, client, JKCJrBot, JKCSupBot ));
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