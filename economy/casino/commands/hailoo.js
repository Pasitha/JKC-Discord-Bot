const { MessageEmbed } = require("discord.js");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const { version } = require('../../../settings.json');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ คุณอยากลงเดิมพันเท่าไหร่คะ`).setColor('#ff0000')] });
    if (!/^([0-9]+)$/.test(args[0])) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ ที่ใส่มามันไม่ใช่ตัวเลขนะคะ รบกวนใส่ใหม่อีกทีนะคะ`).setColor('#ff0000')] });
    
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
    
    let amount = parseInt(args[0]);

    if (amount === 0) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🥱เอ่ออ คุณ${message.author.username} คะ เล่น 0 JKC Coins หมมายความว่ายังไงคะ`).setColor('#ff0000')] });
    if (amount > 1000) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`😔เอ่ออ คุณ${message.author.username} คะ พอดีว่าเราให้ลงเดิมันได้ไม่เกิน 1000 JKC Coins เท่านั้นนะคะ`).setColor('#ff0000')] });
    if (amount > account.coins) return message.channel.send({ embeds: [new MessageEmbed().setAuthor(`🤨เอ่ออ คุณ${message.author.username} คะ คุณมีเงินไม่พอนะคะ`).setColor('#ff0000')] });
    
    let embed = new MessageEmbed().setColor('#FFD157').setThumbnail(client.user.displayAvatarURL())
        .setFooter(client.user.username + ' | Version ' + version, client.user.displayAvatarURL());

    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let dice3 = Math.floor(Math.random() * 6) + 1;
    let summation_dice = dice1 + dice2 + dice3;

    const filter = (reaction, user) => {
        return (reaction.emoji.name === '⬆️' || reaction.emoji.name ==='⬇️') && user.id === message.author.id;
    };

    let msg = await message.channel.send('🎲🎲🎲สูงหรือต่ำดีน้าาาา🎫');
    const collector = msg.createReactionCollector({ filter, time: 15000 });
    msg.react('⬆️').then(() => msg.react('⬇️')).catch(error => console.error('One of the emojis failed to react:', error))

    collector.on('collect', async (reaction, user) => {
        account.coins -= amount;
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions:', error));

        if (reaction.emoji.name === '⬆️' && summation_dice >= 11) { 
            let reward = Math.floor(amount * 1.9);

            account.coins += reward;
            message.channel.send({ embeds: [
                embed.setTitle(`🥳ยินดีด้วยคุณ ${user.username}🥳`).setDescription(`คุณแทงสูงและผลรวมของลูกเต๋าคือ ${summation_dice}🎲\nลูกที่ 1: ${dice1}\nลูกที่ 2: ${dice2}\nลูกที่ 3: ${dice3}`)
                    .addField('นี้ค่ะเงินรางวัล', ` - เป็นจำนวนเงิน ${reward} นะคะ`, true)
            ]});
        } else if (reaction.emoji.name === '⬇️' && summation_dice < 11) {
            let reward = Math.floor(amount * 1.9);

            account.coins += reward;
            message.channel.send({ embeds: [
                embed.setTitle(`🥳ยินดีด้วยคุณ ${user.username}🥳`).setDescription(`คุณแทงต่ำและผลรวมของลูกเต๋าคือ ${summation_dice}🎲\nลูกที่ 1: ${dice1}\nลูกที่ 2: ${dice2}\nลูกที่ 3: ${dice3}`)    
                    .addField('นี้ค่ะเงินรางวัล', ` - เป็นจำนวนเงิน ${reward} นะคะ`, true)
            ]});
        } else {
            message.channel.send({ embeds: [
                embed.setTitle('😩ขอโทษด้วยนะคะคุณแทงผิด😩').setDescription(`ผลรวมของลูกเต๋าคือ ${summation_dice} เพราะงั้นก็อดรางวัลนะคะะ😘`)
                    .addField('ถ้างั้นหนูก็คงต้องริบเงินเอาไว้นะคะ', ` - เป็นจำนวนเงิน ${amount} นะคะ`, true)
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
