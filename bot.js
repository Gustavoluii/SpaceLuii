const Discord = require("discord.js");
const fs = require("fs");
const superagent = require("superagent");
const bot = new Discord.Client({fetchAllMembers: true});
const client = new Discord.Client();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
bot.commands = new Discord.Collection();

const youtube = new YouTube(process.env.GOOGLE_API_KEY);

const queue = new Map();

bot.login(process.env.TOKEN);

const PREFIX = ">";
const LOGO = "https://i.imgur.com/MqKv0af.png";
const THUMB = "https://i.imgur.com/dvjmkWz.png";

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Pasta COMMANDS não encontrada!");
      return;
    }
  
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
    });
  });

bot.on("ready", () => {
    console.log(`${bot.user.username} Está online! ${bot.guilds.size} Servidores | ${bot.users.size} Membros.`);
    let gamesale = [">ajuda para saber mais sobre mim", "Esse planeta será dominado por mim!", `Estou online em ${bot.guilds.size} planetas com ${bot.users.size} terráqueos.`];
    var randomi = Math.round(Math.random() * gamesale.length)
    bot.user.setActivity(`${gamesale[gamesale.length == 1 ? 0 : randomi == 0 ? randomi + 1 : randomi - 1]}`, "https://www.twitch.tv/gustavoluii");
    setInterval(() => {
        randomi = Math.round(Math.random() * gamesale.length)
        bot.user.setGame(`${gamesale[gamesale.length == 1 ? 0 : randomi == 0 ? randomi + 1 : randomi - 1]}`, "https://www.twitch.tv/gustavoluii");
    },60 * 1000)
});



bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let prefix = PREFIX;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);


    if(cmd === `${prefix}reiniciar`){
    if(message.author.id !== "231611977053503488") return await message.channel.send("Esse comando só está disponível para o meu dono!");
    resetBot(message.channel)
        async function resetBot(channel) {
            channel.send(`Reiniciando...`)
            .then(msg => bot.destroy(true))
            .then(() => bot.login(tokenfile.TOKEN));
         }

    bot.on('ready', () => {
        message.channel.send(`Bot reiniciado com sucesso!`);
    });

}
    if(cmd === `${PREFIX}cat`){

        let {body} = await superagent
        .get(`http://aws.random.cat/meow`);
        
        let catembed = new Discord.RichEmbed()
        .setColor("#ff9900")
        .setTitle(":cat:")
        .setImage(body.file);   
        message.channel.send(catembed);
    }

    if(cmd === `${PREFIX}dog`){
        let {body} = await superagent
        .get(`https://random.dog/woof.json`);
        
        let dogembed = new Discord.RichEmbed()
        .setColor("#ff9900")
        .setTitle(":dog:")
        .setImage(body.url);
        message.channel.send(dogembed);
    }

    if (message.content.includes("https://discord.gg/")) {
       if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.delete();
            message.reply("Você não pode enviar link de outros grupos nesse grupo!");
        }
    }

    if(cmd === `${prefix}info`){
        message.channel.sendMessage("Estou online em `"+bot.guilds.size+"` Planetas com `"+bot.users.size+"` terráqueos.");
    }
    if(cmd === `${prefix}ping`){
        message.channel.send(`Meu ping está ${Date.now() - message.createdTimestamp} ms.`);
    }
    //começo do comando >ajuda//
    if(cmd === `${prefix}ajuda`){
        let ajudamebed = new Discord.RichEmbed()
        .setColor("#0174DF")
        .setAuthor("SpaceLuii - Ajuda", LOGO)
        .setDescription("Selecione alguma categoria que você deseja usar:\n:hammer: » Relacionado à Moderação.\n:musical_note: » Relacionado à Música.\n:camera_with_flash: » Relacionado à Imagens.\n:new_moon: » Relacionado à Comandos.")
        message.member.sendEmbed(ajudamebed).then(msg=> {
        msg.react("🔨").then(r => {
        msg.react("🎵").then(r => {
        msg.react("📸").then(r => {
        msg.react("🌑").then(r => {

            const Moderação = (reaction, user) => reaction.emoji.name === '🔨' && user.id === message.author.id;
            const musica = (reaction, user) => reaction.emoji.name === '🎵' && user.id === message.author.id;
            const imagem = (reaction, user) => reaction.emoji.name === '📸' && user.id === message.author.id;
            const geral = (reaction, user) => reaction.emoji.name === '🌑' && user.id === message.author.id;

            const mod = msg.createReactionCollector(Moderação);
            const msc = msg.createReactionCollector(musica);
            const ima = msg.createReactionCollector(imagem);
            const ger = msg.createReactionCollector(geral);

            mod.on('collect', r=> {
                const embed = new Discord.RichEmbed()
                .setColor("#0174DF")
                .setAuthor("🔨 Moderação")
                .setDescription("`>ban` - `Banir um membro.`\n`>kick` - `Expulsar um membro.`\n`>mute` - `mutar um membro.`")
                message.member.send({embed: embed}).then(a=>a.delete(13000));
                })
            msc.on('collect', r=> {
                const embed = new Discord.RichEmbed()
                .setColor("#0174DF")
                .setAuthor("🎵 Música")
                .setDescription("`>play` - `diciona uma musica a lista para tocar.`\n`>stop` - `Para a música e limpa a lista.`\n`>skip` - `Pular uma música.`\n`>volume` - `Aumentar ou diminuir o volume.`\n`>np` - `Informação da música que está tocando.`\n`>queue` - `Lista de músicas.`\n`>pause` - `Pausar uma música.`\n`>resume` - `Tirar música do modo Pause.`")
                message.member.send({embed: embed}).then(a=>a.delete(13000));
                })
            ima.on('collect', r=> {
                const embed = new Discord.RichEmbed()
                .setColor("#0174DF")
                .setAuthor("📸 Imagem")
                .setDescription("`>dog` - `Foto de cachorrinho.`\n`>cat` - `Foto de gatinho.`")
                message.member.send({embed: embed}).then(a=>a.delete(13000));
                })
            ger.on('collect', r=> {
                const embed = new Discord.RichEmbed()
                .setColor("#0174DF")
                .setAuthor("🌑 Comandos")
                .setDescription("`>votação` - `Abrir uma enquete.`\n`>anunciar` - `Anúnciar alguma mensagem.`\n`>info` - `Informações do bot.`\n`>ping` - `Latência do bot.`\n`>penis` - `Tamanho da sua peça.`\n`>uptime` - `informação de tempo online.`")
                message.member.send({embed: embed}).then(a=>a.delete(13000));
                })
           
            })
         })
      })
    })
})      
        let ajudachatembed = new Discord.RichEmbed()
        .addField("Okay!", "Foi enviado uma lista com todos os meus comandos em seu privado!")
        .setColor("#0174DF")
        message.channel.sendEmbed(ajudachatembed); //.then(a=>a.delete(15000));

    }

});
//Fim do comando >ajuda//


bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('ready', () => console.log('Função de música funcionando!'));

bot.on('disconnect', () => console.log('Eu apenas desconectei, mais já estou reconectando agora...'));

bot.on('reconnecting', () => console.log('Estou me reconectando agora!'));

bot.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('Me desculpe, mas você precisa estar em um canal de voz para tocar música!');
	//	const permissions = voiceChannel.permissionsFor(msg.Client.user);
	//	if (!permissions.has('CONNECT')) {
	//		return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
	//	}
	//	if (!permissions.has('SPEAK')) {
	//		return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
	//	}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** foi adicionado à lista!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`__**RESULTADO DA PESQUISA**__\n${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}\n`+"`Forneça um valor para selecionar um dos resultados da pesquisa que vão de 1 a 10.`");
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 20000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('Você não respondeu a `Seleção de músicas` e o tempo acabou.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('Não consegui obter nenhum resultado de pesquisa.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Apenas pessoas com a permissão de `Gerenciar mensagens` tem acesso a esse comando.");
		if (!msg.member.voiceChannel) return msg.channel.send('Você não está em um canal de voz!');
		if (!serverQueue) return msg.channel.send('Não há nada tocando que eu possa pular para você.');
		serverQueue.connection.dispatcher.end('O comando Skip foi usado!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Apenas pessoas com a permissão de `Gerenciar mensagens` tem acesso a esse comando.");
		if (!msg.member.voiceChannel) return msg.channel.send('Você não está em um canal de voz!');
		if (!serverQueue) return msg.channel.send('Não há nada que eu possa fazer para você.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('O comando de parada foi usado!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Apenas pessoas com a permissão de `Gerenciar mensagens` tem acesso a esse comando.");
		if (!msg.member.voiceChannel) return msg.channel.send('Você não está em um canal de voz!');
		if (!serverQueue) return msg.channel.send('Não há nada Tocando.');
		if (!args[1]) return msg.channel.send(`O volume atual é: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`Eu ajustei o volume para: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('Não há nada Tocando.');
		return msg.channel.send(`🎶 Tocando agora: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('Não há nada Tocando.');
		return msg.channel.send(`__**Lista de Músicas:**__\n${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}\n\n**Tocando agora:** ${serverQueue.songs[0].title}`);
	} else if (command === 'pause') {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Apenas pessoas com a permissão de `Gerenciar mensagens` tem acesso a esse comando.");
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Música pausada!');
		}
		return msg.channel.send('Não há nada Tocando.');
	} else if (command === 'resume') {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Apenas pessoas com a permissão de `Gerenciar mensagens` tem acesso a esse comando.");
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Música não está mais pausada!');
		}
		return msg.channel.send('Não há nada Tocando.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Eu não pude entrar no canal de voz: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** foi adicionado à Lista!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'O fluxo não está gerando com rapidez suficiente.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Tocando: **${song.title}**`);
}


