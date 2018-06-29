const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const { get } = require("snekfetch"); // This is to fetch the user avatar and convert it to a buffer.
const superagent = require('superagent');
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
var member = message.mentions.members.first() || message.guild.members.get(args[0]) || args.slice(0).join(" ") || message.member;
  
            var namam = member.user.username
            var jadim = namam.length > 12 ? namam.substring(0, 10) + "..." : namam;
            async function createCanvas() {
            var imageUrlRegex = /\?size=2048$/g;
              
            var {body: background} = await superagent.get("https://www.scitecheuropa.eu/wp-content/uploads/2018/03/pexels-photo-110854-696x392.jpeg");
            var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
            var {body: botavatar} = await superagent.get("https://cdn.discordapp.com/attachments/461833806844919808/461868283218493451/Screenshot_1.png");
   
            return new Canvas(856, 376)
              .addImage(avatar, 100, 50, 256, 256, 128)
      .setColor('BLUE')
              .setTextFont('50px System')
              .setTextAlign('center')
              .setTextFont('30px Arial')
              .addImage(background, 0, 0, 856, 376)
              .addImage(botavatar, 0, 0, 856, 376)
              .addText("GoodBye", 625, 105)
              .addText(`${jadim}#${member.user.discriminator}`, 625, 145)
              .addRoundImage(avatar, 135, 20, 256, 256, 128)
              .toBufferAsync();
      
            }
              
            message.channel.send(new Discord.Attachment(await createCanvas()));

  
  
  
}
  module.exports.help = {
  name: "test"
}
