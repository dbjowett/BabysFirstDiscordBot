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
        
// Kicking a user ///////////////////////////////
        if(CMD_NAME === 'kick'){
            if (!message.member.hasPermission('KICK_MEMBERS')){
                return message.reply("You don't have permissions to do that");
            } 
// If no arguments are supplied
            if(args.length === 0) {
            return message.reply('Please provide a user ID');
        }
// Get the user from the args array
            const member = message.guild.members.cache.get(args[0]);
            
// Check if there is a member supplied
            if(member){
                member
                    .kick()
                    .then((member)=> message.channel.send(`${member} was kicked.`))
                    .catch((err)=> message.channel.send(`I can't kick that person :( `));
            } else {
                message.channel.send('That member was not found');
            }
        
// Banning a user //////////////////////////////
        } else if (CMD_NAME === 'ban'){
            if (!message.member.hasPermission('BAN_MEMBERS')){ 
                return message.reply("You don't have permissions to do that");
            }
            if(args.length === 0){
                return message.reply('Please provide a user ID');
            }
            message.guild.members.ban(arg[0])
                .catch((err)=>console.log(err))
        }
    }
});

client.on('messageDelete', (msg)=>{
    msg.reply("Why you delete message?");
});

client.login(process.env.DISCORDJS_BOT_TOKEN);