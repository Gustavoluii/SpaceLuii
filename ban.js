const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("O membro não foi encontrado.");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ | Você não tem permissão!");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("❌ | Essa pessoa não pode ser banida pois ela possui um cargo superior ao meu.");
 
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Banimento:")
    .setColor("#bc0000")
    .setImage("https://i.imgur.com/VNY0oqd.gif")
    .addField("Membro Banido", `${bUser}`)
    .addField("Banido por", `<@${message.author.id}>`)
    .addField("Banido no chat", message.channel)
    .addField("Motivo", bReason);
 
    let incidentchannel = message.guild.channels.find(`name`, "punições");
    if(!incidentchannel) return message.channel.send("Você precisa criar um canal chamado `#punições` para poder usar esse comando.");
 
    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
    message.channel.send("⚠ | Membro Banido!");
 
 
    return;

}

module.exports.help = {
    name: "ban"
}
