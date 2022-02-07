import { Interaction } from "discord.js";
import { DiscordEvent } from "../typings";

const event:DiscordEvent = {
  name: 'ready',
  once: false,
  execute(Client) {
    console.log('Client is ready');
  }
};

export {
  event
};