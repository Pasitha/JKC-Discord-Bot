module.exports = {
    name : 'info',
    description : 'user information appears once the user types this command',
    execute(client, message, args, Discord) {
        // function get target from mention
        function getMember(message, toFind = '') {
            toFind = toFind.toLowerCase();

            // get user data and infomation
            let target = message.guild.members.cache.get(toFind);

            // check is can find target
            if (!target && message.mentions.members)
                target = message.mentions.members.first();

            // if target didn't have some value but toFind have
            if (!target && toFind) {
                // find target from toFind
                target = message.guild.roles.cache.find(member => {
                    // return infomation
                    return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind)
                });
            }

            // is target didn't have some value
            if (!target)
                target = message.member;

            // return user infomations
            return target;
        }

        // get date format US 
        function formatDate(date) {
            return new Intl.DateTimeFormat('en-US').format(date)
        }

        // call function getMember to get user infomation
        const member = getMember(message, args.join(" "));

        // get first Mentioned User
        const user_mentions = message.mentions.users.first() || message.author;

        // get date when user join discord server
        const joined = formatDate(member.joinedAt);
        // get array of roles
        const roles = member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || 'none';

        // get data when user use discord for a first time
        const created = formatDate(member.user.createdAt);

        // cretae an embed and decorate it
        const info_embed = new Discord.MessageEmbed()
            .setTitle('Member information')
            .setThumbnail(user_mentions.avatarURL({ dynamic: true }))
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : message.member.displayHexColor)
            .addFields(
                { name: 'Name:', value: `${member.displayName}`, inline: true },
                { name: 'Joined at: ', value: `${joined}`, inline: true },
                { name: 'User id: ', value: `${member.user.id}`, inline: true},
                { name: 'Roles: ', value: ` ${roles}`},
                { name: 'Username: ', value: `${member.user.username}`, inline: true },
                { name: 'Tag: ', value: `${member.user.tag}`, inline: true },
                { name: 'Created at: ', value: `${created}`, inline: true }
            )
            .setTimestamp()
            .setFooter(member.displayName, user_mentions.avatarURL({ dynamic: true }));

        // if user play somegame addFileld to embed what game that user play
        if (member.user.presence.game)
            info_embed.addField('Currently playing', `**> Name:** : ${member.user.presence.game.name}`);

        // send embed to chat channal 
        message.channel.send(info_embed);
    }
}