
'use strict';

const KEY = 'gator-adventures-level1-v1';

const scenes = {
  start: {
    title: 'The Lantern at Blackwater Crossing',
    text: 'Mist curls across the water. The village lantern has gone dark, and travelers are stranded on the far bank. A frightened marsh keeper asks for help. Your first adventure begins with a choice.',
    choices: [
      ['Ask the keeper what happened', 'listen'],
      ['Examine the lantern mechanism', 'inspect'],
      ['Scout the shoreline', 'scout']
    ]
  },
  listen: {
    title: 'A Keeper’s Warning',
    text: 'The keeper explains that the lantern went out when the bridge bell rang. Something has disturbed the marsh creatures. You gain a clue by listening.',
    effect: {clue: 1},
    choices: [
      ['Approach the broken lantern', 'lantern'],
      ['Search for a safe path', 'path']
    ]
  },
  inspect: {
    title: 'The Broken Lantern',
    text: 'The glass is intact, but the focusing crystal has slipped from its housing. Someone could fix this with patience and care.',
    effect: {clue: 1},
    choices: [
      ['Try to repair the lantern', 'repair'],
      ['Look for another route', 'path']
    ]
  },
  scout: {
    title: 'Tracks in the Mud',
    text: 'You find fresh tracks leading to the lantern. They belong to a small marsh creature, not a monster. The mud is deep; the trip costs a little energy.',
    effect: {hp: -1, clue: 1},
    choices: [
      ['Follow the tracks', 'creature'],
      ['Return to the lantern', 'lantern']
    ]
  },
  lantern: {
    title: 'A Light Without a Flame',
    text: 'The lantern needs its crystal seated and its shutter cleared. You can solve the problem directly or find out why it failed.',
    choices: [
      ['Use your hero’s strengths to repair it', 'repair'],
      ['Follow the tracks nearby', 'creature']
    ]
  },
  path: {
    title: 'The Reed Walk',
    text: 'A narrow walkway winds between the reeds. A loose plank blocks the way. Crossing carefully requires teamwork, cleverness, or courage.',
    choices: [
      ['Secure the plank and help others cross', 'bridge'],
      ['Return to the lantern', 'lantern']
    ]
  },
  creature: {
    title: 'The Marshling',
    text: 'A small marshling is tangled in old rope. It knocked the crystal loose while trying to escape. It watches you nervously.',
    choices: [
      ['Free the marshling gently', 'mercy'],
      ['Retrieve the crystal first', 'retrieve']
    ]
  },
  mercy: {
    title: 'An Unexpected Ally',
    text: 'You free the marshling. In gratitude, it shows you where the missing crystal rolled. Kindness has changed the outcome.',
    effect: {ally: 1},
    choices: [['Carry the crystal back', 'repair']]
  },
  retrieve: {
    title: 'The Missing Crystal',
    text: 'You recover the crystal, but the marshling remains trapped. The keeper will remember how you treated a creature in need.',
    effect: {clue: 1},
    choices: [
      ['Go back and help the marshling', 'mercy'],
      ['Repair the lantern now', 'repair']
    ]
  },
  bridge: {
    title: 'A Safe Crossing',
    text: 'You secure the plank and guide the stranded travelers across. The village is safe tonight, though the lantern still needs attention.',
    effect: {ally: 1},
    choices: [['Return to finish the lantern', 'repair']]
  },
  repair: {
    title: 'The First Test',
    text: 'The shutter is jammed and the crystal must be aligned. Choose how your hero handles the challenge.',
    choices: [
      ['Apply careful reasoning', 'reason'],
      ['Use a steady hand and practical skill', 'skill'],
      ['Ask the keeper and travelers to work together', 'team']
    ]
  },
  reason: {
    title: 'A Thoughtful Solution',
    text: 'You study the mechanism and align the crystal with the moonlight. The beam begins to glow.',
    effect: {clue: 1},
    choices: [['Light the crossing', 'finish']]
  },
  skill: {
    title: 'A Steady Hand',
    text: 'You clear the shutter and lock the crystal into place. The lantern hums back to life.',
    choices: [['Light the crossing', 'finish']]
  },
  team: {
    title: 'Strength in Numbers',
    text: 'You coordinate the keeper and travelers. Together, you lift the lantern housing and set the crystal.',
    effect: {ally: 1},
    choices: [['Light the crossing', 'finish']]
  },
  finish: {
    title: 'Quest Complete: Beacon of the Marsh',
    text: 'Golden light cuts through the mist. Travelers cheer as Blackwater Crossing becomes safe again. Your choices shaped the village’s first memory of you. This is the beginning of your legend.',
    end: true
  }
};

