const phases = [
  {
    title: "FASE 1: Preencha exatamente 3/4 do túnel!",
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
    hint: "💡 3/4 = 0,75. Tente combinar peças que somem 3/4!"
  },
  {
    title: "FASE 2: Preencha exatamente 1/2 do túnel!",
    target: 1/2,
    targetLabel: "1/2",
    slots: 4,
    pieces: [
      {n:1,d:4,val:0.25},
      {n:1,d:4,val:0.25},
      {n:1,d:8,val:0.125},
      {n:3,d:8,val:0.375},
      {n:1,d:2,val:0.5}
    ],
    hint: "💡 1/2 = 0,50. Você pode usar uma peça só, ou combinar várias!"
  },
  {
    title: "FASE 3: Preencha exatamente 5/8 do túnel!",
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
    hint: "💡 5/8 = 0,625. Pense em 1/2 + 1/8 = 4/8 + 1/8!"
  },
  {
    title: "FASE 4: Preencha exatamente 7/8 do túnel!",
    target: 7/8,
    targetLabel: "7/8",
    slots: 6,
    pieces: [
      {n:1,d:2,val:0.5},
      {n:1,d:4,val:0.25},
      {n:1,d:8,val:0.125},
      {n:3,d:8,val:0.375},
      {n:2,d:4,val:0.5},
      {n:1,d:8,val:0.125}
    ],
    hint: "💡 7/8 = 0,875. Tente: 1/2 + 1/4 + 1/8 = 4/8 + 2/8 + 1/8!"
  },
  {
    title: "FASE 5: DESAFIO! Preencha exatamente 2/3 do túnel!",
    target: 2/3,
    targetLabel: "2/3",
    slots: 6,
    pieces: [
      {n:1,d:3,val:1/3},
      {n:1,d:3,val:1/3},
      {n:1,d:6,val:1/6},
      {n:2,d:6,val:1/3},
      {n:1,d:2,val:0.5},
      {n:1,d:6,val:1/6}
    ],
    hint: "💡 2/3 = dois terços. 1/3 + 1/3 = 2/3. Ou: 2/6 + 2/6!"
  }
];

let currentPhase = 0;
let lives = 3;
let score = 0;
let selectedPiece = null;
let tunnelPieces = [];
let usedPieceIndices = new Set();

function renderLives(){
  const el = document.getElementById('lives');
  el.innerHTML = '';
  
  for(let i = 0; i < 3; i++){
    const img = document.createElement('img');
    
    // Define o caminho da sua imagem de pixel art
    img.src = '/components/img/coração.png'; 
    img.alt = 'Vida';
    
    // Classes do Tailwind para tamanho (ex: w-6 h-6 = 24px) e efeito de sombra
    let classes = 'w-8 h-8 object-contain drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)] transition-all duration-300';
    
    // Se o jogador perdeu essa vida, aplica efeito cinza (grayscale) e transparência
    if (i >= lives) {
      classes += ' grayscale opacity-40';
    }
    
    img.className = classes;
    el.appendChild(img);
  }
}

function renderPhaseMap(){
  const el = document.getElementById('phase-map');
  el.innerHTML = '';
  phases.forEach((p,i)=>{
    const d = document.createElement('div');
    d.className = 'phase-dot w-[10px] h-[10px] rounded-full bg-[#4A2000] border-2 border-[#8B5A2B]' + 
                  (i<currentPhase?' done bg-[#FFD700]':i===currentPhase?' current bg-[#00FF88]':'');
    el.appendChild(d);
  });
}

function renderInventory(){
  const phase = phases[currentPhase];
  const el = document.getElementById('inventory-slots');
  el.innerHTML = '';
  phase.pieces.forEach((p,i)=>{
    const div = document.createElement('div');
    
    // Configura as classes do Tailwind substituindo o fundo sólido por imagem e centralizando-a
    let classes = "inv-piece w-[70px] h-[60px] bg-[url('components/img/terra.png')] bg-cover bg-center border-3 border-[#FFB84C] rounded-xl flex items-center justify-center font-['Fredoka_One'] text-[#FFD700] text-[15px] cursor-pointer transition-all duration-200 shadow-[0_4px_0_#4A2000,0_5px_4px_rgba(0,0,0,0.4)] relative hover:brightness-110 hover:-translate-y-1 hover:shadow-[0_8px_0_#4A2000,0_9px_4px_rgba(0,0,0,0.4)] active:translate-y-0 active:shadow-[0_2px_0_#4A2000]";
    
    if (usedPieceIndices.has(i)) {
      classes += " opacity-30 pointer-events-none";
    } else if (selectedPiece === i) {
      classes += " !border-[#AAFF44] !shadow-[0_0_12px_rgba(170,255,68,0.6),0_4px_0_2px_#2A4A00] -translate-y-[6px] scale-105";
    }

    div.className = classes;
    // Opcional: Adicionada uma sombra preta no texto (drop-shadow) para destacar a fração acima do desenho da terra
    div.innerHTML = `<div class="frac flex flex-col items-center leading-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]"><span class="num text-[16px]">${p.n}</span><span class="bar w-[80%] h-[2px] bg-[#FFD700] my-[2px]"></span><span class="den text-[13px] text-[#FFC07A]">${p.d}</span></div>`;
    div.onclick = ()=>selectPiece(i);
    el.appendChild(div);
  });
}

