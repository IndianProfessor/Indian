const discord = require("discord.js");

module.exports = {
  name: "slowmode",
  category: "utility",
  description: "Set the slowmode for the channel!",
  run: async (bot, message, args) => {
    
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("YOu don't have enough powers")
    
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I don't have enough powers")
    
    if (!args[0]) return message.channel.send(`You did not specify the time in seconds you wish to set this channel's slow mode too!`);
    
    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
    
    let reason = args.slice(1).join(" ")
    
    message.channel.setRateLimitPerUser(args[0], reason);
    
    if(!reason) {
      
    let embed = new discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({dynamic: true, size: 2048}))
    .setDescription(`Slowmode - **${args[0]}**`)
    .setColor("RANDOM")
    .setFooter("Slowmode")
    .setTimestamp()
    
    message.channel.send(embed)
      
    } else {
      
    let embed = new discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({dynamic: true, size: 2048}))
    .setDescription(`Slowmode - **${args[0]}** \n\nReason - **${reason}**`)
    .setColor("RANDOM")
    .setFooter("Slowmode")
    .setTimestamp()
    
    message.channel.send(embed)
      
    }
    
  }
};