let state;
const game = document.querySelector('#game');

function fresh() {
  return {
    scene: 'start',
    hp: 5,
    clue: 0,
    ally: 0,
    visited: [],
    name: '',
    heroClass: '',
    completed: false
  };
}

function safe(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    return v && scenes[v.scene] && Array.isArray(v.visited)
      ? {...fresh(), ...v}
      : fresh();
  } catch {
    return fresh();
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

function move(next) {
  if (!scenes[next]) return;

  state.scene = next;

  if (!state.visited.includes(next)) {
    state.visited.push(next);
    const e = scenes[next].effect || {};
    state.hp = Math.max(0, state.hp + (e.hp || 0));
    state.clue += e.clue || 0;
    state.ally += e.ally || 0;
  }

  if (next === 'finish') state.completed = true;

  save();
  render();
}

function render() {
  const s = scenes[state.scene];

  game.innerHTML = `
    <header>
      <h1>🐊 Gator Adventures</h1>
      <button id="reset">New Adventure</button>
    </header>

    <div class="stats">
      <span class="stat">❤️ Energy ${state.hp}/5</span>
      <span class="stat">🔎 Clues ${state.clue}</span>
      <span class="stat">🤝 Allies ${state.ally}</span>
    </div>

    <section class="card">
      <div class="eyebrow">Level 1 · Blackwater Crossing</div>
      <h2>${safe(s.title)}</h2>
      <p>${safe(s.text)}</p>

      ${state.scene === 'start' ? `
        <p>
          <label>Hero name
            <input id="heroName" maxlength="40"
              value="${safe(state.name)}"
              placeholder="Your hero">
          </label>
        </p>
        <p>
          <label>Hero class (optional)
            <input id="heroClass" maxlength="40"
              value="${safe(state.heroClass)}"
              placeholder="Ranger, Wizard, Fighter…">
          </label>
        </p>
      ` : ''}

      <div id="choices">
        ${s.end ? `
          <p class="success">
            <strong>${safe(state.name || 'Your hero')}</strong>
            ${state.heroClass ? `the ${safe(state.heroClass)} ` : ''}
            earned the title <strong>Beacon of the Marsh</strong>.
          </p>
          <button id="certificate">Download Quest Record</button>
        ` : s.choices.map(([label, next], i) => `
          <button class="choice" data-next="${next}">
            ${i + 1}. ${safe(label)}
          </button>
        `).join('')}
      </div>
    </section>

    <p id="notice" role="status" class="muted"></p>

    <footer>
      Progress saves on this browser only.
      No student account or personal information is required.
    </footer>
  `;

  document.querySelector('#reset').onclick = () => {
    if (confirm('Start a new adventure? Your current progress will be replaced.')) {
      state = fresh();
      save();
      render();
    }
  };

  document.querySelectorAll('[data-next]').forEach(b => {
    b.onclick = () => {
      if (state.scene === 'start') {
        state.name = document.querySelector('#heroName').value.trim().slice(0, 40);
        state.heroClass = document.querySelector('#heroClass').value.trim().slice(0, 40);
      }
      move(b.dataset.next);
    };
  });

  const c = document.querySelector('#certificate');

  if (c) {
    c.onclick = () => {
      const data = {
        game: 'Gator Adventures',
        level: 1,
        quest: 'Beacon of the Marsh',
        hero: state.name || 'Unnamed Hero',
        class: state.heroClass,
        energy: state.hp,
        clues: state.clue,
        allies: state.ally,
        completed: state.completed
      };

      const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        {type: 'application/json'}
      );

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'gator-level1-quest-record.json';
      a.click();

      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
  }
}

state = load();
render();
