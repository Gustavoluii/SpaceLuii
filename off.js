const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {

        if(message.author.id !== "231611977053503488") return await message.channel.send("Esse comando só está disponível para o meu dono!");
        await message.channel.send(`Estou me desligando...`);
        process.exit();
}

module.exports.help = {
    name: "off"
}