const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {

    let embed = new Discord.RichEmbed()
 
   .setDescription("[Upvote my bot](https://discordbots.org/bot/434304339268337665/vote)\n[Join my server](https://discord.gg/b9pkqk6)\n\nHelp Command- `>help`")
   .addField("OWNER", "<@456497258607935498>")
   message.channel.send(embed);
}
module.exports.help = {
    name: "info"
}
