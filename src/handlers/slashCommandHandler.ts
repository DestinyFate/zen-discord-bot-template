import { readdirSync } from "fs";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, ClientUser, Snowflake } from "discord.js";
import { SlashCommand } from "../typings";


export default async function slashCommandHandler(DiscordClient:Client, path:string, mainGuildId:Snowflake, token:string):Promise<void> {
  const { id } = DiscordClient.user as ClientUser;
  const rest = new REST({ version: '9' })
    .setToken(token);
  const commands: any[] = [];
  const slashCommandFileNames = readdirSync(path)
    .filter(fileName => fileName.endsWith('.ts'));

  for (const fileName of slashCommandFileNames) {
    const filePath = `${path}\\${fileName}`;
    const file = await import(filePath);
    const command = file.command as SlashCommand;

    commands.push(command.data);
    global.slashCommands.set(command.data.name, command);
  }

  const { length:commandCount } = commands;

  async function pushSlashCommands() {
    try {
      await rest.put(
        Routes.applicationGuildCommands(id, mainGuildId),
        { body: commands }
      );

      console.log(`Reloaded ${commandCount} slash commands to Home Guild`);

      await rest.put(
        Routes.applicationCommands(id),
        { body: commands }
      );

      console.log(`Pushed ${commandCount} slash commands to Global`)
    } catch (err) {
      if (DiscordClient.isReady()) DiscordClient.destroy();
      throw err;
    }
  }

  pushSlashCommands();
};