const Command = require("../../structures/Command");
const userData = require('/home/vboxuser/Pogy-1/src/data/users.json');
const fs = require('fs');

module.exports = class BackgroundCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "setbackground",
      description: "Set your preferred background.",
      category: "Configuration",
      cooldown: 3,
      usage: "<background URL>",
      guildOnly: true
    });
  }

  run(message, args) {
    const backgroundURL = args[0];
    if (!backgroundURL) {
      return message.reply("Please provide a background URL.");
    }

    const userId = message.author.id;
    userData.users[userId].background = backgroundURL;

    // Save updated data back to the JSON file
    fs.writeFile('/home/vboxuser/Pogy-1/src/data/users.json', JSON.stringify(userData, null, 2), err => {
      if (err) {
        console.error('Error writing file:', err);
        return message.reply('An error occurred while saving the background preference.');
      }
      message.reply('Background preference saved successfully!');
    });
  }
};
