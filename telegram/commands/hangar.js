// telegram/commands/hangar.js
// /hangar — search archived/history entries from telegram state.

const { readHistory } = require('../state');

async function handleHangar(ctx) {
  const query = ctx.message.text.replace(/^\/hangar\s*/, '').trim().toLowerCase();
  const history = readHistory();

  if (!query) {
    const recent = history.slice(-10).reverse();
    if (recent.length === 0) {
      await ctx.reply('🛫 Hangar is empty — nothing archived yet.');
      return;
    }
    const lines = recent.map((entry, i) => {
      const time = new Date(entry.created_at).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${i + 1}. ${entry.text}\n   _${time}_`;
    });
    await ctx.reply(`🛫 **Hangar — last ${recent.length} entries:**\n\n${lines.join('\n\n')}`, {
      parse_mode: 'Markdown'
    });
    return;
  }

  const matches = history.filter((entry) => entry.text.toLowerCase().includes(query));
  if (matches.length === 0) {
    await ctx.reply(`🛫 No matches for "${query}" in hangar history.`);
    return;
  }

  const lines = matches.slice(-5).reverse().map((entry, i) => {
    const time = new Date(entry.created_at).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${i + 1}. ${entry.text}\n   _${time}_`;
  });
  await ctx.reply(`🛫 **Hangar — ${matches.length} match(es), showing last 5:**\n\n${lines.join('\n\n')}`, {
    parse_mode: 'Markdown'
  });
}

module.exports = { handleHangar };
