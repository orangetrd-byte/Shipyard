// telegram/commands/inlet.js
// /inlet handler — captures loose task text into telegram_inbox.json
// Returns inline buttons: Ship It, Tweak, Scrap

const { addInboxItem } = require('../state');

function buildInlineKeyboard(entry_id) {
  return {
    inline_keyboard: [
      [
        { text: '✅ Ship It', callback_data: `gate:ship:${entry_id}` },
        { text: '✏️ Tweak', callback_data: `gate:tweak:${entry_id}` },
        { text: '🗑️ Scrap', callback_data: `gate:scrap:${entry_id}` }
      ]
    ]
  };
}

async function handleInlet(ctx) {
  const text = ctx.message.text.replace(/^\/inlet\s*/, '').trim();
  if (!text) {
    await ctx.reply('Usage: /inlet <task text>');
    return;
  }

  const entry = addInboxItem({
    text,
    user_id: ctx.message.from?.id || null,
    chat_id: ctx.message.chat?.id || null,
    message_id: ctx.message.message_id || null,
  });

  await ctx.reply(
    `📥 **Inlet received:**\n\n${entry.text}\n\n_Logged at ${new Date(entry.created_at).toLocaleString()}_`,
    { parse_mode: 'Markdown', reply_markup: buildInlineKeyboard(entry.id) }
  );
}

module.exports = { handleInlet };
