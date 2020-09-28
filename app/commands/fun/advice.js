const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
  name: "advice",
  category: "fun",
  usage: "advice",
  example: "https://cdn.glitch.com/fa0e3eee-9583-4fb5-b844-b6647f096256%2F4e212cd1-fc7e-421d-992b-7518bbb17571.image.png?v=1597488694664",
  description: "Get some advice",
  run: async (client, message, args) => {
    
    let data = await random.getAdvice()
    message.channel.send(data)
    
  }
}