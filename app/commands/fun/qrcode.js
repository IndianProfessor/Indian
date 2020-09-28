const qrcode = require("qrcode");
const tempy = require("tempy");

module.exports = {
  name: "qrcode",
  aliases: ["qr"],
  category : "fun",
  description: "Get any text in qrcode",
  run: async (bot, message, args) => {
    
  const qrOutput = tempy.file({ extension: "png" });
    
  message.channel.startTyping();
    
  if (args.length > 0) {
    qrcode.toFile(qrOutput, args.join(" "), { margin: 1 }, (error) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: qrOutput,
          name: "qr.png"
        }]
      });
    });
  } else {
    message.channel.stopTyping();
    message.reply("Provide some text to generate a QR code!");
  }
    message.delete()
  }
};