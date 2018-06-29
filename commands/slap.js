const Discord = require('discord.js')

module.exports.run = (bot, message, args, tools) => {

    var images = [
"https://i.imgur.com/fm49srQ.gif",
"https://i.imgur.com/o2SJYUS.gif",
"https://i.imgur.com/Agwwaj6.gif",
"https://i.gifer.com/cCX.gif",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7vgxCdD_ojfyfBGdZPeei11Hm7cK3zrPJTcsTYZ9Tl-dsA7upzw",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZp5heqxYIWj0l1G0KDC3o9YqJvmAG2FqP6n1BSVGwO5pnSMgg",
"https://pa1.narvii.com/6067/68a2bb5829d993b3362a37dce55caa9c0949af6c_hq.gif",
        "https://media.giphy.com/media/26uf3m46sDFVPedig/giphy.gif",
        "https://media.giphy.com/media/s5zXKfeXaa6ZO/giphy.gif",
        "https://media.giphy.com/media/gSIz6gGLhguOY/giphy.gif",
        "https://media.giphy.com/media/3XlEk2RxPS1m8/giphy.gif",
        "https://media.giphy.com/media/j3iGKfXRKlLqw/giphy.gif",
        "https://media.giphy.com/media/d3MKAN1sWm3VMSRy/giphy.gif",
        "https://media.giphy.com/media/xULW8nNDLNVlBY77dm/giphy.gif",
        "https://media.giphy.com/media/F0E72ofVJFEGc/giphy.gif",
        "https://media.giphy.com/media/3vDS40HZxJwFGTbXoI/giphy.gif",
        "https://media.giphy.com/media/IAAXyr5GU73xK/giphy.gif",
        "https://media.giphy.com/media/C8aZ7N7KZyBd6/giphy.gif",
        "https://media.giphy.com/media/xUA7b9Wc1uaT52QfO8/giphy.gif",
        "https://media.giphy.com/media/gfkETzKFBSkBW/giphy.gif",
        "https://media.giphy.com/media/uG3lKkAuh53wc/giphy.gif",
        "https://media.giphy.com/media/zvDT09xBhcuMo/giphy.gif",
        "https://media.giphy.com/media/IYcXTDme1ZPMI/giphy.gif",
        "https://media.giphy.com/media/z4toQK5UVI61W/giphy.gif",
        "https://media.giphy.com/media/etHUmA91GfDS8/giphy.gif",
        "https://media.giphy.com/media/bGnQmK38QoSg8/giphy.gif",
        "https://media.giphy.com/media/Ji03RBamoDhtK/giphy.gif",
    ];
    var rand = Math.floor(Math.random() * images.length);
    var randomImage = images[rand];
  let author = message.author;

    const patEmb = new Discord.RichEmbed()
      .setColor('BLUE')
        .setImage(randomImage);
    const sadEmb = new Discord.RichEmbed() 
      .setColor('BLUE')
        .setImage(randomImage);
    if (!args[0]) {
        message.channel.send(`I slaped You ${author} !!`, {
          embed: sadEmb
        });
        return;
    }

    if (!message.mentions.users.first()) return message.channel.send(`\`Please mention someone!\``).then(msg => {
        msg.delete(3000)
    });
    message.channel.send(`<@${message.author.id}> slapped ${args[0]}`, {
        embed: patEmb
    });


}

module.exports.help = {
    name: "slap"
}