const { Message, Client} = require("discord.js");

module.exports = {
    /**
    * @param {Message} message
    * @param {Client} client
    * @param {String[]} args
    */
    run: (client, message, args) => {

    },
    cmd_title: "Poll",
    desc: "Creates a poll and also has a timer option then the results are sent.",
    cmd_alias: ["poll"] 
}