const Discord = require('discord.js');
const randomPuppy = require('random-puppy')

module.exports.run = async(bot, message, args) => {
  if(!message.channel.nsfw) {return message.channel.send({embed: {
  color: 10516183,
  description: "🔞 **This channel is not marked as NSFW!** ❗ "
}})}
  else{
  randomPuppy('ass')
            .then(url => {
                const embed = new Discord.RichEmbed()
                
                .setTitle(`Ass`)
                .setFooter(`Requested by ${message.author.tag}`)
                .setImage(url)
    .setColor("#27a0ff")
    return message.channel.send({ embed });
            })
  }
}
module.exports.help = {
	name: "ass"
}