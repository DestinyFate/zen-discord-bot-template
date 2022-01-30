import { 
  ApplicationCommandData, 
  Client, 
  ClientEvents, 
  CommandInteraction 
} from 'discord.js';

export interface SlashCommand {
  data: ApplicationCommandData;
  execute(DiscordClient:Client, interaction:CommandInteraction): void;
}

export interface DiscordEvent {
  name: keyof ClientEvents;
  once: boolean;
  execute(DiscordClient:Client, ...args:unknown[]): void;
}
