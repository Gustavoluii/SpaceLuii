const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {

let penale = ["8====D","8===D","8===========D","8===D","8=======D","8=D","8=============================D","8===D","8=D","8========D","8====D","8=======D","8=D","8=D","8=========D"];


    let penembed = new Discord.RichEmbed()
    .setAuthor(`Penis de ${message.member.user.username}`)
    .setColor("#0174DF")
    .setDescription(`${penale[Math.round(Math.random() * penale.length - 1)]}`);
    message.channel.send(penembed);


}

module.exports.help = {
    name: "penis"
}