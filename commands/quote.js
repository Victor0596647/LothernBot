const { Message, Client, resolveColor, userMention, inlineCode } = require('discord.js');
import fetch from 'node-fetch';

async function getapi(url)
{
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

module.exports = {
    /**
    * @param {Message} message
    * @param {Client} client
    * @param {String[]} args
    */
    run: (client, message, args) => {
        const api_url = "https://zenquotes.io/api/random";
        if(args.length == 0)
        {
            getapi(api_url)
            .then(quote => {
                console.log(quote);
                const quoteEmbed = {
                    color: resolveColor('Random'),
                    title: `"${quote[0].q}"`,
                    description: `-${quote[0].a}`,
                    footer: {
                        text: `Inspirational quotes provided by ZenQuotes.io API`
                    }
                }
                message.channel.send({embeds: [quoteEmbed]});
            }).catch(reason => {
                message.channel.send("There was an error when requesting from ZenQuotes API, try again later.");
                console.error(reason);
            });
        } else if(args.length > 0){
            const quoteMessage = args.join(" ");
            if(quoteMessage.startsWith(`"`) && quoteMessage.lastIndexOf(`"`) != undefined)
            {
                const quote = quoteMessage.slice(quoteMessage.indexOf(`"`)+1, quoteMessage.lastIndexOf(`"`)).trim();
                var author = userMention(message.author.id);
                if(quoteMessage.includes(`-`, quoteMessage.lastIndexOf(`"`)))
                {
                    author = quoteMessage.slice(quoteMessage.indexOf(`-`)+1).trim();
                }
                const quoteEmbed = {
                    color: resolveColor('Random'),
                    title: `"${quote}"`,
                    description: `-${author}`
                }
                message.channel.send({embeds: [quoteEmbed]});
            }else {
                console.log(quoteMessage.slice(quoteMessage.indexOf(`"`)+1, quoteMessage.lastIndexOf(`"`)).trim());
            }
        }
    },
    cmd_title: "Quote",
    desc: `Get inspiring quotes from zenquotes.io. Alternatively, you can make your own quotes by using ${inlineCode(`q "quote here" - author name here`)} or just ${inlineCode(`q "quote here"`)} so it labels you as the author.`,
    cmd_alias: ["quote", "q"]
}