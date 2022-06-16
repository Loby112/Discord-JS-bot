require('dotenv').config();
const axios = require('axios').default;
const { Client, Intents } = require('discord.js');

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
    }

    
})

client.login(process.env.TOKEN)


async function Data(){
    const response = await axios.get("https://type.fit/api/quotes")
    const resData = await response.data
    return resData
}