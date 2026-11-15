const fs = require('fs');
const path = require('path');
module.exports = (client) => {
  const cmdsPath = path.join(__dirname, '../../Commands');
  if (!fs.existsSync(cmdsPath)) return;
  fs.readdirSync(cmdsPath).forEach(folder => {
    fs.readdirSync(path.join(cmdsPath, folder)).filter(f => f.endsWith('.js')).forEach(file => {
      const cmd = require(path.join(cmdsPath, folder, file));
      if (cmd.name) client.commands.set(cmd.name, cmd);
    });
  });
};
