const fs = require("fs");
const { Message, Client, EmbedBuilder, Colors, resolveColor } = require("discord.js");

module.exports = {
    /**
    * @param {Message} message
    * @param {Client} client
    * @param {String[]} args
    */
    run: (client, message, args) => {
        //Embeds

        if(args.length == 1)
        {
            const singleHelpEmbed = {
                color: resolveColor([127,127,127]),
                title: ``,
                fields: [
                ]
            }

            const cmd = client.commandCol.get(args[0]);
            if(!cmd) return message.reply(`Unknown Command: '${args[0]}'`);

            singleHelpEmbed.title = `${cmd.cmd_title} Command`;
            singleHelpEmbed.description = `${cmd.desc}`;
            singleHelpEmbed.fields.push({name:`Alias`, value:`${cmd.cmd_alias.join(", ")}`, inline: false});

            message.channel.send({embeds: [singleHelpEmbed]});
        } else if (args.length == 0) {
            const helpEmbed = {
                color: resolveColor([127,127,127]),
                title: "Commands",
                fields: [
                ]
            }
            const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
            for(const commandfile of commands)
            {
                const command = require(`./${commandfile}`);
                helpEmbed.fields.push({name:`${command.cmd_title}`, value:`${command.desc}`, inline: true});
            }
            message.channel.send({embeds: [helpEmbed]});
        }
    },
    cmd_title: "Help",
    desc: "Displays a list of available commands.",
    cmd_alias: ["help", "h", "", "commands"]
}