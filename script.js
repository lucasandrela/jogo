// fractionquest.js - O Script Principal do Jogo de Frações com Gamificação Completa

// ==========================================
// CONFIGURAÇÃO DOS NÍVEIS (Fases 1 a 10)
// ==========================================
const phases = [
  {
    id: 1,
    title: "Preencha 3/4 do túnel!",
    target: 3/4,
    targetLabel: "3/4",
    slots: 4,
    pieces: [
      {n:1,d:2,val:0.5},
      {n:1,d:4,val:0.25},
      {n:1,d:4,val:0.25},
      {n:2,d:8,val:0.25},
      {n:1,d:8,val:0.125}
    ],
    hint: "💡 Dica: 3/4 é igual a 0,75. Tente combinar 1/2 com outra peça!",
    dialog: "Silas: Esse túnel precisa ficar perfeito. 3/4 de terra resolvem!",
    timeLimit: 60,
    isQuiz: false
  },
  {
    id: 2,
    title: "Preencha exatamente 1/2 do túnel!",
    target: 1/2,
    targetLabel: "1/2",
    slots: 4,
    pieces: [
      {n:1,d:4,val:0.25},
      {n:1,d:4,val:0.25},
      {n:1,d:8,val:0.125},
      {n:3,d:8,val:0.375},
      {n:1,d:8,val:0.125}
    ],
    hint: "💡 Dica: 1/2 é metade! Duas frações de 1/4 somam 1/2.",
    dialog: "Silas: Metade de um túnel já ajuda a me esconder do sol!",
    timeLimit: 50,
    isQuiz: false
  },
  {
    id: 3,
    title: "Preencha exatamente 5/8 do túnel!",
    target: 5/8,
    targetLabel: "5/8",
    slots: 5,
    pieces: [
      {n:1,d:2,val:0.5},
      {n:1,d:8,val:0.125},
      {n:2,d:8,val:0.25},
      {n:3,d:8,val:0.375},
      {n:1,d:4,val:0.25}
    ],
    hint: "💡 Dica: Lembre-se que 1/2 é igual a 4/8. Junte com 1/8!",
    dialog: "Silas: 5/8 parece um pouco complexo, mas você consegue somar!",
    timeLimit: 60,
    isQuiz: false
  },
  {
    id: 4,
    title: "Preencha exatamente 7/8 do túnel!",
    target: 7/8,
    targetLabel: "7/8",
    slots: 6,
    pieces: [
      {n:1,d:2,val:0.5},
      {n:1,d:4,val:0.25},
      {n:1,d:8,val:0.125},
      {n:3,d:8,val:0.375},
      {n:2,d:4,val:0.5}
    ],
    hint: "💡 Dica: 7/8 é quase o túnel todo! Falta apenas 1/8.",
    dialog: "Silas: Quase cheio! Vamos tapar 7/8 deste buraco!",
    timeLimit: 70,
    isQuiz: false
  },
  {
    id: 5,
    title: "DESAFIO 1: Mini Quiz de Frações!",
    isQuiz: true,
    questions: [
      {
        question: "Qual fração representa a parte pintada de um círculo dividido em 4 partes iguais onde 3 estão pintadas?",
        options: ["1/4", "3/4", "4/3", "2/4"],
        answer: 1,
        explanation: "Isso mesmo! 3 partes de 4 é representado por 3/4."
      },
      {
        question: "Se somarmos 1/3 + 1/3, qual o resultado?",
        options: ["2/6", "1/6", "2/3", "1/3"],
        answer: 2,
        explanation: "Correto! Na soma de denominadores iguais, somamos os numeradores: 1 + 1 = 2, mantendo o 3."
      },
      {
        question: "Qual fração é equivalente a 1/2?",
        options: ["2/4", "1/3", "3/8", "2/3"],
        answer: 0,
        explanation: "Perfeito! 2/4 simplificado por 2 é exatamente igual a 1/2."
      }
    ]
  },
  {
    id: 6,
    title: "Preencha exatamente 2/3 do túnel!",
    target: 2/3,
    targetLabel: "2/3",
    slots: 5,
    pieces: [
      {n:1,d:3,val:1/3},
      {n:1,d:3,val:1/3},
      {n:1,d:6,val:1/6},
      {n:2,d:6,val:1/3},
      {n:1,d:2,val:0.5},
      {n:1,d:6,val:1/6}
    ],
    hint: "💡 Dica: 1/3 + 1/3 = 2/3. Ou junte frações equivalentes com denominador 6!",
    dialog: "Silas: Cuidado, agora o túnel tem fatias de 3 e 6 partes!",
    timeLimit: 80,
    isQuiz: false
  },
  {
    id: 7,
    title: "Preencha exatamente 5/6 do túnel!",
    target: 5/6,
    targetLabel: "5/6",
    slots: 6,
    pieces: [
      {n:1,d:2,val:0.5},
      {n:1,d:3,val:1/3},
      {n:1,d:6,val:1/6},
      {n:2,d:6,val:1/3},
      {n:1,d:6,val:1/6}
    ],
    hint: "💡 Dica: 1/2 (que é 3/6) + 1/3 (que é 2/6) somam 5/6!",
    dialog: "Silas: O túnel está muito longo. 5/6 é quase tudo!",
    timeLimit: 80,
    isQuiz: false
  },
  {
    id: 8,
    title: "Preencha exatamente 3/5 do túnel!",
    target: 3/5,
    targetLabel: "3/5",
    slots: 5,
    pieces: [
      {n:1,d:5,val:0.2},
      {n:2,d:5,val:0.4},
      {n:1,d:10,val:0.1},
      {n:3,d:10,val:0.3},
      {n:1,d:5,val:0.2}
    ],
    hint: "💡 Dica: 1/5 + 2/5 = 3/5. Fique atento aos quintos!",
    dialog: "Silas: Quintos são frações divertidas! 3/5 é o nosso alvo.",
    timeLimit: 75,
    isQuiz: false
  },
  {
    id: 9,
    title: "DESAFIO 2: Super Quiz de Frações!",
    isQuiz: true,
    questions: [
      {
        question: "Qual fração é maior?",
        options: ["1/4", "1/2", "1/8", "1/3"],
        answer: 1,
        explanation: "Correto! Quanto menor o denominador, maior a fatia inteira!"
      },
      {
        question: "Como simplificamos a fração 6/12?",
        options: ["3/4", "2/3", "1/2", "1/3"],
        answer: 2,
        explanation: "Ótimo! Dividindo o numerador e o denominador por 6, temos 1/2."
      },
      {
        question: "Se Silas tem 8 cenouras e comeu 1/4 delas. Quantas cenouras ele comeu?",
        options: ["2", "4", "1", "3"],
        answer: 0,
        explanation: "Exato! 1/4 de 8 é o mesmo que 8 dividido por 4, que dá 2!"
      }
    ]
  },
  {
    id: 10,
    title: "DESAFIO FINAL: A Grande Obra de Silas (3/4 + 1/8)!",
    target: 7/8,
    targetLabel: "7/8",
    slots: 8,
    pieces: [
      {n:1,d:2,val:0.5},
      {n:1,d:4,val:0.25},
      {n:1,d:8,val:0.125},
      {n:1,d:8,val:0.125},
      {n:3,d:8,val:0.375},
      {n:2,d:4,val:0.5},
      {n:1,d:8,val:0.125},
      {n:1,d:8,val:0.125}
    ],
    hint: "💡 Dica: 3/4 + 1/8 = 6/8 + 1/8 = 7/8! Use a criatividade com os oitavos.",
    dialog: "Silas: Este é o maior túnel de todos! Demonstre que é um Mestre das Frações!",
    timeLimit: 90,
    isQuiz: false
  }
];

