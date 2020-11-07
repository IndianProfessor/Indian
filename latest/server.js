const discord = require("discord.js");
const { default_prefix } = require("./config.json");
const { config } = require("dotenv");
const db = require("quick.db");
const constant = require("discord.js/src/util/Constants.js");
constant.DefaultOptions.ws.properties.$browser = "Discord Android";
const client = new discord.Client({
  disableMentions: 'everyone'
});
require("./uptime.js")

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
});

client.on("ready", () => {
  function randomStatus() {
    let status = [`.help for ${client.users.cache.size} users`, `.help on ${client.guilds.cache.size} servers`, `.help in ${client.channels.cache.size} channels`];
    let rstatus = Math.floor(Math.random() * status.length);
    let type = ["PLAYING", "STREAMING", "WATCHING", "LISTENING"];
    let work = Math.floor(Math.random() * type.length);
    client.user.setActivity(status[rstatus], { type: type[work], url: "https://twitch.tv/discord" });
  }
  setInterval(randomStatus, 10000);

  console.log(`${client.user.username} is now ready`);
});

client.on("message", async message => {
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
  
  const Indian = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(Indian)) {
    let embed = new discord.MessageEmbed()
      .setDescription(`My prefix for this server is \`${prefix}\``)
      .setColor("RANDOM");

    message.channel.send(embed);
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.models = { user: require('./database/models/user.js') }
require('./database/connect.js')

  client.on("guildMemberAdd", (member) => {
  let chx = db.get(`welchannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }
  
  let default_url = `https://cdn.discordapp.com/attachments/696417925418057789/716197399336583178/giphy.gif`//default msg mtt change krna yeh hyper ke liye lagaye hai ek baar custom msg shi ho gaya toh isko bhi shi kr denge
  
  let default_msg = `
Hey, ${member} welcome to ${member.guild}`
  
  let m1 = db.get(`msg_${member.guild.id}`)
  const msg = m1.replace("{user}", member.user).replace("{server}", member.guild).replace("{user.name}", member.user.username).replace("{user.tag}", member.user.tag).replace("{user.rank}", `${member.guild.memberCount}th`).replace("{member.count}", member.guild.memberCount)
  if(m1 === null)msg = default_msg;
  
  let url = db.get(`url_${member.guild.id}`)
  if(url === null) url = default_url;

  let wembed = new discord.MessageEmbed()
  .setAuthor(member.user.username, member.user.avatarURL({dynamic: true, size: 2048}))
  .setColor("RANDOM")
  .setImage(url)
  .setDescription(msg)
  .setFooter("Joined")
  .setTimestamp();
  
  client.channels.cache.get(chx).send(wembed)
})

client.login(process.env.token);