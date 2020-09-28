const discord = require("discord.js")
const owner1 = process.env.owner1
const owner2 = process.env.owner1

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
    
    const botOwner = client.users.cache.get(owner1)
    const botOwner2 = client.users.cache.get(owner2)
    
    const msg = args.join(" ")
    
    let embed = new discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true, size: 2048}))
    .setDescription(`**Name - **${message.author} \n\n**ID - **${message.author.id} \n\n**Message - **${msg}`)
    .setColor("RANDOM")
    .setFooter("Support")
    .setTimestamp()
    if(msg.image)embed.setImage(msg.image)
    
    botOwner.send(embed)
    botOwner2.send(embed)
    
    message.delete()
    
    let eembed = new discord.MessageEmbed()
    .setDescription("<a:yes_check:748149109785100300> Your message has been sent to the owner")
    .setColor("RANDOM")
    
    await message.channel.send(eembed)
         
  }
}