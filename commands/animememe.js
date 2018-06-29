const Discord = require('discord.js');
const randomPuppy = require('random-puppy')

module.exports.run = async(bot, message, args) => {
  if(message.author.bot) return;
  if(message.channel.type !== "text") return;
  randomPuppy('animemes')
            .then(url => {
                const embed = new Discord.RichEmbed()
                .setTimestamp(new Date())
                .setTitle(`Anime Meme`)
                .setImage(url)
    .setColor("#27a0ff")
    return message.channel.send({ embed });
            })
}
module.exports.help = {
	name: "animememe"
}