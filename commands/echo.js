const {Client, Message} = require('discord.js');
module.exports = {
    /**
    * @param {Message} message
    * @param {Client} client
    * @param {String[]} args
    */
    run: (client, message, args) => {
        const echo = args.splice(0).join(" ");
        message.channel.send(echo);
    },
    cmd_title: "Echo",
    desc: "Echos out the same message.",
    cmd_alias: ["echo", "say"]
}