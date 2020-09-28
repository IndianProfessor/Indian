const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "removerole",
  aliases: ["rmrole", "-role"],
  category: "moderation",
  description: "Remove role from any user",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("You don't have `Manage Roles` power")
    }
    
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]).user;
    
    if(!target) return message.reply(`I am unable to find the user`)
    
    let rrole = message.mentions.roles.first() || message.guild.roles.cache.get(`${args[0]}`) || message.guild.roles.cache.find(x => x.name === `${args.join(" ")}`);
    
    if(!rrole) return message.reply(`I am unable to find the role`)
    
    let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
    
      const embed = new MessageEmbed()
      .setAuthor(target.user.username, ticon)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
      .setColor("RANDOM")
      .setDescription(`${rrole} role removed from ${target}`)
      .setFooter(`Role added by ${message.author.username}`, aicon)
      .setTimestamp()
      
      await message.channel.send(embed)
      
      target.roles.remove(rrole)
    
  }
}