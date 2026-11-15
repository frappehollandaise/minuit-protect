const { Client, Collection, EmbedBuilder } = require("discord.js");
const client = new Client({ intents: 3276799 });
const {QuickDB} = require("quick.db");
const db = new QuickDB();
module.exports = db;

client.commands = new Collection();
client.config = {
  token: process.env.TOKEN,
  owners: [process.env.OWNER_ID]
};

(async () => { 
  client.prefix = await db.get("prefix") || "&";
  client.color = await db.get("color") || "#df1111"; 
  client.template = new EmbedBuilder().setColor(client.color);
})();

require('./src/Structure/Handler/Events')(client);
require('./src/Structure/Handler/Commands')(client);

client.login(client.config.token);

client.on("messageCreate", async (message) => {
  if (message.content == ";emit memberJoin") {
        const member = message.member;
        client.emit("guildMemberAdd", member);
    }
})


process.on('unhandledRejection', (reason, promise) => {
  console.error(promise, reason);
});

process.on("uncaughtException", (err, origin) => {
  console.error(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.error(err, origin);
}); 