const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
  name: "help",
  description: "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "help",
  run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + `\${args[0]}\``);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
      
      if(command.example) embed.setImage(command.example)
      if(command.aliases) embed.addField("Aliases", "`" + command.aliases + "`")

      return message.channel.send(embed);
      
    } else {
      
      let prefix = await db.fetch(`prefix_${message.guild.id}`);
      if (prefix == null) {prefix = config.default_prefix};
      
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setDescription(
          `
For more info type \`${prefix}help <command_name>\``)
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }

      return message.channel.send(emx);
    }
  }
};