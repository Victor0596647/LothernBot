const { Message, Client, resolveColor, inlineCode } = require('discord.js');

async function getapi(url)
{
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const variables = ['on', 'of', 'select'];

module.exports = {
    /**
    * @param {Message} message
    * @param {Client} client
    * @param {String[]} args
    */
    run: (client, message, args) => {
        const api_url = "https://today.zenquotes.io/api";
        const maxFields = 6;
        const type = ['Events', 'Births', 'Deaths'];

        //Function
        /**
         * @param {Date} date
         */
        const getOnThisDay = async (date) =>
        {
            var dataEmbed = await getapi(`${api_url}/${date.getMonth()+1}/${date.getDate()}`)
            .then(dateInfo => {
                //console.log(dateInfo);
                const otdEmbed = {
                    color: resolveColor('Random'),
                    title: `On This Day ${dateInfo.date.split("_").join(" ")}`,
                    fields: [
                    ],
                    footer: {
                        text: `Historical event data provided by provided by ZenQuotes.io API/OnThisDay API`
                    }
                }

                for(const infoType of type)
                {
                    otdEmbed.fields.push({name: `${infoType}`, value: `\u200B`, inline: false});
                    for(let i = 0; i<maxFields; i++)
                    {
                        const data = dateInfo.data[`${infoType}`][`${i}`];
                        if(infoType !== 'Events')
                        {
                            var info = data.text.replace("&#8211;", "-");
                            //Checks if it has the '&#91;' keyword and replaces it with blank string
                            if(info.includes("&#91;"))
                            {
                                info = info.replace(info.substring(info.indexOf("&#91"), info.lastIndexOf("#93;")+4), "");
                            }
                            //Replaces keywords with markdown links to a wikipedia page
                            for(let l = 0; l<5; l++)
                            {
                                const link = data.links[`${l}`];
                                if(link != undefined) if(info.includes(link['2'])) info = info.replace(link['2'], `[${link['2']}](${link['1']})`);
                            }

                            otdEmbed.fields.push({name: `${i}`,
                            value: info, 
                            inline: true});
                        } else {
                            var info = data.text.replace("&#8211;", "-");
                            //Checks if it has the '&#91;' keyword and replaces it with blank string
                            if(info.includes("&#91;"))
                            {
                                info = info.replace(info.substring(info.indexOf("&#91"), info.lastIndexOf("#93;")+4), "");
                            }
                            //Replaces keywords with markdown links to a wikipedia page
                            for(let l = 0; l<5; l++)
                            {
                                const link = data.links[`${l}`];
                                if(link != undefined) if(info.includes(link['2'])) info = info.replace(link['2'], `[${link['2']}](${link['1']})`);
                            }

                            otdEmbed.fields.push({name: `${i}`,
                            value: info, 
                            inline: true});
                        }
                    }
                }
                return otdEmbed;
            }, reason => {
                throw reason;
            });
            return dataEmbed;
        }
        if(args.length == 0)
        {
            const curDate = new Date();
            message.channel.sendTyping().then( () => {
                getOnThisDay(curDate).then(data => {message.channel.send({embeds: [data]})}, reason => {message.channel.send("There was an error, try again later."); console.error(reason);});
            });
        } else if(args.length > 0) {
            if(args.includes(variables[2]) && !args.includes(variables[1])){
                message.reply("You need to specify the event type before using 'select'");
                return; 
            }
            if(args.includes(variables[2]) && args.includes(variables[1])){

            }
            if(args.includes(variables[0]))
            {
                //console.log(args.splice(args.indexOf(variables[0]), args.indexOf("]")));
            }
        }
    },
    cmd_title: "OnThisDay",
    desc: `Get information on notable/historical events, deaths, and births that happened on this day or a chosen date. To be specific, you can use ${inlineCode("otd on [month, day] of [typeOfEvent] select [infoIndex]")}, or this ${inlineCode("otd on [month, day] of [typeOfEvent]")}, or ${inlineCode("otd of [typeOfEvent] select [infoIndex]")}, or ${inlineCode("otd of [typeOfEvent]")}`,
    cmd_alias: ["onthisday", "otd"]
}