function renderTunnel(){
  const phase = phases[currentPhase];
  const el = document.getElementById('tunnel-slots');
  el.innerHTML = '';
  for(let i=0;i<phase.slots;i++){
    const slot = document.createElement('div');
    const piece = tunnelPieces[i];
    
    if(piece!==undefined){
      slot.className = 'tunnel-slot flex-1 border-2 border-transparent rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 relative bg-[rgba(139,74,32,0.6)] border-[rgba(255,200,100,0.4)]';
      const inner = document.createElement('div');
      inner.className = "piece-in-tunnel w-full h-full rounded-md flex flex-col items-center justify-center bg-[#7B4020] border-2 border-[#FFB84C] font-['Fredoka_One'] text-[#FFD700] text-[15px] cursor-pointer relative hover:bg-[#9B5030]";
      inner.innerHTML = `<div class="frac flex flex-col items-center leading-none"><span class="num text-[16px]">${piece.n}</span><span class="bar w-[80%] h-[2px] bg-[#FFD700] my-[2px]"></span><span class="den text-[13px] text-[#FFC07A]">${piece.d}</span></div>`;
      
      const rm = document.createElement('div');
      rm.className = 'remove-btn absolute -top-1 -right-1 w-4 h-4 bg-[#CC2222] rounded-full color-white text-[10px] flex items-center justify-center font-extrabold border border-[#FF5555] cursor-pointer';
      rm.textContent = '×';
      rm.onclick=(e)=>{ e.stopPropagation(); removePiece(i); };
      inner.appendChild(rm);
      slot.appendChild(inner);
    } else {
      slot.className = 'tunnel-slot flex-1 border-2 border-dashed border-[rgba(255,255,255,0.15)] rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 relative target-highlight';
      slot.innerHTML = selectedPiece!==null?'<div class="arrow-hint absolute text-[11px] text-[#AAFF44] font-extrabold pointer-events-none">↓</div>':'';
      slot.onclick=()=>placePiece(i);
    }
    el.appendChild(slot);
  }
  updateProgress();
}

function selectPiece(i){
  if(usedPieceIndices.has(i)) return;
  selectedPiece = (selectedPiece===i)?null:i;
  renderInventory();
  renderTunnel();
  const phase = phases[currentPhase];
  document.getElementById('hint-box').textContent = selectedPiece!==null?
    `✅ Peça ${phase.pieces[i].n}/${phase.pieces[i].d} selecionada! Clique num espaço vazio do túnel.`:
    phase.hint;
}

function placePiece(slotIndex){
  if(selectedPiece===null) return;
  const phase = phases[currentPhase];
  if(tunnelPieces[slotIndex]!==undefined) return;
  tunnelPieces[slotIndex] = {
    n: phase.pieces[selectedPiece].n,
    d: phase.pieces[selectedPiece].d,
    val: phase.pieces[selectedPiece].val,
    srcIndex: selectedPiece
  };
  usedPieceIndices.add(selectedPiece);
  selectedPiece = null;
  renderInventory();
  renderTunnel();
  document.getElementById('hint-box').textContent = phase.hint;
}

function removePiece(slotIndex){
  const piece = tunnelPieces[slotIndex];
  if(piece) usedPieceIndices.delete(piece.srcIndex);
  delete tunnelPieces[slotIndex];
  renderTunnel();
  renderInventory();
}

function updateProgress(){
  const phase = phases[currentPhase];
  let total = 0;
  for(let i=0;i<phase.slots;i++){
    if(tunnelPieces[i]) total+=tunnelPieces[i].val;
  }
  const pct = Math.min(Math.round(total*100),100);
  document.getElementById('progress-fill').style.width = pct+'%';
  document.getElementById('progress-label').textContent = pct+'%';
}