// ==========================================
// CONQUISTAS (ACHIEVEMENTS)
// ==========================================
const achievements = [
  { id: "first_win", name: "Primeiro Passo", desc: "Completou a primeira fase!", icon: "🌱", unlocked: false },
  { id: "perfect_score", name: "Perfeccionista", desc: "Ganhou 3 estrelas em qualquer fase!", icon: "⭐", unlocked: false },
  { id: "combo_master", name: "Mestre do Combo", desc: "Atingiu um Combo x3!", icon: "🔥", unlocked: false },
  { id: "quiz_genius", name: "Cérebro Matemático", desc: "Acertou todas as perguntas de um Quiz!", icon: "🧠", unlocked: false },
  { id: "speedrun", name: "Rápido como Silas", desc: "Completou uma fase com mais de 75% do tempo restante!", icon: "⚡", unlocked: false },
  { id: "all_clear", name: "Mestre de FractionQuest", desc: "Completou todas as 10 fases!", icon: "🏆", unlocked: false }
];

// ==========================================
// ESTADO GLOBAL DO JOGO
// ==========================================
let currentPhaseIndex = 0;
let score = 0;
let xp = 0;
let level = 1;
let lives = 3;
let selectedPieceIndex = null;
let tunnelPieces = [];
let usedPieceIndices = new Set();
let combo = 1;
let maxCombo = 1;
let starsTotal = 0;
let phaseStars = Array(phases.length).fill(0);
let phaseCompleted = Array(phases.length).fill(false);
let hintActive = false;
let hintUsed = false;

// Relacionados ao Timer
let timerVal = 0;
let timerInterval = null;
let initialTimeLimit = 60;

// Relacionados ao Quiz
let currentQuizQuestionIndex = 0;
let quizScore = 0;
let quizQuestions = [];

// ==========================================
// AUDIO SYNTHESIZER (Web Audio API)
// Evita dependência de arquivos MP3 externos
// ==========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'select') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'correct') {
      // Arpejo feliz
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'fail') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'lvlup') {
      // Som festivo
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.4);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'quiz_correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    console.log("AudioContext blocked or unsupported", e);
  }
}

