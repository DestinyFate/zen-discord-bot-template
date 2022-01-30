import { BitFieldResolvable, Client, Intents, IntentsString } from 'discord.js';
import eventHandler from './handlers/eventHandler';
import slashCommandHandler from './handlers/slashCommandHandler';

const config = {
  clientId: '',
  mainGuildId: ''
}

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
slashCommandHandler(client, __dirname, config.clientId, config.mainGuildId);