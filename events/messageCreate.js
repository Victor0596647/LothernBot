const { Message, Client, Events } = require("discord.js");

/**
 * @param {Client} client 
 * @param {Message} message
 */
exports.run = (client, message) => {
    if(message.author.bot) return; // Leave if it is a bot

    if(!message.content.startsWith(client.prefix, 0)) return;

    const args = message.content.slice(client.prefix.length).trim().split(' ');
    const commands = args.shift().toLowerCase();

    console.info(`Command '${commands}' requested by user ${message.author.username} with args ${args}`);
    try {
        const cmd = client.commandCol.get(commands);
        if(!cmd) return message.reply(`Unknown Command: '${commands}'`);
        cmd.run(client, message, args);
    } catch (error) {
        console.error(error);
    }
}

exports.eventType = Events.MessageCreate;