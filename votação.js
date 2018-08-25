const Discord = require('discord.js');

module.exports.run = async (bot,message,args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {

        
        const text = args.slice(0.5).join(" ");
         if (text.length < 0.5) return message.channel.send("Você precisa por alguma mensagem!").then((value) => {
           setTimeout(() => {
                value.delete();
            }, 5000);
        });
        const embed = new Discord.RichEmbed()
        .setColor("#8236FF")
        .setAuthor("Votação:", `https://i.imgur.com/DRE2Syf.gif`)
        .setFooter(`Votação iniciada por: ${message.author.username}`,message.member.user.displayAvatarURL)
        .setDescription(text);
        message.delete().catch();
        message.channel.send("@everyone")
        let msg = await message.channel.send({embed})
        await msg.react('👍');
        await msg.react('👎');


    
    }
}

module.exports.help = {
    name: "votação"
}