const fs = require('fs');

module.exports = client => {
    ['discord-commands', 'minecraft-commands'].forEach(dir => {
        fs.readdir(`commands/${dir}`, (err, files) => {
    
            if (err) console.log(err);
        
            const jsfile = files.filter(f => f.split('.').pop() === 'js');
            if (jsfile.length <= 0) {
                return console.log(`Bot Couldn\'t Find Commands in folder ${dir}`);
            }
            jsfile.forEach((f, i) => {
                const pull = require(`../commands/${dir}/${f}`);
                
                client.commands.set(pull.config.name, pull);
                pull.config.aliases.forEach(alias => {
                    client.aliases.set(alias, pull.config.name);
                });
            });
        });
    });
}
