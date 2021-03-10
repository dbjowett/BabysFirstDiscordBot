const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = "#";

//
require('dotenv').config();

//Client logged in message
client.on("ready", ()=>{
    console.log(`
    Logged in as ${client.user.username}!
    `);
});

client.on("message", (message)=>{
    
    if(message.author.bot) return; 
    if(message.content.startsWith(PREFIX) === true){
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        
        if(CMD_NAME === 'kick'){
            //If no arguments are supplied
            if(args.length === 0) return message.reply('Please provide a user ID');
            
            //Get the user from the args array
            const member = message.guild.members.cache.get(args[0]);
            if(member){
                member
                    .kick()
                    .then((member)=> message.channel.send(`${member} was kicked.`))
                    .catch((err)=> message.channel.send(`I can't kick that person :( `));
            } else {
                message.channel.send('That member was not found');
            }
        }
    }
});

client.on('messageDelete', (msg)=>{
    msg.reply("Why you delete message?");
});

client.login(process.env.DISCORDJS_BOT_TOKEN);