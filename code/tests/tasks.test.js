import test from 'node:test';
import assert from 'node:assert/strict';
import { tasks, pickTasks } from '../src/tasks.js';

test('expanded collection has unique IDs, unique text, and complete card data', () => {
  assert.ok(tasks.length >= 228);
  assert.equal(new Set(tasks.map(task => task.id)).size, tasks.length);
  assert.equal(new Set(tasks.map(task => task.text.toLowerCase().trim())).size, tasks.length);
  for (const task of tasks) {
    for (const field of ['id', 'text', 'category', 'duration', 'icon']) {
      assert.ok(typeof task[field] === 'string' && task[field].trim(), `${task.id}: missing ${field}`);
    }
  }
});

test('spins return three distinct tasks without immediately repeating suggestions', () => {
  let previous = [];
  let seed = 42;
  const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 2 ** 32);
  const seen = new Set();
  for (let i = 0; i < 1000; i++) {
    const result = pickTasks(previous, random);
    assert.equal(result.length, 3);
    assert.equal(new Set(result.map(task => task.id)).size, 3);
    assert.ok(result.every(task => !previous.includes(task.id)));
    result.forEach(task => seen.add(task.id));
    previous = result.map(task => task.id);
  }
  assert.equal(seen.size, tasks.length, 'Both original and added tasks are reachable');
});

test('green and blue spins respect company choice without immediate repeats', () => {
  for (const company of ['solo', 'together']) {
    assert.ok(tasks.filter(task => task.company === company).length >= 6);
    let previous = [];
    for (let i = 0; i < 50; i++) {
      const choices = pickTasks(previous, () => .42, company);
      assert.equal(choices.length, 3);
      assert.ok(choices.every(task => task.company === company && !previous.includes(task.id)));
      previous = choices.map(task => task.id);
    }
  }
});

test('Both always includes solo and shared tasks without repeats', () => {
  for (const random of [() => 0, () => .5, () => .99]) {
    let previous = [];
    for (let i = 0; i < 20; i++) {
      const selected = pickTasks(previous, random, 'both');
      assert.equal(selected.length, 3);
      assert.equal(new Set(selected.map(task => task.company)).size, 2);
      assert.equal(new Set(selected.map(task => task.id)).size, 3);
      assert.ok(selected.every(task => !previous.includes(task.id)));
      previous = selected.map(task => task.id);
    }
  }
});
