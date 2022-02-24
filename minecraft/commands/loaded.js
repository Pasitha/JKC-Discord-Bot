module.exports.run = async (bot, args) => {
    await JKCJrBot.waitForChunksToLoad();
    JKCJrBot.chat('Ready!');
}

module.exports.name = ['loaded'];