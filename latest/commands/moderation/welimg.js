const db = require("quick.db")
const { default_url } = require("../../server.js")
let reset = { default_url }

module.exports = {
  name: "wimg",
  aliases: ["welimg", "welcomeimage"],
  category: "moderation",
  usage: "wimg <Gif or Image link>",
  description: "To set the welcome image",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You don't have enough powers")
    }
    
      if(!args[0]) {
      return message.channel.send("Please give the link of the image")
    }
    
    if(args.join("") === reset) {
      db.delete(`url_${message.guild.id}`)
     return await message.channel.send("Reseted Welcome Image ✅")
    }
    
    db.set(`url_${message.guild.id}`, args[0])
  await message.channel.send(`Welcome image seted to ${args[0]}`)
    
  }
}