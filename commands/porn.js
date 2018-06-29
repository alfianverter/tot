const Discord = require('discord.js');
const randomPuppy = require('random-puppy')

module.exports.run = async(bot, message, args) => {
  if(message.author.bot) return;
  if(message.channel.type !== "text") return;
  randomPuppy('porn')
            .then(url => {
                const embed = new Discord.RichEmbed()
                
                .setTitle("Porn NSFW")
                .setImage(url)
      .setColor('BLUE')
    return message.channel.send({ embed });
            })
}
module.exports.help = {
	name: "dog"
}