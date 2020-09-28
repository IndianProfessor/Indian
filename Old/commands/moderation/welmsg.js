const db = require("quick.db")
const { default_msg } = require("../../server.js")
let reset = { default_msg }

module.exports = {
  name: "welcomemsg",
  aliases: ["wmessage", "wmsg", "welcomemessage"],
  category: "moderation",
  usage: "prefix <new-prefix>",
  description: "Change the guild prefix",
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