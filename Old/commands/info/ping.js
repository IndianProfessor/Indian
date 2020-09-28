const discord = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns bot latency and API latency",
  run: async (client, message, args) => {
    
    let StartDate = Date.now();
    
    const Wait = new discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Loading...`);
    
    message.channel.send(Wait).then(Msg => {
      let EndDate = Date.now();

      const embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("🏓 Pong!")
      .setDescription(`🤖 **Bot Latency** - ${Math.floor(EndDate - StartDate)}ms \n\n**<:pingowo:746265785252577350> API Latency** - ${Math.round(client.ws.ping)}ms`)
      .setTimestamp();
      
      Msg.delete()
      
      message.channel.send(embed);
      
    })
  }
}