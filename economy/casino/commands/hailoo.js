const { MessageEmbed } = require("discord.js");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const config = require('../../../settings.json');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ คุณอยากลงเดิมพันเท่าไหร่คะ`).setColor('#ff0000')] });
    let result = /([0-9]+)/.exec(args[0]);
    if (result[0] == result.input) {
        console.log(result);
    }
    if (!/([0-9]+)/.test(args[0]) || parseInt(args[0]) < 0) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ คุณกำลังพยายามทำอะไรหรอคะ😓`).setColor('#ff0000')] });
    // if (!(args[0]).isInteger()) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ หนูไม่รับเศษเงินนะคะ ขอเงินแบบเต็มเม็ดเต็มหน่วยหน่อยนะคะ`).setColor('#ff0000')] });
    
    const filter = (reaction, user) => {
        return (reaction.emoji.name === '⬆️' || reaction.emoji.name ==='⬇️') && user.id === message.author.id;
    };
    
    let account = await prisma.user.findUnique({
        where: {
            discord_id: message.author.id
        }
    });
    if (!account) {
        account = await prisma.user.create({
            data: {
                discord_id: message.author.id,
                discord_name: message.author.username
            }
        });
    }

    if (args[0] > account.coins) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ คุณมีเงินไม่พอนะคะ`).setColor('#ff0000')] });
    
    let embed = new MessageEmbed().setColor('#FFD157').setThumbnail(client.user.displayAvatarURL())
        .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL());

    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let dice3 = Math.floor(Math.random() * 6) + 1;
    let summation_dice = dice1 + dice2 + dice3;

    let msg = await message.channel.send('🎲🎲🎲สูงหรือต่ำดีน้าาาา🎫');
    const collector = msg.createReactionCollector({ filter, time: 15000 });
    msg.react('⬆️').then(() => msg.react('⬇️')).catch(error => console.error('One of the emojis failed to react:', error))

    collector.on('collect', async (reaction, user) => {
        account.coins -= parseInt(args[0]);
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions:', error));

        if (reaction.emoji.name === '⬆️' && summation_dice >= 11) { 
            account.coins += parseInt(args[0]) * 2;
            message.channel.send({ embeds: [
                embed.setTitle(`🥳ยินดีด้วยคุณ ${user.username}🥳`).setDescription(`คุณแทงสูงและผลรวมของลูกเต๋าคือ ${summation_dice}🎲\nลูกที่ 1: ${dice1}\nลูกที่ 2: ${dice2}\nลูกที่ 3: ${dice3}`)
                    .addField('นี้ค่ะเงินรางวัล', ` - เป็นจำนวนเงิน ${parseInt(args[0]) * 2} นะคะ`, true)
            ]});
        } else if (reaction.emoji.name === '⬇️' && summation_dice < 11) {
            account.coins += parseInt(args[0]) * 2;
            message.channel.send({ embeds: [
                embed.setTitle(`🥳ยินดีด้วยคุณ ${user.username}🥳`).setDescription(`คุณแทงต่ำและผลรวมของลูกเต๋าคือ ${summation_dice}🎲\nลูกที่ 1: ${dice1}\nลูกที่ 2: ${dice2}\nลูกที่ 3: ${dice3}`)    
                    .addField('นี้ค่ะเงินรางวัล', ` - เป็นจำนวนเงิน ${parseInt(args[0]) * 2} นะคะ`, true)
            ]});
        } else {
            message.channel.send({ embeds: [
                embed.setTitle('😩ขอโทษด้วยนะคะคุณแทงผิด😩').setDescription(`ผลรวมของลูกเต๋าคือ ${summation_dice} เพราะงั้นก็อดรางวัลนะคะะ😘`)
                    .addField('ถ้างั้นหนูก็คงต้องริบเงินเอาไว้นะคะ', ` - เป็นจำนวนเงิน ${parseInt(args[0])} นะคะ`, true)
            ]});            
        }

        await prisma.user.update({
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
