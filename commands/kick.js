const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("O membro não foi encontrado.");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ | Você não tem permissão!");
  if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ | Essa pessoa não pode ser banida pois ela possui um cargo superior ao meu.");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Expulso:")
  .setColor("#e56b00")
  .addField("Membro Expulso", `${kUser}`)
  .addField("Expulso por", `<@${message.author.id}>`)
  .addField("Expulso no Chat", message.channel)
  .addField("Motivo", kReason);

  let kickChannel = message.guild.channels.find(`name`, "punições");
  if(!kickChannel) return message.channel.send("Você precisa criar um canal chamado `#punições` para poder usar esse comando.");

  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);
  message.channel.send("⚠ | Membro Expulso!");

  return;

}

module.exports.help = {
    name: "kick"
}