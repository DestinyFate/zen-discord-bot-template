import { BitFieldResolvable, Client, Intents, IntentsString } from 'discord.js';
import eventHandler from './handlers/eventHandler';
import slashCommandHandler from './handlers/slashCommandHandler';
import { config } from 'dotenv';

config({
  path: '.env'
});

const { 
  HOME_GUILD_ID:guildId,
  DISCORD_CLIENT_ID:clientId ,
  DISCORD_CLIENT_TOKEN:token
} = process.env;

const { FLAGS } = Intents;

const intents: BitFieldResolvable<IntentsString, number> = 
  [
    FLAGS.GUILD_MEMBERS,
    FLAGS.GUILD_MESSAGES,
    FLAGS.GUILDS
  ];

const client = new Client({
  intents
});

(async() => {
  try {
    await eventHandler(client, __dirname);
    await client.login(token);
    await slashCommandHandler(client, __dirname, clientId, guildId);  
  } catch (err) {
    throw err;
  }
})();