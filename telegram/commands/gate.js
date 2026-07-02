const {
  completeApproval,
  moveInboxItemToApprovals,
  readApprovals,
  readInbox,
} = require('../state');

const ACTIONS = Object.freeze({
  ship: 'shipped',
  tweak: 'tweak',
  review: 'gate',
  scrap: 'scrapped',
});

function parseGateCallback(callbackData = '') {
  const [scope, action, id] = String(callbackData || '').split(':');
  if (scope !== 'gate' || !ACTIONS[action] || !id) {
    return null;
  }
  return { action, id };
}

function findPendingItem(id) {
  return readInbox().find(item => item.id === id) || readApprovals().find(item => item.id === id) || null;
}

function makeGateReply(action, item) {
  const title = item?.text || item?.title || 'item';
  if (action === 'ship') return `Shipyard marked this ready: ${title}`;
  if (action === 'tweak') return `Shipyard moved this to Gate for changes: ${title}`;
  if (action === 'review') return `Shipyard promoted to Gate for review: ${title}`;
  return `Shipyard scrapped this: ${title}`;
}

function completeFromInbox(id, action) {
  const approval = moveInboxItemToApprovals(id, { gate_action: action });
  if (!approval) return null;
  if (action === 'tweak') return approval;
  if (action === 'review') return approval;
  return completeApproval(id, ACTIONS[action], { gate_action: action });
}

function handleGateCallback(callbackQuery = {}) {
  const parsed = parseGateCallback(callbackQuery.data);
  if (!parsed) {
    return {
      ok: false,
      text: 'Gate action was not understood.',
    };
  }

  const pending = findPendingItem(parsed.id);
  if (!pending) {
    return {
      ok: false,
      text: 'That Shipyard item is no longer waiting.',
    };
  }

  const completed = parsed.action === 'tweak'
    ? moveInboxItemToApprovals(parsed.id, { gate_action: parsed.action }) || pending
    : completeApproval(parsed.id, ACTIONS[parsed.action], { gate_action: parsed.action }) || completeFromInbox(parsed.id, parsed.action);

  if (!completed) {
    return {
      ok: false,
      text: 'Gate could not update that Shipyard item.',
    };
  }

  return {
    ok: true,
    item: completed,
    action: parsed.action,
    text: makeGateReply(parsed.action, completed),
  };
}

module.exports = {
  ACTIONS,
  handleGateCallback,
  makeGateReply,
  parseGateCallback,
};
