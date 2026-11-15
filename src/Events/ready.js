module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Bot connecté : ${client.user.tag}`);
  }
};
