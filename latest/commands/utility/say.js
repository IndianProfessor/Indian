const Discord = require("discord.js");

module.exports = {
  name: "say",
  category: "utility",
  usage: "say <text>",
  description: "Say anything with bot",
  run: async (client, message, args) => {
    
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You don't have enough powers!")
    
    const say = args.join(" ")
    
    if(say.image) return message.channel.send(say.image)
    
    message.delete()
    
    message.channel.send(say)
    
  }
}