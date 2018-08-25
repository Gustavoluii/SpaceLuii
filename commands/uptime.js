const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot,message,args) => {

        let duration = moment.duration(bot.uptime).format('D[d], H[h], m[m], s[s]');
        let nomeeapelido = message.guild.member(message.author.id).nickname || message.author.username;

        message.channel.send("`"+nomeeapelido+"`, estou online à: `"+duration+"`");

}

module.exports.help = {
    name: "uptime"
}