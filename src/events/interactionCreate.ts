import { Interaction } from "discord.js";
import { DiscordEvent } from "../typings";

const event: DiscordEvent = {
  name: 'interactionCreate',
  once: false,
  execute(DiscordClient, interaction:Interaction) {
    if (interaction.isCommand()) {
      const command = global.commands.get(interaction.commandName);

      if (command) {
        try {
          command.execute(DiscordClient, interaction);
        } catch (err) {
          console.error(err);
        }
      } else {
        interaction.reply({
          content: `Command "${interaction.commandName}" not found`,
          ephemeral: true
        })
      }
    }
  }
};

export {
  event
};