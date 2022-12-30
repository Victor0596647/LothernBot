const { Events, Client, ActivityType } = require("discord.js");

/**
 * @param {Client} client 
 */
exports.run = (client) => {
    client.user.setPresence({ activities: [{ name: 'Just being a bot', type: ActivityType.Playing}], status: 'online' });
    console.log(`${client.user.tag} has AWAKEN!`);
}

exports.eventType = Events.ClientReady;