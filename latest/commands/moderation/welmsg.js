const db = require("quick.db")
const { default_msg } = require("../../server.js")
let reset = { default_msg }

module.exports = {
  name: "wmsg",
  aliases: ["welmsg", "welcomemessage"],
  category: "moderation",
  usage: "wmsg <text>\n\n{server} - To mention server name\n{user} - To mention the member\n{user.name} - To show the username of the member\n{user.tag} - To show the username with tag\n{user.rank} - To show the rank of the member\n{member.count} - To show the total members of the server",
  description: "To set the welcome message",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You don't have enough powers")
    }
    
      if(!args[0]) {
      return message.channel.send("Please give the message to set")
    }
    
    if(args.join("") === reset) {
      db.delete(`msg_${message.guild.id}`)
     return await message.channel.send("Reseted Welcome Message ✅")
    }
    
    let msg = args.slice(0).join(" ")
    
    db.set(`msg_${message.guild.id}`, `${msg}`)
  await message.channel.send(`Welcome message seted to ${msg}`)
    
  }
}