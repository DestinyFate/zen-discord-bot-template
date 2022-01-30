import { Client } from "discord.js";
import { readdirSync } from "fs";
import { DiscordEvent } from "../typings";

export default async function(DiscordClient:Client, path:string):Promise<void> {
  const eventFileNames = readdirSync(path)
    .filter(fileName => fileName.endsWith('.ts'));
  for (const fileName of eventFileNames) {
    const filePath = `${path}\\${fileName}`;
    const file = await import(filePath);
    const event = file.event as DiscordEvent;

    if (event.once) {
      DiscordClient.once(event.name, (...args) => event.execute(DiscordClient, args));
    } else {
      DiscordClient.on(event.name, (...args) => event.execute(DiscordClient, args));
    }  
  }
};