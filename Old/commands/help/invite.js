const discord = require("discord.js")

module.exports = {
  name: "invite",
  category: "help",
  description: "Get the invite link and support server links",
  run: async (client, message, args) => {
    
      let embed = new discord.MessageEmbed()
      
      embed.setDescription("<:server:752149324758253628>" + "**" + `[Support Server](https://discord.gg/mk4S5fa) - ` + "**" + "Join this server to get regular updates" + "**" + `\n\n 🔗 [Invite Link](https://bit.ly/indian-v2) - ` + "**" + "Link to invite me on your server")
      embed.setColor("RANDOM")
      embed.setFooter("©️ Indian")
      embed.setTimestamp()
      message.channel.send(embed)
         
  }
}