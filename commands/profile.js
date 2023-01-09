const {Client, Message, resolveColor, EmbedBuilder, userMention, inlineCode} = require('discord.js');
//Work in Progress
module.exports = {
    /**
    * @param {Message} message
    * @param {Client} client
    * @param {String[]} args
    **/
   run: (client, message, args) => {
        const profileEmbed = new EmbedBuilder()
        .setColor(resolveColor('Random'));
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
                    , message.channel.send(`'${args[0]}' is not a user`)
                );
            }
        }else if(args.length == 0) {
            const user = message.author;

            profileEmbed
            .setTitle(`${user.username}'s Profile`)

            message.channel.send({embeds: profileEmbed});
        }
    },
    cmd_title: "Profile",
    desc: "Sends the profile of a discord user",
    cmd_alias: ["profile", "pf"]
}