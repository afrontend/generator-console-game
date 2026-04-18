#!/usr/bin/env node
'use strict';

const game = require('../app/templates/lib/index.js');

const ROWS = 15;
const COLS = 15;
const TICK_INTERVAL_MS = 200;
const MAX_TICKS = 250;

let state = game.init(ROWS, COLS);
let tickCount = 0;

const format = panel =>
  panel
    .map(row => row.map(item => (game.isBlankItem(item) ? ' ' : '■')).join(' '))
    .join('\n');

const findCenterColumn = panel => {
  const cols = [];
  panel.forEach(row => {
    row.forEach((item, colIdx) => {
      if (!game.isBlankItem(item)) cols.push(colIdx);
    });
  });
  if (cols.length === 0) return Math.floor(COLS / 2);
  return Math.round(cols.reduce((a, b) => a + b, 0) / cols.length);
};

const chooseKey = (state, tick) => {
  const meteoriteCol = findCenterColumn(state.meteoritePanel);
  const shuttleCol = findCenterColumn(state.shuttlePanel);

  // Fire every other tick
  if (tick % 2 === 0) return 'up';

  if (shuttleCol < meteoriteCol) return 'right';
  if (shuttleCol > meteoriteCol) return 'left';
  return 'up';
};

const render = state => {
  process.stdout.write('\x1B[2J\x1B[H');
  process.stdout.write(format(game.join(state)) + '\n');
};

render(state);

const timer = setInterval(() => {
  tickCount++;

  if (tickCount >= MAX_TICKS) {
    clearInterval(timer);
    process.exit(0);
  }

  const key = chooseKey(state, tickCount);
  state = game.key(key, state);
  state = game.tick(state);
  render(state);
}, TICK_INTERVAL_MS);
