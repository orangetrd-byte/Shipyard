const crypto = require('node:crypto');

const SHIPYARD_LOCAL_STORAGE_KEY = 'shipyard.local.v1';

const EMPTY_SHIPYARD_STATE = Object.freeze({
  tasks: [],
  memory: [],
  events: [],
});

function cloneEmptyState() {
  return {
    tasks: [],
    memory: [],
    events: [],
  };
}

function nowStamp(date = new Date()) {
  return date.toLocaleString([], {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function normalizeShipyardState(value) {
  const state = value && typeof value === 'object' ? value : cloneEmptyState();
  return {
    tasks: Array.isArray(state.tasks) ? state.tasks : [],
    memory: Array.isArray(state.memory) ? state.memory : [],
    events: Array.isArray(state.events) ? state.events : [],
  };
}

function parseShipyardLocalStorage(rawValue) {
  if (!rawValue) return cloneEmptyState();
  try {
    return normalizeShipyardState(JSON.parse(rawValue));
  } catch {
    return cloneEmptyState();
  }
}

function serializeShipyardLocalStorage(state) {
  return JSON.stringify(normalizeShipyardState(state));
}

function makeTaskFromTelegram(input, options = {}) {
  const title = String(input?.title || input?.text || '').trim();
  const note = String(input?.note || input?.text || '').trim();
  const created = options.created || nowStamp(options.date);

  if (!title && !note) {
    throw new Error('Telegram task needs title or text');
  }

  return {
    id: options.id || crypto.randomUUID(),
    title: title || note.slice(0, 42),
    note,
    type: input?.type || 'feature',
    priority: input?.priority || 'should',
    status: input?.status || 'inlet',
    created,
    diff: 'Captured by Hermes. Send to Codi when ready.',
    source: 'telegram',
    telegram: {
      user_id: input?.user_id || null,
      message_id: input?.message_id || null,
      chat_id: input?.chat_id || null,
    },
  };
}

function addTelegramTaskToShipyardState(state, input, options = {}) {
  const nextState = normalizeShipyardState(state);
  const task = makeTaskFromTelegram(input, options);
  nextState.tasks.unshift(task);
  nextState.events.unshift({
    at: task.created,
    text: `Hermes captured: ${task.title}`,
  });
  nextState.events = nextState.events.slice(0, 80);
  return { state: nextState, task };
}

function makeBrowserImportSnippet(serializedState) {
  return `localStorage.setItem(${JSON.stringify(SHIPYARD_LOCAL_STORAGE_KEY)}, ${JSON.stringify(serializedState)}); location.reload();`;
}

module.exports = {
  SHIPYARD_LOCAL_STORAGE_KEY,
  EMPTY_SHIPYARD_STATE,
  addTelegramTaskToShipyardState,
  makeBrowserImportSnippet,
  makeTaskFromTelegram,
  normalizeShipyardState,
  parseShipyardLocalStorage,
  serializeShipyardLocalStorage,
};
