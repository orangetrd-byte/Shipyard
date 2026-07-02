// telegram/commands/floor.js
// /floor — list active jobs from telegram state.

const { getFloorItems } = require('../state');

async function handleFloor(ctx) {
  const pending = getFloorItems();

  if (pending.length === 0) {
    await ctx.reply('🏭 Floor is clear — no active jobs.');
    return;
  }

  const lines = pending.map((entry, i) => {
    const time = new Date(entry.created_at).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${i + 1}. ${entry.text}\n   _${entry.status} · ${time}_`;
  });

  await ctx.reply(`🏭 **Floor — ${pending.length} active:**\n\n${lines.join('\n\n')}`, {
    parse_mode: 'Markdown'
  });
}

module.exports = { handleFloor };