// ==========================================
// SISTEMA DE PARTÍCULAS (Canvas)
// ==========================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 4;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -6 - 2;
    this.gravity = 0.15;
    this.color = color;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.01;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.alpha -= this.decay;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function spawnExplosion(x, y, colors = ['#FFD700', '#FF9500', '#00FFC8', '#FFF']) {
  for (let i = 0; i < 40; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, color));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, idx) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) {
      particles.splice(idx, 1);
    }
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ==========================================
// CONTROLE DE FLUXO DE TELAS
// ==========================================
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(scr => scr.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  playSound('select');
}

function goToIntro() {
  showScreen('screen-intro');
}

function goToMap() {
  showScreen('screen-map');
  renderMapScreen();
}

function restartGame() {
  currentPhaseIndex = 0;
  score = 0;
  xp = 0;
  level = 1;
  starsTotal = 0;
  phaseStars = Array(phases.length).fill(0);
  phaseCompleted = Array(phases.length).fill(false);
  achievements.forEach(ach => ach.unlocked = false);
  combo = 1;
  maxCombo = 1;

  goToMap();
}

// ==========================================
// RENDERIZADORES DE TELA DO MAPA
// ==========================================
function renderMapScreen() {
  // Atualiza Stats no HUD do mapa
  document.getElementById('map-score').textContent = score;
  document.getElementById('map-level').textContent = level;
  document.getElementById('xp-current').textContent = xp;
  const nextXp = level * 100;
  document.getElementById('xp-next').textContent = nextXp;
  document.getElementById('xp-fill').style.width = Math.min((xp / nextXp) * 100, 100) + '%';

  // Renderiza a Grid de Fases
  const grid = document.getElementById('phases-grid');
  grid.innerHTML = '';

  phases.forEach((p, idx) => {
    const node = document.createElement('div');
    node.className = 'phase-node';

    // Determina o estado da fase
    let isLocked = idx > 0 && !phaseCompleted[idx - 1];
    
    if (isLocked) {
      node.classList.add('locked');
      node.innerHTML = `
        <span class="phase-lock-icon">🔒</span>
        <div class="phase-stars"><span>★</span><span>★</span><span>★</span></div>
      `;
    } else {
      if (phaseCompleted[idx]) {
        node.classList.add('completed');
      } else if (idx === currentPhaseIndex) {
        node.classList.add('current-active');
      }
      
      const titleLabel = p.isQuiz ? "Quiz" : `Fase ${idx + 1}`;
      node.innerHTML = `
        <span class="phase-num">${p.isQuiz ? '🧠' : idx + 1}</span>
        <div class="phase-stars">
          <span class="${phaseStars[idx] >= 1 ? 'active' : ''}">★</span>
          <span class="${phaseStars[idx] >= 2 ? 'active' : ''}">★</span>
          <span class="${phaseStars[idx] >= 3 ? 'active' : ''}">★</span>
        </div>
      `;
      node.onclick = () => startPhase(idx);
    }
    grid.appendChild(node);
  });

  // Renderiza conquistas do mini painel
  const achList = document.getElementById('ach-list');
  achList.innerHTML = '';
  achievements.forEach(ach => {
    const div = document.createElement('div');
    div.className = 'ach-item-mini ' + (ach.unlocked ? 'unlocked' : 'locked');
    div.setAttribute('data-tooltip', `${ach.name}: ${ach.desc}`);
    div.innerHTML = ach.icon;
    achList.appendChild(div);
  });
}

// ==========================================
// MOTOR DE INICIALIZAÇÃO DE FASE
// ==========================================
function startPhase(idx) {
  currentPhaseIndex = idx;
  const phase = phases[idx];

  if (phase.isQuiz) {
    startQuiz(phase);
  } else {
    initGamePhase(phase);
  }
}

// ==========================================
// TELA DO JOGO: LÓGICA E RENDERIZAÇÃO
// ==========================================
function initGamePhase(phase) {
  showScreen('screen-game');

  // Configurar Informações Gerais
  document.getElementById('hud-phase-label').textContent = `FASE ${currentPhaseIndex + 1}`;
  document.getElementById('hud-phase-title').textContent = phase.title;
  document.getElementById('hud-target-fraction').textContent = phase.targetLabel;
  document.getElementById('prog-target').textContent = phase.targetLabel;
  document.getElementById('hud-score').textContent = score;

  // Silas fala no início
  setSilasDialog(phase.dialog || "Silas: Vamos resolver esta fração!");

  // Configurar Vidas
  lives = 3;
  renderLives();

  // Configurar Peças e Slots do Túnel
  tunnelPieces = [];
  usedPieceIndices.clear();
  selectedPieceIndex = null;
  hintActive = false;
  hintUsed = false;
  updateHintUI();
  updateHintButtonState();

  renderTunnel();
  renderInventory();

  // Configurar Combo Badge
  updateComboBadge();
}


