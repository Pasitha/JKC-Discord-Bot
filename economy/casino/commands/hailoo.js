const { MessageEmbed } = require("discord.js");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const config = require('../../settings.json');

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setColor('#FFD157').setThumbnail(client.user.displayAvatarURL())
        .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL());

    const filter = (reaction, user) => {
        return (reaction.emoji.name === '⬆️' || reaction.emoji.name ==='⬇️') && user.id === message.author.id;
    };

    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let account = await prisma.user.findUnique({
        where: {
            discord_id: message.author.id
        }
    });

    if (args[0] > account.coin) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username}`).setColor('#ff0000')] });

    let msg = await message.channel.send('🎲🎲สูงหรือต่ำดีน้าาาา🎫');
    const collector = msg.createReactionCollector({ filter, time: 15000 });
    msg.react('⬆️').then(() => msg.react('⬇️')).catch(error => console.error('One of the emojis failed to react:', error))

    collector.on('collect', (reaction, user) => {
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions:', error));

        if (reaction.emoji.name === '⬆️' && dice1 + dice2 >= 6) { 
            message.channel.send({ embeds: [embed.setTitle(`🥳ยินดีด้วยคุณ ${user.username}🥳`).setDescription(` - คุณแทงสูงและผลรวมของลูกเต๋าคือ ${dice1 + dice2}`)]});
            account.coin += args[0] * 2;
            
        } else if (reaction.emoji.name === '⬇️' && dice1 + dice2 < 6) {
            message.channel.send({ embeds: [embed.setTitle(`🥳ยินดีด้วยคุณ ${user.username}🥳`).setDescription(` - คุณแทงต่ำและผลรวมของลูกเต๋าคือ ${dice1 + dice2}`)]});
            account.coin += args[0] * 2;
        } else {
            message.channel.send({ embeds: [embed.setTitle('ขอโทษด้วยนะคะคุณแทงผิด').setDescription(`ผลรวมของลูกเต๋าคือ ${dice1 + dice2} เพราะงั้นก็อดรางวัลนะคะะ`)]});            
            account.coin -= args[0] * 2;
        }

        await prisma.account.update({
            where: {
                discord_id: message.author.id
            },
            data: {
                ...account
            }
        });
    });
};

module.exports.name = ['hailoo', 'hailo'];
