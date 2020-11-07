const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "showemoji",
  category: "fun",
  description: "Converting Server emoji to PNG/GIF!",
  run: async (client, message, args) => {
    
    const emoji = args[0];
    if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"}`;
      
      const Added = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription("**" + `[${customemoji.name}](${Link})` + "**")
        .setImage(Link);
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(`Please Give Me A Valid Emoji!`);
      message.channel.send(`You Can Use Normal Emoji Without Adding In Server!`);
    }
  }
};