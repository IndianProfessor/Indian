const Discord = require("discord.js")

module.exports = {
  name: "nick",
  aliases: ["setnick", "setnickname", "nickname"],
  category: "moderation",
  description: "Change nickname of anyone",
  run: async (client, message, args) => {
    
  if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
    let uembed = new Discord.MessageEmbed()
    .setDescription("You don't have enough powers")
    .setColor("RED")
    return message.channel.send(uembed)
  }
    
    if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) {
      let cembed = new Discord.MessageEmbed()
      .setDescription("I don't have enough powers")
      .setColor("RED")
      return message.channel.send(cembed)
    }
  
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]).user
    
  if (!user){
    let eembed = new Discord.MessageEmbed()
    .setDescription("You need to mention the user first")
    .setColor("RED")
    return message.channel.send(eembed)
  }
  
  let nick = args.slice(1).join(" ")
  
  if (!nick){
    let membed = new Discord.MessageEmbed()
    .setDescription("Please give the nick you want to have")
    .setColor("RED")
    return message.channel.send(membed)
  }
  
  let member = message.guild.members.cache.get(user.id);
    
  await member.setNickname(nick).catch(err => message.channel.send({embed: {color: "RED", description: `Error: ${err}`}}))
    
  let embed = new Discord.MessageEmbed()
  .setDescription(`Successfully changed **${user.tag}** nickname to **${nick}**`)
  .setColor("GREEN")
  message.channel.send(embed);
    
  }
}