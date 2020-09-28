const { get } = require("request-promise-native")
const { MessageEmbed } = require("discord.js")
const { getPokemon } = require('../../utils/pokemon')

module.exports = {
  name: "poke",
  description: "Get any pokemon description",
  category: "info",
  usage: "poke <name>",
  run: async (client, message, args) => {

        const pokemon = message.content.toLowerCase().split(" ")[1];
        try {
            const pokeData = await getPokemon(pokemon);
            const { 
                sprites, 
                stats, 
                weight, 
                name, 
                id, 
                base_experience,
                abilities,
                types
            } = pokeData;
            const embed = new MessageEmbed();
            embed.setTitle(`${name.toUpperCase()} #${id}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${name.images.typeIcon}`)
            embed.setImage(`${sprites.front_default}`);
            stats.forEach(stat => embed.addField(stat.stat.name.toUpperCase(), stat.base_stat, true));
            types.forEach(type => embed.addField('Type', type.type.name, true));
            embed.addField('Weight', weight);
            embed.addField('Base Experience', base_experience);
            message.channel.send(embed);
        }
        catch(err) {
            console.log(err);
            message.channel.send(`Pokemon ${pokemon} does not exist.`)
  }
}
  }