function setSilasDialog(txt) {
  const dialog = document.getElementById('mascot-dialog');
  dialog.innerHTML = txt;
}

function renderLives() {
  const row = document.getElementById('lives-row');
  row.innerHTML = '';
  for (let i = 0; i < lives; i++) {
    const heart = document.createElement('img');
    heart.src = 'components/img/coração.png';
    row.appendChild(heart);
  }

}

function renderInventory() {
  const phase = phases[currentPhaseIndex];
  const el = document.getElementById('inventory-slots');
  el.innerHTML = '';

  // Encontra a peça recomendada pela dica
  const hintIdx = hintActive ? findHintPieceIndex() : null;

  phase.pieces.forEach((piece, i) => {
    const div = document.createElement('div');
    div.className = 'inv-piece';

    if (usedPieceIndices.has(i)) {
      div.classList.add('used');
    } else if (selectedPieceIndex === i) {
      div.classList.add('selected');
    }

    // Aplica classes de destaque ou escurecimento da dica
    if (hintActive && !usedPieceIndices.has(i)) {
      if (i === hintIdx) {
        div.classList.add('hint-focus');
      } else {
        div.classList.add('hint-dimmed');
      }
    }

    div.innerHTML = `
      <div class="frac">
        <span class="num">${piece.n}</span>
        <span class="bar"></span>
        <span class="den">${piece.d}</span>
      </div>
    `;

    div.onclick = () => selectPiece(i);
    el.appendChild(div);
  });
}

function selectPiece(i) {
  if (usedPieceIndices.has(i)) return;
  playSound('select');

  if (selectedPieceIndex === i) {
    selectedPieceIndex = null;
    setSilasDialog(phases[currentPhaseIndex].dialog || "Silas: Vamos preencher o túnel!");
  } else {
    selectedPieceIndex = i;
    const piece = phases[currentPhaseIndex].pieces[i];
    setSilasDialog(`Silas: Você selecionou a peça de terra ${piece.n}/${piece.d}! Agora toque num espaço vazio do túnel.`);
  }

  renderInventory();
  renderTunnel();
}

function renderTunnel() {
  const phase = phases[currentPhaseIndex];
  const el = document.getElementById('tunnel-slots');
  el.innerHTML = '';

  for (let i = 0; i < phase.slots; i++) {
    const slot = document.createElement('div');
    const piece = tunnelPieces[i];

    if (piece !== undefined) {
      slot.className = 'tunnel-slot';
      
      const inner = document.createElement('div');
      inner.className = 'piece-in-tunnel';
      inner.innerHTML = `
        <div class="frac">
          <span class="num">${piece.n}</span>
          <span class="bar"></span>
          <span class="den">${piece.d}</span>
        </div>
      `;

      const rm = document.createElement('div');
      rm.className = 'remove-btn';
      rm.textContent = '×';
      rm.onclick = (e) => {
        e.stopPropagation();
        removePiece(i);
      };

      inner.appendChild(rm);
      slot.appendChild(inner);
    } else {
      slot.className = 'tunnel-slot';
      if (selectedPieceIndex !== null) {
        slot.classList.add('target-highlight');
        slot.innerHTML = `<span class="arrow-hint">↓</span>`;
      }
      slot.onclick = () => placePiece(i);
    }
    el.appendChild(slot);
  }

  updateProgress();
}

function placePiece(slotIdx) {
  if (selectedPieceIndex === null) return;
  playSound('select');

  const phase = phases[currentPhaseIndex];
  const pieceInfo = phase.pieces[selectedPieceIndex];

  tunnelPieces[slotIdx] = {
    n: pieceInfo.n,
    d: pieceInfo.d,
    val: pieceInfo.val,
    srcIndex: selectedPieceIndex
  };

  usedPieceIndices.add(selectedPieceIndex);
  selectedPieceIndex = null;

  renderInventory();
  renderTunnel();
}

function removePiece(slotIdx) {
  playSound('select');
  const piece = tunnelPieces[slotIdx];
  if (piece) {
    usedPieceIndices.delete(piece.srcIndex);
    delete tunnelPieces[slotIdx];
  }
  renderTunnel();
  renderInventory();
}

