const discord = require("discord.js")

module.exports = {
  name: "contact",
  aliases: ["support"],
  category: "help",
  description: "Sends your message or problems to the owner of the bot",
  run: async (client, message, args) => {
    
    if(!args[0]) {
      let wrong = new discord.MessageEmbed()
      .setDescription("<a:no:748148333108920440> Message cannot be empty")
      .setColor("RANDOM")
      
      return message.channel.send(wrong)
    }
    
    const channel = client.channels.cache.get("768827091021594654")
    
    const msg = args.join(" ")
    
    let embed = new discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true, size: 2048}))
    .setDescription(`**Name - **${message.author} \n\n**User ID - **${message.author.id} \n\n**Channel ID - **${message.channel.id} \n\n**Message - **${msg}`)
    .setColor("RANDOM")
    .setFooter("Support")
    .setTimestamp()
    if(msg.image)embed.setImage(msg.image)
    
    channel.send(embed)
    
    message.delete()
    
    let eembed = new discord.MessageEmbed()
    .setDescription("<a:yes_check:748149109785100300> Your message has been sent to the owner")
    .setColor("RANDOM")
    
    await message.channel.send(eembed)
         
  }
}