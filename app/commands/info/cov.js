const discord = require("discord.js")
const covid = require("novelcovid")

module.exports = {
  name: "covid",
  aliases: ["cov"],
  category: "info",
  description: "Get covid status of all countries",
  run: async (client, message, args) => {
      
     const covidStats = await covid.all()
     
     return message.channel.send(new discord.MessageEmbed()
      .setTitle('Covid-19 Global Status')
      .setColor("RANDOM")
      .addFields(
        { name: `Cases`, value: covidStats.cases.toLocaleString(), inline: true },
        { name: `Cases Today`, value: covidStats.todayCases.toLocaleString(), inline: true },
        { name: `Deaths`, value: covidStats.deaths.toLocaleString(), inline: true },
        { name: `Deaths today`, value:covidStats.deaths.toLocaleString(), inline: true },
        { name: `Recovered`, value: covidStats.recovered.toLocaleString(), inline: true },
        { name: `Recovered today`, value: covidStats.todayRecovered.toLocaleString(), inline: true },
        { name: `Infected right now`, value: covidStats.active.toLocaleString(), inline: true },
        { name: `Critical condition`, value: covidStats.critical.toLocaleString(), inline: true },
        { name: `Tested`,  value: covidStats.tests.toLocaleString(), inline: true }, ))
  }
}