const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
  if(message.channel.type !=="text") return;
  
   randomPuppy('memes')
  .then(url => {
                const embed = new Discord.RichEmbed()
                    .setTimestamp()
                    .setImage(url)
      .setColor('BLUE')
                     message.channel.send({ embed });
  })
}

module.exports.help = {
  name: "meme"
}