function checkAnswer(){
  const phase = phases[currentPhase];
  let total = 0;
  let count = 0;
  for(let i=0;i<phase.slots;i++){
    if(tunnelPieces[i]){total+=tunnelPieces[i].val; count++;}
  }
  if(count===0){
    document.getElementById('hint-box').textContent = '⚠️ Coloque pelo menos uma peça no túnel!';
    return;
  }

  const target = phase.target;
  const diff = Math.abs(total-target);
  const overlay = document.getElementById('feedback-overlay');
  const mole = document.getElementById('mole');

  if(diff<0.001){
    score += 10 + (lives*5);
    document.getElementById('score').textContent = score;
    document.getElementById('fb-emoji').textContent = '🎉';
    document.getElementById('fb-title').textContent = 'Incrível!';
    document.getElementById('fb-msg').textContent = `Você preencheu exatamente ${phase.targetLabel} do túnel!\n+${10+lives*5} pontos!`;
    document.getElementById('next-btn').textContent = currentPhase<phases.length-1?'PRÓXIMA FASE →':'VER RESULTADO 🏆';
    document.getElementById('next-btn').onclick = nextPhase;
    mole.className='w-[130px] max-w-none drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 celebrate';
    overlay.classList.add('show');
  } else {
    lives = Math.max(0,lives-1);
    renderLives();
    mole.className='w-[130px] max-w-none drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 sad';
    setTimeout(()=>mole.className='w-[130px] max-w-none drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300', 1000);

    let msg = total>target?
      `😅 Você colocou demais! A soma é ${formatFrac(total)}, mas precisa ser ${phase.targetLabel}.`:
      `🤏 Falta pouco! A soma é ${formatFrac(total)}, mas precisa ser ${phase.targetLabel}.`;

    if(lives===0){
      document.getElementById('fb-emoji').textContent='😢';
      document.getElementById('fb-title').textContent='Que pena...';
      document.getElementById('fb-msg').textContent='Você perdeu todas as vidas nesta fase. Vamos tentar de novo!';
      document.getElementById('next-btn').textContent='TENTAR DE NOVO 🔄';
      document.getElementById('next-btn').onclick=resetPhase;
      overlay.classList.add('show');
    } else {
      document.getElementById('hint-box').textContent=msg+' Tente de novo! Vidas restantes: '+lives;
      resetTunnel();
    }
  }
}

function formatFrac(val){
  const tolerance=0.001;
  for(let d=1;d<=16;d++){
    const n=Math.round(val*d);
    if(Math.abs(n/d-val)<tolerance) return n+'/'+d;
  }
  return val.toFixed(3);
}

function resetTunnel(){
  tunnelPieces=[];
  usedPieceIndices=new Set();
  selectedPiece=null;
  renderInventory();
  renderTunnel();
}

function resetPhase(){
  lives=3;
  document.getElementById('next-btn').onclick=nextPhase;
  document.getElementById('feedback-overlay').classList.remove('show');
  renderLives();
  resetTunnel();
}

function nextPhase(){
  document.getElementById('feedback-overlay').classList.remove('show');
  document.getElementById('mole').className='w-[130px] max-w-none drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300';
  if(currentPhase<phases.length-1){
    currentPhase++;
    lives=3;
    resetTunnel();
    document.getElementById('phase-title').textContent=phases[currentPhase].title;
    document.getElementById('hint-box').textContent=phases[currentPhase].hint;
    renderLives();
    renderPhaseMap();
  } else {
    const overlay=document.getElementById('feedback-overlay');
    document.getElementById('fb-emoji').textContent='🏆';
    document.getElementById('fb-title').textContent='Parabéns!';
    document.getElementById('fb-msg').textContent=`Você completou todas as ${phases.length} fases!\nPontuação final: ${score} pontos!\nVocê é um mestre das frações!`;
    document.getElementById('next-btn').textContent='JOGAR NOVAMENTE 🔄';
    document.getElementById('next-btn').onclick=()=>{
      currentPhase=0; lives=3; score=0;
      document.getElementById('score').textContent=0;
      document.getElementById('next-btn').onclick=nextPhase;
      document.getElementById('phase-title').textContent=phases[0].title;
      document.getElementById('hint-box').textContent=phases[0].hint;
      renderLives(); renderPhaseMap();
      overlay.classList.remove('show');
      resetTunnel();
    };
    overlay.classList.add('show');
  }
}

// Inicialização do Jogo
document.getElementById('phase-title').textContent=phases[0].title;
document.getElementById('hint-box').textContent=phases[0].hint;
renderLives();
renderPhaseMap();
resetTunnel();