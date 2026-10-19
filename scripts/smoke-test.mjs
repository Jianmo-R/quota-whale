import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
let captured;
const context = {
  window: {
    __ModuleLoader__: {
      load(definition) {
        captured = definition;
      },
    },
  },
  console,
};
vm.createContext(context);
vm.runInContext(source, context);

assert.ok(captured, 'client.js must call window.__ModuleLoader__.load');
assert.equal(captured.id, '@local/quota-whale');

const React = {
  Fragment: 'Fragment',
  createElement() { return {}; },
  useState(value) { return [value, () => {}]; },
  useRef(value) { return { current: value }; },
  useCallback(fn) { return fn; },
  useEffect() {},
  useMemo(fn) { return fn(); },
};

const plugin = captured.factory((id) => {
  assert.equal(id, 'react');
  return React;
});

assert.equal(typeof plugin.apply, 'function');
assert.equal(Array.from(plugin.inject).join(','), 'slots,remote,remote.account,locale');

let registered;
const effects = [];
plugin.apply({
  effect(callback) { return callback() || (() => {}); },
  locale: {
    register() { return () => {}; },
    bind() { return (key) => key; },
    subscribe() { return () => {}; },
    getSnapshot() { return { active: 'zh-CN' }; },
  },
  remote: { account: {} },
  slots: {
    inject(key, callback) { callback(); },
    register(options, component) {
      registered = { options, component };
      return () => {};
    },
  },
});

assert.ok(registered, 'plugin must register a slot entry');
assert.equal(registered.options.name, 'shell.overlay');
assert.equal(registered.options.id, 'quota-whale');
assert.equal(typeof registered.component, 'function');

console.log('quota-whale smoke test passed');
