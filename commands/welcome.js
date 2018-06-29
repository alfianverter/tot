const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => {

var option = args.slice(0).join(" ")
            if (!option) {
              var embed = new Discord.RichEmbed()
      .setColor('BLUE')
              .setDescription(`**REMIND:** 
- \`Hooks such as [] or <> are not to be used when using commands\`.
**Command**
- \`j!welcome set <#channel>\`
**EXAMPLE:**
- \`j!welcome #welcome-goodbye\`
`)
              .setFooter("welcome", bot.user.displayAvatarURL)
              .setTimestamp()
              message.react("📜")
              message.channel.send({embed});
            } else {
            var nick = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
            if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("Sorry, you don't have permissions to do this!");
            var inputmessage = message.mentions.channels.first()
            if (args[0]) {
              nick[message.guild.id] = {
                nick: inputmessage.id
             };
              fs.writeFile("./welcome.json", JSON.stringify(nick), (err) => {
                if (err) console.log(err)
             });
              
              var embed = new Discord.RichEmbed()
              .setColor("#38087e")
              .setDescription(`<@${message.author.id}>. \n\n**Welcome set to**\n${inputmessage}`)
              .setTimestamp()
              
              message.channel.send({embed});
            }
            }
}

exports.help = {
    name: "welcome"
}