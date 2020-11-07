const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "addrole",
  aliases: ["arole", "+role"],
  category: "moderation",
  description: "Add role to any user",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("You don't have `Manage Roles` power")
    }
    
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]).user;
    
    if(!target) return message.reply(`I am unable to find the user`)
    
    let arole = message.mentions.roles.first() || message.guild.roles.cache.get(`${args[0]}`) || message.guild.roles.cache.find(x => x.name === `${args.join(" ")}`);
    
    if(!arole) return message.reply(`I am unable to find the role`)
    
    let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
    
      const embed = new MessageEmbed()
      .setAuthor(target.user.username, ticon)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
      .setColor("RANDOM")
      .setDescription(`${arole} role added to ${target}`)
      .setFooter(`Role added by ${message.author.username}`, aicon)
      .setTimestamp()
      
      await message.channel.send(embed)
      
      target.roles.add(arole)
    
  }
}