module.exports = {
    name: "eval",
    category: "info",
    run: async (client, message, args) => {
      
      if(message.author.id != 641916872719204352) return message.channel.send("You can't use it")
      
       message.channel.send(await eval(args.join(" ")))
    }
}