require('dotenv').config();
const axios = require('axios').default;
const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js')  

const client = new Client({
    intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const PREFIX = "!"

client.on('ready', () => {
    console.log(`${client.user.username} has logged in`)
})

client.on('messageCreate', async (message) => {
    console.log(`${message.author.tag} has sent ${message.content}`)
    
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME,...args] = message.content.split(PREFIX)
        if(args[0] === "quote"){
            const quotes = await Data()
            let quote = quotes[Math.floor(Math.random() * quotes.length)]
            message.channel.send(`${quote['text']}\n` + `- ${quote['author']}`)
        }

        if(args[0] === "meme"){
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

client.login(process.env.TOKEN)


async function Data(){
    const response = await axios.get("https://type.fit/api/quotes")
    const resData = await response.data
    return resData
}