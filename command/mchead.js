module.exports = {
    name : 'mchead',
    description : 'get minecraft player head',
    execute(client, message, args) {
        if(!args[1]) return message.channel.send("อยากได้หัวใครช่วยบอกหนูหน่อยนะคะะ");

		require('request')(`https://api.mojang.com/users/profiles/minecraft/${args[1]}`, {json : true}, (error, response, body) => {
			const identifier = response.body.id;

			message.channel.send(`${args[1]} head`, {
				files: [
					`https://mc-heads.net/avatar/${identifier}.png`,
					`https://mc-heads.net/head/${identifier}/${(args[2] === 'left' ? 'left' : 'right')}.png`,
				]
			});
		});
    }
}