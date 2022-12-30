const { Message, Client} = require("discord.js");

module.exports = {
    /**
    * @param {Message} message
    * @param {Client} client
    * @param {String[]} args
    */
    run: (client, message, args) => {
        if(args.length == 1){
            if(args[0].includes("<@")) {
                const userID = args[0].replace("<@", "").replace(">", "");
                message.guild.members.fetch(`${userID}`).then(
                    user => {message.channel.send(user.user.avatarURL())}
                ).catch(() => message.channel.send(`'${args[0]}' is not a user mention or user ID`));
            } else {
                const userID = args[0];
                message.guild.members.fetch(`${userID}`).then(
                    user => {message.channel.send(user.user.avatarURL())}
                , message.channel.send(`'${args[0]}' is not a user`));
            }
        }else if(args.length == 0) {
            message.channel.send(message.author.avatarURL());
        }
    },
    cmd_title: "Pfp",
    desc: "Sends back the profile of the given user.",
    cmd_alias: ["pfp", "userpfp", "pfpic"] 
}