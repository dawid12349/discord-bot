require("dotenv").config();

const { Client, Webhook, WebhookClient } = require("discord.js");

const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const PREFIX = '$'

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
)

client.on("ready", () =>{
    console.log(`${client.user.tag} logged in`);
})


client.on('message', (message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args ]= message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
            
        switch(CMD_NAME){
            case 'kick':
                if(!message.member.hasPermission('KICK_MEMBERS'))
                    return message.reply("You don't have permission to do that");
                if(args.length === 0) return message.reply('Please provide an ID');
                    const member = message.guild.members.cache.get(args[0]);
                if(member){
                    member.kick()
                    .then((member)=>{
                        message.channel.send(`${member} was kicked`);
                    })
                    .catch((err)=>{
                        message.channel.send('I cannot kick that user');
                    })

                }else{
                    message.channel.send("that member was not found! ")
                }
                break;
            case 'announce':
                const msg = args.join(' ');
                webhookClient.send(msg);
                break;    
        }
    }
})


client.on('messageReactionAdd', (reaction, user)=>{
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
     if(reaction.message.id === '748967326468014272'){
        switch(name){
            case '🍎':
                member.roles.add('748969574330007722')
                break;
            case '🐍':
                member.roles.add("748969486107017396")
                break;
            case '🍇':
                member.roles.add("748969677547503706")
                break;
            case '🍑':
                member.roles.add("748969631422611607")
                break;            
        }
    }
})
client.on('messageReactionRemove', (reaction, user)=>{
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
     if(reaction.message.id === '748967326468014272'){
        switch(name){
            case '🍎':
                member.roles.remove('748969574330007722')
                break;
            case '🐍':
                member.roles.remove("748969486107017396")
                break;
            case '🍇':
                member.roles.remove("748969677547503706")
                break;
            case '🍑':
                member.roles.remove("748969631422611607")
                break;            
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)




