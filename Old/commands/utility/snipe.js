const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
  name: "snipe",
  aliases: ["ms", "messagesnipe"],
  category: "info",
  usage: "snipe",
  description: "Get the latest deleted message",
  run:async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
   if(prefix == null) {prefix =  config.default_prefix}
    
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send("There are no deleted messages in this channel!")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.avatarURL({dynamic: true, size: 2048}))
    .setDescription(msg.content)
    .setColor("RANDOM")
    .setFooter("Snipe")
    .setTimestamp()
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send(embed)
   
    
  }
}