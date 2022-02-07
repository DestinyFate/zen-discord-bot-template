import { BitFieldResolvable, Client, Intents, IntentsString } from 'discord.js';
import eventHandler from './handlers/eventHandler';
import slashCommandHandler from './handlers/slashCommandHandler';
import { config } from 'dotenv';

config({
  path: '.env'
});

const { HOME_GUILD_ID:guildId, DISCORD_CLIENT_ID:clientId } = process.env;
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

eventHandler(client, __dirname);
slashCommandHandler(client, __dirname, clientId, guildId);