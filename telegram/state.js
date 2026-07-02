const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const TELEGRAM_DIR = __dirname;
const FILES = Object.freeze({
  inbox: path.join(TELEGRAM_DIR, 'telegram_inbox.json'),
  approvals: path.join(TELEGRAM_DIR, 'telegram_approvals.json'),
  history: path.join(TELEGRAM_DIR, 'telegram_history.json'),
});

function nowIso(date = new Date()) {
  return date.toISOString();
}

function ensureStateFiles() {
  for (const filePath of Object.values(FILES)) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]\n', 'utf8');
    }
  }
}

function readJsonArray(filePath) {
  ensureStateFiles();
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeJsonArray(filePath, items) {
  fs.writeFileSync(filePath, `${JSON.stringify(items, null, 2)}\n`, 'utf8');
}

function readInbox() {
  return readJsonArray(FILES.inbox);
}

function readApprovals() {
  return readJsonArray(FILES.approvals);
}

function readHistory() {
  return readJsonArray(FILES.history);
}

function writeInbox(items) {
  writeJsonArray(FILES.inbox, items);
}

function writeApprovals(items) {
  writeJsonArray(FILES.approvals, items);
}

function writeHistory(items) {
  writeJsonArray(FILES.history, items);
}

function createInboxItem({ text, user_id = null, chat_id = null, message_id = null }, options = {}) {
  const cleanText = String(text || '').trim();
  if (!cleanText) {
    throw new Error('Hermes inbox item needs text');
  }

  return {
    id: options.id || crypto.randomUUID(),
    text: cleanText,
    user_id,
    chat_id,
    message_id,
    status: 'inlet',
    created_at: options.created_at || nowIso(options.date),
    updated_at: options.updated_at || nowIso(options.date),
  };
}

function addInboxItem(input, options = {}) {
  const item = createInboxItem(input, options);
  const inbox = readInbox();
  inbox.unshift(item);
  writeInbox(inbox);
  return item;
}

function moveInboxItemToApprovals(id, patch = {}) {
  const inbox = readInbox();
  const index = inbox.findIndex(item => item.id === id);
  if (index === -1) return null;

  const [item] = inbox.splice(index, 1);
  const approval = {
    ...item,
    ...patch,
    status: 'gate',
    updated_at: nowIso(),
  };

  const approvals = readApprovals();
  approvals.unshift(approval);
  writeInbox(inbox);
  writeApprovals(approvals);
  return approval;
}

function completeApproval(id, action, patch = {}) {
  const approvals = readApprovals();
  const index = approvals.findIndex(item => item.id === id);
  if (index === -1) return null;

  const [item] = approvals.splice(index, 1);
  const historyItem = {
    ...item,
    ...patch,
    status: action,
    completed_at: nowIso(),
    updated_at: nowIso(),
  };

  const history = readHistory();
  history.unshift(historyItem);
  writeApprovals(approvals);
  writeHistory(history);
  return historyItem;
}

function getFloorItems() {
  return [...readApprovals(), ...readInbox()];
}

module.exports = {
  FILES,
  addInboxItem,
  completeApproval,
  createInboxItem,
  ensureStateFiles,
  getFloorItems,
  moveInboxItemToApprovals,
  readApprovals,
  readHistory,
  readInbox,
  writeApprovals,
  writeHistory,
  writeInbox,
};