function updateProgress() {
  const phase = phases[currentPhaseIndex];
  let currentVal = 0;

  for (let i = 0; i < phase.slots; i++) {
    if (tunnelPieces[i]) {
      currentVal += tunnelPieces[i].val;
    }
  }

  // Fração textual simplificada do progresso
  document.getElementById('prog-fraction').textContent = formatFrac(currentVal);

  const pct = Math.min(Math.round(currentVal * 100), 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';

  // Reposiciona o marcador do alvo
  const targetPct = phase.target * 100;
  document.getElementById('progress-marker').style.left = `calc(${targetPct}% - 2px)`;
}

function resetTunnel() {
  playSound('select');
  tunnelPieces = [];
  usedPieceIndices.clear();
  selectedPieceIndex = null;
  renderTunnel();
  renderInventory();
}

// ==========================================
// VERIFICAÇÃO DE RESPOSTAS E PONTUAÇÃO
// ==========================================
function checkAnswer() {
  const phase = phases[currentPhaseIndex];
  let currentVal = 0;
  let count = 0;

  for (let i = 0; i < phase.slots; i++) {
    if (tunnelPieces[i]) {
      currentVal += tunnelPieces[i].val;
      count++;
    }
  }

  if (count === 0) {
    setSilasDialog("Silas: Ei! O túnel está vazio. Coloque terra nele!");
    return;
  }

  const diff = Math.abs(currentVal - phase.target);
  const moleImg = document.getElementById('mascot-game');

  if (diff < 0.005) {
    // ACERTOU!
    clearInterval(timerInterval);
    playSound('correct');

    // Explosão de confetes no Silas
    const rect = moleImg.getBoundingClientRect();
    spawnExplosion(rect.left + rect.width/2, rect.top + rect.height/2);

    moleImg.className = 'mascot-game celebrate';
    
    // Cálculo de Estrelas: 3 estrelas se tempo restante > 50% e 3 vidas.
    // 2 estrelas se tempo restante > 25% e >= 2 vidas.
    // 1 estrela caso contrário.
    const timePctRemaining = 1; // Timer disabled
    let earnedStars = 1;
    if (lives === 3 && timePctRemaining >= 0.50) {
      earnedStars = 3;
    } else if (lives >= 2 && timePctRemaining >= 0.20) {
      earnedStars = 2;
    }

    phaseStars[currentPhaseIndex] = earnedStars;
    phaseCompleted[currentPhaseIndex] = true;

    // Concessão de Pontos e XP
    const basePts = 100;
    const comboBonus = combo * 25;
    const timeBonus = Math.round(timerVal * 1.5);
    let finalPts = (basePts + comboBonus + timeBonus) * earnedStars;

    if (hintUsed) {
      finalPts = Math.max(10, Math.round(finalPts * 0.5));
    }

    score += finalPts;
    
    // Animação de XP
    const earnedXp = 40 + (earnedStars * 15);
    giveXP(earnedXp);

    // Sistema de Combo
    combo++;
    if (combo > maxCombo) maxCombo = combo;
    updateComboBadge();

    // Mostra Overlay de Sucesso
    document.getElementById('ov-emoji').textContent = earnedStars === 3 ? "🏆 Excelência!" : "🎉 Parabéns!";
    document.getElementById('ov-title').textContent = earnedStars === 3 ? "Perfeito!" : "Você Conseguiu!";
    document.getElementById('ov-msg').textContent = `Você preencheu exatamente ${phase.targetLabel} do túnel!\n\nCombo ativo: x${combo-1}`;
    
    // Estrelas
    const starsDiv = document.getElementById('stars-display');
    starsDiv.innerHTML = `
      <span class="star-anim">★</span>
      <span class="star-anim">★</span>
      <span class="star-anim">★</span>
    `;
    
    let ptsText = `+${finalPts} Pontos`;
    if (hintUsed) {
      ptsText += ` (Dica Usada)`;
    }
    document.getElementById('points-gained').textContent = `${ptsText}  |  +${earnedXp} XP`;

    // Gatilho de Conquistas
    checkAchievements(earnedStars, timePctRemaining);

    // Mostrar overlay de sucesso
    const ov = document.getElementById('overlay-correct');
    ov.classList.add('show');

    // Cascata de entrada das estrelas
    const stars = starsDiv.querySelectorAll('.star-anim');
    stars.forEach((st, sIdx) => {
      setTimeout(() => {
        if (sIdx < earnedStars) {
          st.classList.add('earned');
          playSound('select');
        }
      }, 300 + sIdx * 250);
    });

  } else {
    // ERROU!
    playSound('fail');
    moleImg.className = 'mascot-game sad';
    setTimeout(() => {
      moleImg.className = 'mascot-game';
    }, 1200);

    lives--;
    renderLives();
    updateHintButtonState();

    // Quebra o combo
    combo = 1;
    updateComboBadge();

    if (lives <= 0) {
      clearInterval(timerInterval);
      document.getElementById('fail-msg').textContent = `Suas vidas acabaram!\nA soma das suas fatias deu ${formatFrac(currentVal)}, mas o alvo era ${phase.targetLabel}.`;
      document.getElementById('overlay-fail').classList.add('show');
    } else {
      let speech = currentVal > phase.target ? 
        `Silas: Opa! Excedemos o limite! Colocamos ${formatFrac(currentVal)}, mas precisamos de exatamente ${phase.targetLabel}.` :
        `Silas: Falta um pouquinho! Deu apenas ${formatFrac(currentVal)}. Precisamos de ${phase.targetLabel}.`;
      setSilasDialog(speech);
      resetTunnel();
    }
  }
}

function handleTimeout() {
  playSound('fail');
  combo = 1;
  updateComboBadge();
  document.getElementById('overlay-timeout').classList.add('show');
}

function resetPhase() {
  document.getElementById('overlay-fail').classList.remove('show');
  document.getElementById('overlay-timeout').classList.remove('show');
  initGamePhase(phases[currentPhaseIndex]);
}

function nextPhase() {
  document.getElementById('overlay-correct').classList.remove('show');
  document.getElementById('mascot-game').className = 'mascot-game';

  // Verifica se há novas fases
  if (currentPhaseIndex < phases.length - 1) {
    currentPhaseIndex++;
    startPhase(currentPhaseIndex);
  } else {
    // FIM DE JOGO
    finishGame();
  }
}

function updateComboBadge() {
  const badge = document.getElementById('combo-badge');
  const count = document.getElementById('combo-count');
  
  if (combo > 1) {
    count.textContent = combo - 1;
    badge.classList.add('active');
  } else {
    badge.classList.remove('active');
  }
}

// ==========================================
// SISTEMA DE RECOMPENSA XP & LEVEL
// ==========================================
function giveXP(amount) {
  xp += amount;
  let nextXp = level * 100;
  
  if (xp >= nextXp) {
    xp -= nextXp;
    level++;
    playSound('lvlup');
    
    // Efeito visual flutuante de LEVEL UP
    showFloatingToast(`👑 NÍVEL ${level}!`);
  }
}

function showFloatingToast(txt) {
  const toast = document.getElementById('floating-points');
  toast.textContent = txt;
  toast.classList.add('animate');
  setTimeout(() => {
    toast.classList.remove('animate');
  }, 1000);
}

// ==========================================
// SISTEMA DE CONQUISTAS (DETECTOR E POPUP)
// ==========================================
function checkAchievements(stars, timePctRemaining) {
  let unlockedNow = [];

  // 1. Primeiro Passo
  if (currentPhaseIndex === 0 && !achievements[0].unlocked) {
    achievements[0].unlocked = true;
    unlockedNow.push(achievements[0]);
  }
  // 2. Perfeccionista
  if (stars === 3 && !achievements[1].unlocked) {
    achievements[1].unlocked = true;
    unlockedNow.push(achievements[1]);
  }
  // 3. Mestre do Combo
  if (combo - 1 >= 3 && !achievements[2].unlocked) {
    achievements[2].unlocked = true;
    unlockedNow.push(achievements[2]);
  }
  // 5. Rápido como Silas (speedrun)
  if (timePctRemaining >= 0.75 && !achievements[4].unlocked) {
    achievements[4].unlocked = true;
    unlockedNow.push(achievements[4]);
  }
  // 6. Mestre do Jogo (all clear)
  if (currentPhaseIndex === phases.length - 1 && !achievements[5].unlocked) {
    achievements[5].unlocked = true;
    unlockedNow.push(achievements[5]);
  }

  // Se houve conquista desbloqueada, exibe o popup especial no card e o Toast
  const achPopup = document.getElementById('achievement-unlocked');
  const achName = document.getElementById('ach-popup-name');

  if (unlockedNow.length > 0) {
    // Pega o primeiro e mostra no popup do card
    const firstAch = unlockedNow[0];
    achPopup.style.display = 'block';
    achName.textContent = `${firstAch.icon} ${firstAch.name} - ${firstAch.desc}`;

    // Mostra o Toast na tela geral
    unlockedNow.forEach((ach, index) => {
      setTimeout(() => {
        triggerAchievementToast(ach);
      }, index * 1200);
    });
  } else {
    achPopup.style.display = 'none';
  }
}

function triggerAchievementToast(ach) {
  const toast = document.getElementById('ach-toast');
  document.getElementById('ach-toast-name').textContent = ach.name;
  toast.classList.add('show');
  
  // Confete no meio da tela
  spawnExplosion(window.innerWidth / 2, window.innerHeight / 2);

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ==========================================
// TELA DO MINI QUIZ INTERCALADO
// ==========================================
function startQuiz(phase) {
  showScreen('screen-quiz');
  quizQuestions = phase.questions;
  currentQuizQuestionIndex = 0;
  quizScore = 0;
  
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = quizQuestions[currentQuizQuestionIndex];
  
  document.getElementById('quiz-progress-txt').textContent = `Pergunta ${currentQuizQuestionIndex + 1} de ${quizQuestions.length}`;
  document.getElementById('quiz-question').innerHTML = `<strong>Silas pergunta:</strong><br>${q.question}`;
  
  const optionsDiv = document.getElementById('quiz-options');
  optionsDiv.innerHTML = '';
  
  const feedback = document.getElementById('quiz-feedback');
  feedback.style.display = 'none';

  q.options.forEach((opt, oIdx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.textContent = opt;
    btn.onclick = () => selectQuizOption(oIdx, btn);
    optionsDiv.appendChild(btn);
  });

  // Atualiza barra de progresso do quiz
  const pct = (currentQuizQuestionIndex / quizQuestions.length) * 100;
  document.getElementById('quiz-xp-fill').style.width = pct + '%';
}

function selectQuizOption(optIdx, clickedBtn) {
  const q = quizQuestions[currentQuizQuestionIndex];
  const allBtns = document.querySelectorAll('.quiz-opt-btn');
  
  // Desativa cliques adicionais
  allBtns.forEach(btn => btn.style.pointerEvents = 'none');

  const feedback = document.getElementById('quiz-feedback');
  feedback.style.display = 'block';

  if (optIdx === q.answer) {
    // Acertou
    playSound('quiz_correct');
    clickedBtn.classList.add('correct');
    feedback.className = 'quiz-feedback success';
    feedback.textContent = `✅ ${q.explanation}`;
    quizScore++;
  } else {
    // Errou
    playSound('fail');
    clickedBtn.classList.add('wrong');
    allBtns[q.answer].classList.add('correct');
    feedback.className = 'quiz-feedback fail';
    feedback.textContent = `❌ Que pena. A resposta correta era: ${q.options[q.answer]}.`;
  }

  // Avança em 3 segundos
  setTimeout(() => {
    currentQuizQuestionIndex++;
    if (currentQuizQuestionIndex < quizQuestions.length) {
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  }, 3500);
}

function finishQuiz() {
  // Conclui o quiz
  phaseCompleted[currentPhaseIndex] = true;
  
  // Estrelas baseadas nas respostas corretas
  let earnedStars = 1;
  if (quizScore === quizQuestions.length) {
    earnedStars = 3;
    // Conquista: Cérebro Matemático
    if (!achievements[3].unlocked) {
      achievements[3].unlocked = true;
      triggerAchievementToast(achievements[3]);
    }
  } else if (quizScore >= 2) {
    earnedStars = 2;
  }
  phaseStars[currentPhaseIndex] = earnedStars;

  const earnedPts = quizScore * 150 * earnedStars;
  score += earnedPts;
  giveXP(50 + (quizScore * 20));

  // Volta ao mapa
  goToMap();
}

function skipQuiz() {
  phaseCompleted[currentPhaseIndex] = true;
  phaseStars[currentPhaseIndex] = 1;
  goToMap();
}

// ==========================================
// TELA FINAL DE RESULTADOS
// ==========================================
function finishGame() {
  showScreen('screen-result');

  document.getElementById('result-score').textContent = score;
  document.getElementById('result-level').textContent = level;
  document.getElementById('result-max-combo').textContent = maxCombo + 'x';

  // Soma todas as estrelas ganhas
  starsTotal = phaseStars.reduce((sum, current) => sum + current, 0);
  document.getElementById('result-stars-total').textContent = starsTotal;

  // Grade/Desempenho
  const gradeVal = document.getElementById('result-grade-val');
  const maxPossibleStars = phases.length * 3;
  const ratio = starsTotal / maxPossibleStars;

  if (ratio >= 0.90) {
    gradeVal.textContent = "🥇 Mestre Lendário das Frações!";
    gradeVal.style.color = "#FFD700";
  } else if (ratio >= 0.70) {
    gradeVal.textContent = "🥈 Excelente Matemático!";
    gradeVal.style.color = "#00FFC8";
  } else if (ratio >= 0.50) {
    gradeVal.textContent = "🥉 Bom Construtor!";
    gradeVal.style.color = "#FFB84C";
  } else {
    gradeVal.textContent = "🌱 Aprendiz do Silas! Continue treinando.";
    gradeVal.style.color = "#FFF";
  }

  // Lista de Conquistas ganhas
  const list = document.getElementById('result-ach-list');
  list.innerHTML = '';
  let countUnlocked = 0;

  achievements.forEach(ach => {
    if (ach.unlocked) {
      countUnlocked++;
      const item = document.createElement('div');
      item.className = 'ach-item-mini unlocked';
      item.setAttribute('data-tooltip', `${ach.name}: ${ach.desc}`);
      item.innerHTML = ach.icon;
      list.appendChild(item);
    }
  });

  if (countUnlocked === 0) {
    list.innerHTML = `<span style="font-size:12px; color:rgba(255,255,255,0.4)">Nenhuma conquista desbloqueada ainda.</span>`;
  }
}

// ==========================================
// MÉTODOS AUXILIARES E FORMATADORES
// ==========================================
function formatFrac(val) {
  const tolerance = 0.005;
  
  // Procura uma fração simples com denominador de 1 a 16
  for (let d = 1; d <= 16; d++) {
    const n = Math.round(val * d);
    if (Math.abs(n / d - val) < tolerance) {
      if (n === 0) return "0";
      if (n === d) return "1";
      return `${n}/${d}`;
    }
  }
  
  // Caso não encontre fração simples, retorna decimal limpo
  return val.toFixed(2);
}

// ==========================================
// TELA INICIAL
// ==========================================
// Garante o AudioContext ativo ao primeiro clique no body
document.body.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}, { once: true });

// ==========================================
// SISTEMA DE DICA PROGRESSIVA
// ==========================================
function updateHintUI() {
  const track = document.querySelector('.progress-track');
  const labelTop = document.querySelector('.progress-label-top');
  
  if (track) {
    if (hintActive) {
      track.style.display = 'block';
      if (labelTop) labelTop.style.display = 'block';
    } else {
      track.style.display = 'none';
      if (labelTop) labelTop.style.display = 'none';
    }
  }
}

function updateHintButtonState() {
  const btnHint = document.getElementById('btn-hint');
  if (!btnHint) return;
  
  const livesSpent = 3 - lives;
  if (livesSpent >= 1) {
    btnHint.disabled = false;
    btnHint.classList.remove('locked');
    btnHint.innerHTML = `<span class="hint-question">?</span> USAR DICA`;
  } else {
    btnHint.disabled = true;
    btnHint.classList.add('locked');
    btnHint.innerHTML = `🔒 BLOQUEADO (Erre 1 vez para liberar)`;
    if (hintActive) {
      hintActive = false;
      updateHintUI();
      renderInventory();
    }
  }
}

function toggleHint() {
  if (hintActive) {
    hintActive = false;
    setSilasDialog(phases[currentPhaseIndex].dialog || "Silas: Vamos resolver esta fração!");
  } else {
    hintActive = true;
    hintUsed = true;
    playSound('select');
    
    // Encontra a peça correta
    const hintIdx = findHintPieceIndex();
    if (hintIdx !== null) {
      const piece = phases[currentPhaseIndex].pieces[hintIdx];
      setSilasDialog(`Silas: A peça em destaque (${piece.n}/${piece.d}) é perfeita para a solução!`);
    } else {
      setSilasDialog(`Silas: O túnel atual não pode ser completado com as peças restantes. Use o Lixo 🗑️ para recomeçar!`);
    }
  }
  updateHintUI();
  renderInventory();
}

function findHintPieceIndex() {
  const phase = phases[currentPhaseIndex];
  if (!phase || phase.isQuiz) return null;
  
  // Calcula o valor atualmente colocado no túnel
  let currentVal = 0;
  for (let i = 0; i < phase.slots; i++) {
    if (tunnelPieces[i]) {
      currentVal += tunnelPieces[i].val;
    }
  }
  
  const neededVal = phase.target - currentVal;
  if (neededVal <= 0.001) return null; // Já preenchido ou excedido
  
  // Encontra os índices das peças que ainda não foram usadas
  const unusedIndices = [];
  phase.pieces.forEach((p, idx) => {
    if (!usedPieceIndices.has(idx)) {
      unusedIndices.push(idx);
    }
  });
  
  // Busca um subconjunto de peças não usadas que somam exatamente neededVal
  const n = unusedIndices.length;
  let bestSubset = null;
  
  for (let i = 1; i < (1 << n); i++) {
    let sum = 0;
    const subset = [];
    for (let j = 0; j < n; j++) {
      if ((i & (1 << j)) !== 0) {
        const idx = unusedIndices[j];
        sum += phase.pieces[idx].val;
        subset.push(idx);
      }
    }
    if (Math.abs(sum - neededVal) < 0.005) {
      bestSubset = subset;
      break;
    }
  }
  
  if (bestSubset && bestSubset.length > 0) {
    // Prioriza peça 2/6 se estiver na fase 6 e no subset para destacar especificamente a peça 2/6 conforme o prompt
    const priorityIndex = bestSubset.find(idx => {
      const p = phase.pieces[idx];
      return p.n === 2 && p.d === 6;
    });
    if (priorityIndex !== undefined) return priorityIndex;
    
    return bestSubset[0];
  }
  
  // Se não houver subconjunto a partir do progresso atual, busca do zero para indicar uma peça inicial viável
  let scratchSubset = null;
  for (let i = 1; i < (1 << phase.pieces.length); i++) {
    let sum = 0;
    const subset = [];
    for (let j = 0; j < phase.pieces.length; j++) {
      if ((i & (1 << j)) !== 0) {
        sum += phase.pieces[j].val;
        subset.push(j);
      }
    }
    if (Math.abs(sum - phase.target) < 0.005) {
      scratchSubset = subset;
      break;
    }
  }
  
  if (scratchSubset && scratchSubset.length > 0) {
    const unusedInScratch = scratchSubset.find(idx => !usedPieceIndices.has(idx));
    if (unusedInScratch !== undefined) return unusedInScratch;
    return scratchSubset[0];
  }
  
  return null;
}

// Inicialização — começa na tela de introdução
window.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-intro');
});