// Host
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log('Pinging');
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// Calling the Packages and Files
const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const fs = require("fs");
let bot = new Discord.Client();
bot.commands = new Discord.Collection();
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, bot);

// Ready event
bot.on('ready', () => {
  console.log("Loading...");
  setTimeout(function(){
  console.log("Bot has been loaded completely.");
  }, 1000);

// Bot Status
function botStatus() {
  let status = [
    `on ${bot.guilds.size} servers | ~help`,
    `with ${bot.users.size.toLocaleString()} users | ~help`,
    `Bug Msg: Verter#5996`,
    `Add Aku Ya Teman2`
  ];
  let rstatus = Math.floor(Math.random() * status.length);
  bot.user.setActivity(status[rstatus], {Type: 'STREAMING', url: "https://www.twitch.tv/verterid"});        
}; setInterval(botStatus, 20000)
  setInterval(() => {
    dbl.postStats(bot.guilds.size)
  }, 1800000);
});

// Message event
bot.on("message", async message => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;
	if(message.author.bot) return undefined;
	if(message.channel.type === 'dm') return;
    
// Bot Mention Embed
  if(message.content.toLowerCase() === '<@460868992362610688>'){
    let embed = new Discord.RichEmbed()
    .setTitle("Juki 🌌")
    .addField("Prefix:", `\`${prefix}\``, true)
    .addField("Help:", `\`${prefix}help\``, true)
    .setThumbnail(bot.user.displayAvatarURL)
    .setColor(`${message.guild.me.displayHexColor!=='#6400d6' ? message.guild.me.displayHexColor : 0xffffff}`);
    message.channel.send(embed);
  };

	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;
  message.prefix = prefix;
  
	try {
	let commandFile = require(`./commands/${cmd}.js`);
	commandFile.run(bot, message, args);
    
	if(!commandFile) return message.channel.send("Juki Error: No Command found with that name.");
  
  console.log(`[${message.author.tag}]: Command: "${cmd}" [${message.guild.name}]`);
	} catch (err) {
    console.log(`Tritax AI Error: I found an Error while Loading my Commands!\n${err.stack}`);
  };   
});

// Member Join Event
	bot.on('guildMemberAdd', member => {   
    if(member.guild.id === "454711337138782219"){
	  const members = member.guild.memberCount;
	  const channel = member.guild.channels.find('name', 'Juki-log');
	  if (!channel) return;

    let Role = member.guild.roles.find(`name`, "Bots");
    if(member.user.bot){
	    member.addRole(Role.id)
    }else{
      let role = member.guild.roles.find(`name`, "Members");
	    member.addRole(role.id)
    };
 
	  let Embed = new Discord.RichEmbed()
	  .setFooter(`User Joined | ${member.guild.memberCount} Members`)
	  .setColor("#cde246")    
	  .setAuthor(`${member.displayName} has joined ${member.guild.name}`, member.user.displayAvatarURL)
	  .setTimestamp()
	  channel.send(Embed);
  }else{return; }
	});

// Member Leave Event
	bot.on('guildMemberRemove', member => {
    if(member.guild.id === "454711337138782219"){
	  const channel = member.guild.channels.find(`name`, 'Juki-log');
	  if(!channel) return; 
    
	  let Embed = new Discord.RichEmbed()
	  .setColor("#e26346")
	  .setAuthor(`${member.displayName}, has left ${member.guild.name}.`, member.user.displayAvatarURL)
	  .setTimestamp()
	  .setFooter(`User Left | ${member.guild.memberCount} Members`)
	  channel.send(Embed);
    }else{return; }
	});

// Guild Join event
	bot.on('guildCreate', guild => {
	  let channel = bot.channels.get("461580649296429100");
    
    const embed = new Discord.RichEmbed()
    .setColor("#cde246")
    .setAuthor(`Joined ${guild.name}`)
    .setThumbnail(guild.iconURL)
    .addField("Owner", guild.owner.user.tag)
    .addField("ID", guild.id, true)
    .addField("Users", guild.memberCount, true)
    .addField("Channels", guild.channels.size, true)
    channel.send(embed);
	});

// Guild Leave event
	bot.on('guildDelete', guild => {
	  let channel = bot.channels.get("461580649296429100");
    
    const embed = new Discord.RichEmbed()
    .setColor("#cde246")
    .setAuthor(`Left ${guild.name}`)
    .setThumbnail(guild.iconURL)
    .addField("Owner", guild.owner.user.tag)
    .addField("ID", guild.id, true)
    .addField("Users", guild.memberCount, true)
    .addField("Channels", guild.channels.size, true)
    channel.send(embed);
	});

bot.on('guildMemberAdd', async member => {
  let guild = member.guild;
  let autonick = JSON.parse(fs.readFileSync("./autonick.json", "utf8"));
  if(!autonick[member.guild.id]) return;
  
   var autonicksetting = JSON.parse(fs.readFileSync("./autonickonoff.json", "utf8"));
    if (!autonicksetting[member.guild.id]) {
     autonicksetting[member.guild.id] = {
      values: 1
      };
    }
  
    var values = autonicksetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
      let newNick = autonick[member.guild.id].nick
      newNick = newNick.replace('{username}', member.user.username)
      member.guild.members.get(`${member.user.id}`).setNickname(newNick)
    }
});

const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const { get } = require("snekfetch"); // This is to fetch the user avatar and convert it to a buffer.
const superagent = require('superagent');

bot.on("guildMemberAdd", async (member, client, message, args, level) => {  
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
              .addText("WELCOME", 625, 105)
              .addText(`${jadim}#${member.user.discriminator}`, 625, 145)
              .addRoundImage(avatar, 135, 10, 256, 256, 128)
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
  if (!welcome[member.guild.id]) {
    welcome[member.guild.id] = {
     welcome: 0
      };
    }
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
              if (!channel) return;
  
            channel.send(new Discord.Attachment(await createCanvas()));
});
bot.on("guildMemberRemove", async (member, client, message, args, level) => {  
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
              .addRoundImage(avatar, 135, 10, 256, 256, 128)
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
  if (!welcome[member.guild.id]) {
    welcome[member.guild.id] = {
     welcome: 0
      };
    }
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
              if (!channel) return;
  
            channel.send(new Discord.Attachment(await createCanvas()));
});

// Tritax AI Login:
	bot.login(process.env.TOKEN);