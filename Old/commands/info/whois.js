const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const flags = {
  DISCORD_EMPLOYEE: "Discord Employee",
  DISCORD_PARTNER: "Discord Partner",
  BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
  BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
  HYPESQUAD_EVENTS: "Discord Employee",
  HOUSE_BRAVERY: "Discord Employee",
  HOUSE_BRILLIANCE: "Discord Employee",
  HOUSE_BALANCE: "Discord Employee",
  EARLY_SUPPORTER: "Discord Employee",
  TEAM_USER: "Team User",
  SYSTEM: "System",
  VERIFIED_BOT: "Verified Bot",
  VERIFIED_DEVELOPER: "Verified Bot Developer"
}

module.exports = {
  name: "whois",
  aliases: ["userinfo"],
  category: "info",
  description: "Get info of any user",
  run: async (client, message, args) => {
    
    let target
    
    if(message.mentions.users.first()) {
      target = message.mentions.users.first();
    } else if(args[0]) {
        target = message.guild.members.cache.get(args[0]).user;
      } else {
        target = message.author
      }
    
    if (target.presence.status === "dnd") target.presence.status = "Do Not Disturb <:DoNotDisturb:733303060989739100>";
    if (target.presence.status === "idle") target.presence.status = "Idle <:IdleIcon:733303179181293608>";
    if (target.presence.status === "online") target.presence.status = "Online <:3619_discord_online:733302876222521385>";
    if (target.presence.status === "offline") target.presence.status = "Offline <:3268_discord_invisible:733303333057593344>";
    
    function game() {
      let game;
      if (target.presence.activities.length >= 1) game = `${target.presence.activities[0].type} | ${target.presence.activities[0].name} | ${target.presence.activities[0].state}`;
      else if (target.presence.activities.length < 1) game = "None";
      return game;
    }
    
    let x = Date.now() - target.createdAt;
    let y = Date.now() - message.guild.members.cache.get(target.id).joinedAt;
    let created = Math.floor(x / 86400000);
    let joined = Math.floor(y / 86400000);
    
    const member = message.guild.member(target);
    let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "None";
    let status = target.presence.status;
    let avatar = target.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
    let createdate = moment.utc(target.createdAt).format("LLLL");
    let joindate = moment.utc(target.joinedAt).format("LLLL");
    let flags = target.flags.toArray();
    let newbadges = [];
    flags.forEach(m => {newbadges.push(m.replace("_", " "))})
    if(target.flags.toArray() < 1) newbadges = "None";
    
    const embed = new MessageEmbed()
    .setAuthor(target.tag, avatar)
    .setThumbnail(avatar)
    .addFields(
        { name: `❯ Name`, value: target.username, inline: false },
        { name: `❯ Tag`, value: "`" + target.discriminator + "`", inline: false },
        { name: `❯ ID`, value: "`" + target.id + "`", inline: false },
        { name: `❯ Nickname`, value: nickname, inline: false },
        { name: `❯ Account Creation`, value: `${createdate} | ${created} day(s) ago`, inline: false },
        { name: `❯ Server Joined At`, value: `${joindate} | ${joined} day(s) ago` , inline: false },
        { name: `❯ Status`, value: status, inline: true },
        { name: `❯ Game`, value: game(), inline: true },
        { name: `❯ Badges`, value: newbadges, inline: true },
        { name: `❯ Roles`,  value: `<@&${member._roles.join('> <@&')}>`, inline: true }, )
    .setColor("RANDOM")
    .setFooter(`Asked by ${message.author.username}`, aicon  )
    .setTimestamp()
    
    message.channel.send(embed)
      
  }
}