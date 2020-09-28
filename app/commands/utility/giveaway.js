const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "giveaway",
  description: "Create a simple giveaway",
  usage: `<time> <channel> <prize>`,
  category: "utility",
  run: async (client, message, args) => {
    
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`You cannot host a giveaway`);
    
    if (!args[0]) return message.channel.send(`Please specify the time`);
    
    if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) return message.channel.send(`Wrong format of the time! Put **m** for Minutes, **h** for Hours and **d** for days`);
    
    if (isNaN(args[0][0])) return message.channel.send(`That is not a number`);
    
    let channel = message.mentions.channels.first();
    
    if (!channel) return message.channel.send(`I could not find that channel in the guild!`);
    
    let prize = args.slice(2).join(" ");
    
    if (!prize) return message.channel.send(`No prize specified!`);
    
    let Embed = new MessageEmbed()
      .setTitle(`🎉 GIVEAWAY!`)
      .setDescription(
        `
<:BlowParty:760073216076152872> Hoster: ${message.author}
🎁 Prize: **${prize}**`)
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor("RANDOM");
    
    let m = await channel.send(Embed);
    
    m.react("a:CG_GA4:760070839830970419");
    
    setTimeout(() => {
      if (m.reactions.cache.get("a:CG_GA4:760070839830970419").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("a:CG_GA4:760070839830970419").count}`);
        return message.channel.send(`No one reacted!`);
      }

      let winner = m.reactions.cache
        .get("a:CG_GA4:760070839830970419")
        .users.cache.filter((u) => !u.bot)
        .random();
      
      let embed = new MessageEmbed()
      .setTitle(`🎉 GIVEAWAY ENDED!`)
      .setDescription(
      `
🎁 Prize: ${prize}
<:Winner:760073650551652413> Winner: ${winner}
<:BlowParty:760073216076152872> Hoster: ${message.author}`)
      .setColor("RANDOM")
      .setFooter("Ended")
      .setTimestamp()
      m.edit(embed)
      
    channel.send(`${winner}, You won the giveaway`);
    }, ms(args[0]));
  },
};