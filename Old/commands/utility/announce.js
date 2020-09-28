const Discord = require("discord.js");

module.exports = {
  name: "announce",
  category: "utility",
  usage: "announce <text>",
  description: "Announce anything with bot",
  run: async (client, message, args) => {
    
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You don't have enough powers!")
    
    const channel = message.mentions.channels.first() || message.channel
    
    if(!channel) return message.channel.send("Please mention a channel to send the message")
    
    const say = args.slice(1).join(" ")
    
    let embed = new Discord.MessageEmbed()
    .setDescription(say)
    .setTimestamp()
    if(say.image)embed.setImage(say.image)

    channel.send(embed)
    
    message.delete()
    
  }
}