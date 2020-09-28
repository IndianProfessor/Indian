const discord = require("discord.js");
const got = require("got");

module.exports = {
    name: "amazeme",
    category: "fun",
    usage: "amazeme",
    example: "https://cdn.glitch.com/fa0e3eee-9583-4fb5-b844-b6647f096256%2F4bfc380d-5ed0-401a-8d29-ff503b5e3e91.image.png?v=1597488988791",
    description: "Returns random amazing gif/image.",
    run: async (client, message, args) => {

  got('https://www.reddit.com/r/interestingasfuck/random.json').then(response => {
        let content = JSON.parse(response.body);
        var title = content[0].data.children[0].data.title;
        var amazeme = content[0].data.children[0].data.url;
        let wow = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`**` + `[${title}](${amazeme})` + `**`)
        .setImage(amazeme)
        .setFooter(`© 2020 Reddit`)
        .setTimestamp()
        message.channel.send(wow)
    }).catch(console.error);

    }
};