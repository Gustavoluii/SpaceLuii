const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {

        if (message.member.hasPermission("ADMINISTRATOR")) {

            const text = args.slice(0.5).join(" ");
             if (text.length < 0.5) return message.channel.send("Você precisa por alguma mensagem!").then((value) => {
               setTimeout(() => {
                    value.delete();
                }, 3000);
            });
            const embed = new Discord.RichEmbed()
            .setColor("#8236FF")
            .setAuthor(`Anúncio - ${message.guild.name}`, "https://i.imgur.com/qX4nK3l.gif")
            .setFooter(`Anúncio feito por: ${message.author.username}`,message.member.user.displayAvatarURL)
            .setTimestamp(new Date())
            .setDescription(text);
            message.channel.send("@everyone")
            message.delete().catch();
            message.channel.send({embed})
        
        }
}

module.exports.help = {
    name: "anunciar"
}