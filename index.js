const fs = require(`fs`);
const {Client, Events, GatewayIntentBits, Collection} = require('discord.js');
const { env } = require(`./env.json`);
const { bot } = require(`./config.json`);

//Client Initialization
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessageReactions]
});
client.token = env.bot.token;
client.prefix = bot.prefix;

client.commandCol = new Collection();

//Command Handling
{
    const commands = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

    for(const file of commands)
    {
        const command = require(`./commands/${file}`);
        console.log(`Attempting to load commands from '${command.cmd_title}'`);
        for(const alias of command.cmd_alias)
        {
            client.commandCol.set(alias, command);
        }
    }
}

//Event Handling
{
    const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

    for (const file of events) {
        const event = require(`./events/${file}`);
        client.on(event.eventType, event.run.bind(null, client));
    }
}

client.login(client.token); //Logs the bot in