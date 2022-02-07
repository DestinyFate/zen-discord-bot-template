import { SlashCommand } from "../typings";

const command:SlashCommand = {
  data: {
    name: 'ping',
    description: 'Pings Client'
  },
  execute(Client, interaction) {
    interaction.reply({
      content: 'Pong',
      ephemeral: true
    });
  }
}

export {
  command
}