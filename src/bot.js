require('dotenv').config();
const axios = require('axios').default;
const { Client, Intents, MessageReaction } = require('discord.js');
const { MessageEmbed } = require('discord.js')  

const client = new Client({
    partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER'],
    intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    
    
});
const PREFIX = "!"


client.on('ready', () => {
    console.log(`${client.user.username} has logged in`)
})

client.on('messageCreate', async (message) => {
    console.log(`${message.author.tag} has sent ${message.content}`)
    
    if(message.content.startsWith(PREFIX)){
        //CMD_NAME saves the name connected to the prefix, args becomes an array of all the words split by spaces afterwords
        const [CMD_NAME,...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        if(CMD_NAME === "quote"){
            const quotes = await Data("https://type.fit/api/quotes")
            let quote = quotes[Math.floor(Math.random() * quotes.length)]
            message.channel.send(`${quote['text']}\n` + `- ${quote['author']}`)
        }

        if(CMD_NAME === "meme"){
            //Function used to pick a random element from the array
            const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
            //Array used to store the images used in the meme command
            const images = [
                'https://i.redd.it/48ac82z924f71.jpg',
                'https://i.redd.it/ump6iep6ik591.jpg',
                'https://i.redd.it/r5lonjybim391.jpg'
            ]

            const embedImage = new MessageEmbed()
                .setDescription('meme')
                .setImage(random(images))
                .setTitle('Star Wars Memes')
            message.channel.send({ embeds: [embedImage] })

        }

    }
})

client.on('messageReactionAdd', (reaction, user) => {
    //Defining the name of the emoji
    const { name } = reaction.emoji
    //Remembers the member reacting, used for granting the role
    const member = reaction.message.guild.members.cache.get(user.id)
    if(reaction.message.id === '987316603832127518'){
        //Checking if the name matches one of the cases and adds role 
        switch(name){
            case '🟥':
                member.roles.add('987316022430269450')
                break;
            case '🟩':
                member.roles.add('987315963160588328')
                break;
            case '🟦':
                member.roles.add('987316049793921075')
                break;
        }
    }
})

client.login(process.env.TOKEN)


async function Data(url){
    const response = await axios.get(url)
    const resData = await response.data
    return resData
}