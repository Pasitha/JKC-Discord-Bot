module.exports = client => {
    client.user.setStatus('idle');
    client.user.setPresence({ activities: [{ name: 'Discord' }], status: 'playing' });

    console.log('JKC Discord Bot is online!');
}
