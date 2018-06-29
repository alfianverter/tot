const Discord = require('discord.js');
const randomPuppy = require('random-puppy')

module.exports.run = async(bot, message, args) => {
  if(!message.channel.nsfw) return message.channel.send({embed: {
  color: 10516183,
  description: "🔞 **This channel is not marked as NSFW!** ❗ "
}})
  randomPuppy('ecchi')
            .then(url => {
                const embed = new Discord.RichEmbed()
                
                .setTitle(`Ecchi NSFW`)
                .setFooter(`Requested by ${message.author.tag}`)
                .setImage(url)
      .setColor('BLUE')
    return message.channel.send({ embed });
            })
}
module.exports.help = {
	name: "ecchi"
}