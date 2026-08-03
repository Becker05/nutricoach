/* ==========================================================================
   Base de dados — alimentos e suplementos
   Valores por 100 g (aproximados, base tipo TACO / rótulos comuns).
   Campos: nome, cat, kcal, p, c, f, meals, tags
     cat:   prot | carb | gord | veg | fruta
     meals: onde a comida faz sentido — cafe, lanche, almoco (cobre jantar), ceia
     tags:  veg (vegetariano), vgn (vegano), lac (contém lactose), glu (contém glúten)
   Você pode adicionar alimentos pelo próprio app (aba Dieta → Alimentos).
   ========================================================================== */
'use strict';

// helper compacto: F(nome, cat, kcal, p, c, f, meals, tags)
const F = (nome,cat,kcal,p,c,f,meals,tags='') => ({nome,cat,kcal,p,c,f,
  meals:meals.split(' '), tags:tags?tags.split(' '):[]});

const FOODS_BASE = [
  // ---- proteínas animais ----
  F('Peito de frango grelhado','prot',165,31,0,3.6,'almoco lanche'),
  F('Coxa de frango sem pele','prot',209,26,0,11,'almoco'),
  F('Patinho grelhado (magro)','prot',190,32,0,6,'almoco'),
  F('Carne moída (acém)','prot',212,26,0,12,'almoco'),
  F('Contrafilé grelhado','prot',220,29,0,11,'almoco'),
  F('Lombo suíno grelhado','prot',143,26,0,3.5,'almoco'),
  F('Tilápia grelhada','prot',128,26,0,2.7,'almoco'),
  F('Salmão grelhado','prot',208,20,0,13,'almoco'),
  F('Sardinha','prot',208,25,0,11,'almoco lanche'),
  F('Atum em água (lata)','prot',116,26,0,1,'almoco lanche'),
  F('Camarão cozido','prot',99,24,0,0.3,'almoco'),
  F('Ovo inteiro','prot',143,13,1,10,'cafe almoco lanche','veg'),
  F('Clara de ovo','prot',52,11,0.7,0.2,'cafe almoco lanche','veg'),
  // ---- laticínios ----
  F('Iogurte natural integral','prot',61,3.5,4.7,3.3,'cafe lanche ceia','veg lac'),
  F('Iogurte grego natural','prot',97,9,4,5,'cafe lanche ceia','veg lac'),
  F('Queijo cottage','prot',98,11,3,4,'cafe lanche ceia','veg lac'),
  F('Queijo minas frescal','prot',264,17,3,20,'cafe lanche','veg lac'),
  F('Requeijão light','gord',160,10,6,10,'cafe lanche','veg lac'),
  F('Leite integral','prot',61,3,4.7,3.3,'cafe ceia','veg lac'),
  F('Leite desnatado','prot',35,3.4,5,0.2,'cafe ceia','veg lac'),
  // ---- proteínas vegetais ----
  F('Tofu','prot',76,8,1.9,4.8,'almoco lanche','veg vgn'),
  F('Proteína de soja (PTS) hidratada','prot',105,16,7,1,'almoco','veg vgn'),
  F('Edamame','prot',121,12,9,5,'almoco lanche','veg vgn'),
  F('Grão-de-bico cozido','carb',164,8.9,27,2.6,'almoco','veg vgn'),
  F('Lentilha cozida','carb',116,9,20,0.4,'almoco','veg vgn'),
  F('Feijão carioca cozido','carb',76,4.8,13.6,0.5,'almoco','veg vgn'),
  F('Feijão preto cozido','carb',77,4.5,14,0.5,'almoco','veg vgn'),
  // ---- carboidratos ----
  F('Arroz branco cozido','carb',128,2.5,28,0.2,'almoco','veg vgn'),
  F('Arroz integral cozido','carb',124,2.6,26,1,'almoco','veg vgn'),
  F('Batata inglesa cozida','carb',86,1.7,20,0.1,'almoco','veg vgn'),
  F('Batata-doce cozida','carb',86,1.6,20,0.1,'almoco cafe','veg vgn'),
  F('Mandioca cozida','carb',125,0.6,30,0.3,'almoco','veg vgn'),
  F('Inhame cozido','carb',97,1.5,23,0.2,'almoco cafe','veg vgn'),
  F('Macarrão cozido','carb',158,5.8,31,0.9,'almoco','veg vgn glu'),
  F('Cuscuz de milho cozido','carb',112,2.2,23,0.2,'cafe almoco','veg vgn'),
  F('Aveia em flocos','carb',389,17,66,7,'cafe lanche','veg vgn glu'),
  F('Pão francês','carb',300,8,58,3,'cafe lanche','veg vgn glu'),
  F('Pão integral','carb',253,9,43,4,'cafe lanche','veg vgn glu'),
  F('Tapioca (goma)','carb',340,0,85,0,'cafe lanche','veg vgn'),
  F('Granola sem açúcar','carb',430,10,60,15,'cafe lanche','veg vgn glu'),
  // ---- frutas ----
  F('Banana','fruta',89,1.1,23,0.3,'cafe lanche','veg vgn'),
  F('Maçã','fruta',52,0.3,14,0.2,'cafe lanche','veg vgn'),
  F('Mamão','fruta',43,0.5,11,0.3,'cafe lanche','veg vgn'),
  F('Laranja','fruta',47,0.9,12,0.1,'cafe lanche','veg vgn'),
  F('Morango','fruta',32,0.7,7.7,0.3,'cafe lanche','veg vgn'),
  F('Abacaxi','fruta',50,0.5,13,0.1,'cafe lanche','veg vgn'),
  F('Uva','fruta',69,0.7,18,0.2,'lanche','veg vgn'),
  // ---- gorduras ----
  F('Azeite de oliva','gord',884,0,0,100,'almoco','veg vgn'),
  F('Óleo de coco','gord',862,0,0,100,'cafe almoco','veg vgn'),
  F('Castanha-do-pará','gord',656,14,12,66,'cafe lanche','veg vgn'),
  F('Amêndoas','gord',579,21,22,49,'cafe lanche','veg vgn'),
  F('Amendoim','gord',567,26,16,49,'lanche','veg vgn'),
  F('Pasta de amendoim','gord',588,25,20,50,'cafe lanche','veg vgn'),
  F('Abacate','gord',160,2,9,15,'cafe lanche','veg vgn'),
  F('Chia','gord',486,17,42,31,'cafe lanche','veg vgn'),
  F('Linhaça','gord',534,18,29,42,'cafe lanche','veg vgn'),
  // ---- vegetais (baixa caloria) ----
  F('Brócolis cozido','veg',35,2.4,7,0.4,'almoco','veg vgn'),
  F('Alface','veg',15,1.4,2.9,0.2,'almoco','veg vgn'),
  F('Tomate','veg',18,0.9,3.9,0.2,'almoco','veg vgn'),
  F('Cenoura','veg',41,0.9,10,0.2,'almoco','veg vgn'),
  F('Abobrinha','veg',17,1.2,3.1,0.3,'almoco','veg vgn'),
  F('Couve refogada','veg',90,1.9,5,7,'almoco','veg vgn'),
  F('Espinafre','veg',23,2.9,3.6,0.4,'almoco','veg vgn'),
  F('Pepino','veg',15,0.7,3.6,0.1,'almoco','veg vgn'),
  F('Beterraba cozida','veg',44,1.6,10,0.2,'almoco','veg vgn'),
  // ---- suplementos como alimento ----
  F('Whey protein (pó)','prot',400,80,8,6,'cafe lanche','veg lac'),
  F('Proteína vegana (pó)','prot',380,75,10,5,'cafe lanche','veg vgn'),
];

/* Suplementos — informação de referência (não é prescrição).
   Comida vem primeiro; suplemento é ferramenta opcional. */
const SUPPS = {
  creatina:{nome:'Creatina monoidratada',
    dose:'3–5 g por dia, todo dia, horário indiferente',
    nota:'O suplemento com mais evidência de eficácia e segurança para força e massa. Não precisa fase de saturação. Beba água.',
    obj:['hipertrofia','emagrecimento','manutencao']},
  whey:{nome:'Whey ou proteína vegana',
    dose:'o suficiente para fechar a meta de proteína do dia',
    nota:'Ferramenta prática, não obrigação. Se a comida atinge a proteína, não é necessário. Versão vegana para quem não usa leite.',
    obj:['hipertrofia','emagrecimento','manutencao']},
  cafeina:{nome:'Cafeína / pré-treino',
    dose:'3–6 mg por kg, 30–45 min antes do treino',
    nota:'Melhora desempenho e percepção de esforço. Evitar perto de dormir e em quem tem sensibilidade ou hipertensão.',
    obj:['hipertrofia','emagrecimento','manutencao']},
  omega3:{nome:'Ômega-3 (EPA+DHA)',
    dose:'1–2 g por dia',
    nota:'Apoio cardiovascular e anti-inflamatório, útil sobretudo com baixo consumo de peixe.',
    obj:['hipertrofia','emagrecimento','manutencao']},
  vitd:{nome:'Vitamina D',
    dose:'conforme exame',
    nota:'Só suplementar com 25(OH)D baixa. Exige exame e orientação médica. Não chute a dose.',
    obj:['hipertrofia','emagrecimento','manutencao']},
};
/* ==========================================================================
   NutriCoach — app de acompanhamento nutricional e de treino
   Dados salvos no aparelho (localStorage). Exportar/importar = backup por aluno.
   Requer data.js (FOODS_BASE, SUPPS) carregado antes.
   Lógica alinhada aos módulos em /conhecimento. Não substitui avaliação clínica.
   ========================================================================== */
'use strict';

/* ----------------------------- armazenamento ----------------------------- */
const DB_KEY = 'nutricoach_alunos_v1';
const FOOD_KEY = 'nutricoach_foods_v1';

const store = {
  all(){ try{ return JSON.parse(localStorage.getItem(DB_KEY)) || []; }catch(e){ return []; } },
  saveAll(list){ localStorage.setItem(DB_KEY, JSON.stringify(list)); },
  get(id){ return this.all().find(a => a.id === id); },
  upsert(aluno){
    const list = this.all();
    const i = list.findIndex(a => a.id === aluno.id);
    aluno.updatedAt = Date.now();
    if(i >= 0) list[i] = aluno; else list.push(aluno);
    this.saveAll(list);
    return aluno;
  },
  remove(id){ this.saveAll(this.all().filter(a => a.id !== id)); }
};
const customFoods = {
  all(){ try{ return JSON.parse(localStorage.getItem(FOOD_KEY)) || []; }catch(e){ return []; } },
  add(f){ const l=this.all(); l.push(f); localStorage.setItem(FOOD_KEY, JSON.stringify(l)); },
  remove(nome){ localStorage.setItem(FOOD_KEY, JSON.stringify(this.all().filter(f=>f.nome!==nome))); }
};
const getFoods = () => FOODS_BASE.concat(customFoods.all());

const uid = () => 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2,7);
const todayISO = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,10); };
const fmt = (n, d=0) => (n===null||n===undefined||isNaN(n)) ? '—' : Number(n).toLocaleString('pt-BR',{maximumFractionDigits:d,minimumFractionDigits:d});
const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ----------------------------- domínio: dados ---------------------------- */
const NAF = {
  sedentario:{f:1.2, label:'Sedentário (trabalho parado, quase sem exercício)'},
  leve:{f:1.375, label:'Leve (exercício 1–3x/semana)'},
  moderado:{f:1.55, label:'Moderado (exercício 3–5x/semana)'},
  intenso:{f:1.725, label:'Intenso (treino 6–7x/semana)'},
  muito:{f:1.9, label:'Muito intenso (treino pesado + trabalho físico)'}
};

// banco de exercícios — comp = composto (descanso maior)
const EXS = [
  {n:'Supino reto com barra', g:'peito', eq:['academia'], comp:true, contra:['ombro']},
  {n:'Supino inclinado com halteres', g:'peito', eq:['academia','casa_halter'], comp:true},
  {n:'Flexão de braço', g:'peito', eq:['casa','academia'], comp:true},
  {n:'Crucifixo na máquina (peck deck)', g:'peito', eq:['academia'], comp:false, contra:['ombro']},
  {n:'Puxada frente na polia', g:'costas', eq:['academia'], comp:true},
  {n:'Remada curvada com barra', g:'costas', eq:['academia'], comp:true, contra:['lombar']},
  {n:'Remada unilateral com halter', g:'costas', eq:['academia','casa_halter'], comp:true},
  {n:'Barra fixa', g:'costas', eq:['casa','academia'], comp:true},
  {n:'Desenvolvimento com halteres', g:'ombro', eq:['academia','casa_halter'], comp:true, contra:['ombro']},
  {n:'Elevação lateral', g:'ombro', eq:['academia','casa_halter'], comp:false},
  {n:'Rosca direta com barra', g:'biceps', eq:['academia','casa_halter'], comp:false},
  {n:'Rosca alternada com halteres', g:'biceps', eq:['academia','casa_halter'], comp:false},
  {n:'Tríceps na polia (corda)', g:'triceps', eq:['academia'], comp:false},
  {n:'Tríceps testa com halteres', g:'triceps', eq:['academia','casa_halter'], comp:false, contra:['cotovelo']},
  {n:'Agachamento livre', g:'quadriceps', eq:['academia'], comp:true, contra:['joelho','lombar']},
  {n:'Leg press 45º', g:'quadriceps', eq:['academia'], comp:true, contra:['joelho']},
  {n:'Agachamento com peso corporal', g:'quadriceps', eq:['casa','academia'], comp:true},
  {n:'Cadeira extensora', g:'quadriceps', eq:['academia'], comp:false, contra:['joelho']},
  {n:'Levantamento terra romeno', g:'posterior', eq:['academia'], comp:true, contra:['lombar']},
  {n:'Mesa flexora', g:'posterior', eq:['academia'], comp:false},
  {n:'Elevação pélvica (hip thrust)', g:'gluteo', eq:['academia','casa'], comp:true},
  {n:'Afundo (avanço) com halteres', g:'gluteo', eq:['academia','casa_halter'], comp:true, contra:['joelho']},
  {n:'Panturrilha em pé', g:'panturrilha', eq:['academia','casa'], comp:false},
  {n:'Prancha abdominal', g:'abdomen', eq:['casa','academia'], comp:false},
  {n:'Abdominal supra no solo', g:'abdomen', eq:['casa','academia'], comp:false, contra:['lombar']},
  {n:'Caminhada rápida / esteira', g:'cardio', eq:['casa','academia'], comp:false},
  {n:'Bicicleta ergométrica', g:'cardio', eq:['academia'], comp:false},
];

/* --------------------------- domínio: cálculos --------------------------- */
function tmbMifflin({sexo, peso, altura, idade}){
  const base = 10*peso + 6.25*altura - 5*idade;
  return Math.round(sexo === 'M' ? base + 5 : base - 161);
}
function pesoAtual(a){
  const cks = (a.checkins||[]).filter(c=>c.peso).sort((x,y)=>x.date<y.date?-1:1);
  return cks.length ? +cks[cks.length-1].peso : a.perfil.peso;
}
function calcMetas(a){
  const p = a.perfil, cfg = a.config;
  const peso = pesoAtual(a);
  const tmb = tmbMifflin(Object.assign({}, p, {peso}));
  const fator = (NAF[cfg.atividade]||NAF.moderado).f;
  const get = Math.round(tmb * fator);
  let calorias;
  if(a.objetivo === 'emagrecimento') calorias = Math.round(get * (1 - cfg.deficitPct/100));
  else if(a.objetivo === 'hipertrofia') calorias = Math.round(get * (1 + cfg.superavitPct/100));
  else calorias = get;
  if(calorias < tmb) calorias = tmb;
  const proteinaG = Math.round(cfg.proteinaGkg * peso);
  const gorduraG  = Math.round(cfg.gorduraGkg * peso);
  let carboKcal   = calorias - (proteinaG*4 + gorduraG*9);
  if(carboKcal < 0) carboKcal = 0;
  const carboG    = Math.round(carboKcal / 4);
  const agua  = Math.round(cfg.aguaMlKg * peso);
  const fibra = Math.round(14 * calorias / 1000);
  return {peso, tmb, fator, get, calorias, proteinaG, gorduraG, carboG, agua, fibra};
}

// projeção até a meta de peso
function projecaoMeta(a){
  const meta = +a.perfil.pesoMeta;
  if(!meta || a.objetivo==='manutencao') return null;
  const atual = pesoAtual(a);
  let weeklyKg, weeks;
  if(a.objetivo==='emagrecimento'){ weeklyKg = atual*0.0075; weeks = (atual-meta)/weeklyKg; }
  else { weeklyKg = atual*0.003; weeks = (meta-atual)/weeklyKg; }
  if(!isFinite(weeks)) return null;
  if(weeks<=0) return {atingido:true, atual, meta};
  const dataAlvo = new Date(Date.now()+weeks*7*86400000).toISOString().slice(0,10);
  return {atual, meta, weeklyKg:+weeklyKg.toFixed(2), weeks:Math.ceil(weeks), meses:+(weeks/4.345).toFixed(1), dataAlvo,
    total:+(atual-meta).toFixed(1)};
}

// distribuição de refeições
function mealSlots(n){
  n = Math.max(3, Math.min(6, n||4));
  const dist = {3:[0.30,0.40,0.30],4:[0.25,0.35,0.15,0.25],5:[0.22,0.10,0.33,0.10,0.25],6:[0.20,0.10,0.28,0.10,0.22,0.10]}[n];
  const nomes = {
    3:['Café da manhã','Almoço','Jantar'],
    4:['Café da manhã','Almoço','Lanche da tarde','Jantar'],
    5:['Café da manhã','Lanche 1','Almoço','Lanche 2','Jantar'],
    6:['Café da manhã','Lanche 1','Almoço','Lanche 2','Jantar','Ceia']
  }[n];
  const slot = {3:['cafe','almoco','almoco'],4:['cafe','almoco','lanche','almoco'],
    5:['cafe','lanche','almoco','lanche','almoco'],6:['cafe','lanche','almoco','lanche','almoco','ceia']}[n];
  return nomes.map((nome,i)=>({nome, dist:dist[i], slot:slot[i]}));
}

// filtro por restrição
function filterFoods(restricoes=[]){
  return getFoods().filter(f=>{
    if(restricoes.includes('vegano') && !f.tags.includes('vgn')) return false;
    if(restricoes.includes('vegetariano') && !(f.tags.includes('veg')||f.tags.includes('vgn'))) return false;
    if(restricoes.includes('sem_lactose') && f.tags.includes('lac')) return false;
    if(restricoes.includes('sem_gluten') && f.tags.includes('glu')) return false;
    return true;
  });
}

// escolhas coerentes por refeição
const PREF = {
  cafe:{prot:['Ovo inteiro','Iogurte grego natural','Whey protein (pó)','Proteína vegana (pó)','Queijo cottage','Tofu'],
        carb:['Aveia em flocos','Pão integral','Tapioca (goma)','Banana','Cuscuz de milho cozido'],
        gord:['Pasta de amendoim','Abacate','Castanha-do-pará']},
  almoco:{prot:['Peito de frango grelhado','Patinho grelhado (magro)','Tilápia grelhada','Ovo inteiro','Tofu','Proteína de soja (PTS) hidratada'],
        carb:['Arroz branco cozido','Batata-doce cozida','Arroz integral cozido','Feijão carioca cozido','Lentilha cozida'],
        gord:['Azeite de oliva'], veg:['Brócolis cozido','Alface','Cenoura','Abobrinha']},
  lanche:{prot:['Iogurte grego natural','Whey protein (pó)','Proteína vegana (pó)','Queijo cottage'],
        carb:['Banana','Aveia em flocos','Maçã','Pão integral','Mamão'],
        gord:['Pasta de amendoim','Amêndoas','Amendoim']},
  ceia:{prot:['Queijo cottage','Iogurte natural integral','Leite desnatado','Tofu'],
        carb:['Mamão','Maçã'], gord:['Castanha-do-pará']}
};
function escolher(pool, slot, cat){
  const prefs = (PREF[slot]||{})[cat]||[];
  for(const nome of prefs){ const f = pool.find(x=>x.nome===nome); if(f) return f; }
  return pool.find(x=>x.cat===cat) || null;
}
function selecaoPadrao(slot, restricoes){
  const pool = filterFoods(restricoes).filter(f=>f.meals.includes(slot));
  return {
    prot: escolher(pool, slot, 'prot'),
    carb: escolher(pool, slot, 'carb') || escolher(pool, slot, 'fruta'),
    gord: escolher(pool, slot, 'gord'),
    veg:  slot==='almoco' ? escolher(pool, slot, 'veg') : null
  };
}

// calcula gramas para bater a meta da refeição
// solver iterativo (Gauss-Seidel): cada fonte fecha o seu macro descontando o que as outras já contribuem
function calcPorcoes(target, sel){
  const round5 = g => Math.max(0, Math.round(g/5)*5);
  const src = {}; // por grama
  ['prot','carb','gord','veg'].forEach(k=>{ if(sel[k]) src[k]={food:sel[k], p:sel[k].p/100, c:sel[k].c/100, ff:sel[k].f/100, kcal:sel[k].kcal/100}; });
  const g = {prot:0, carb:0, gord:0, veg: src.veg?120:0};
  if(src.prot&&src.prot.p>0) g.prot = target.p/src.prot.p;
  if(src.carb&&src.carb.c>0) g.carb = target.c/src.carb.c;
  if(src.gord&&src.gord.ff>0) g.gord = target.f/src.gord.ff;
  const outros = (macro, excl) => { let s=0; for(const k in src){ if(k===excl) continue; s+=g[k]*src[k][macro]; } return s; };
  for(let it=0; it<8; it++){
    if(src.prot&&src.prot.p>0) g.prot = Math.max(0,(target.p - outros('p','prot'))/src.prot.p);
    if(src.carb&&src.carb.c>0) g.carb = Math.max(0,(target.c - outros('c','carb'))/src.carb.c);
    if(src.gord&&src.gord.ff>0) g.gord = Math.max(0,(target.f - outros('ff','gord'))/src.gord.ff);
  }
  g.prot=Math.min(g.prot,500); g.carb=Math.min(g.carb,700); g.gord=Math.min(g.gord,150);
  const itens=[]; let tot={p:0,c:0,f:0,kcal:0};
  ['prot','carb','gord','veg'].forEach(k=>{
    if(!src[k]||g[k]<=0) return;
    const grams=round5(g[k]), gg=grams/100, food=src[k].food;
    const it={nome:food.nome, grams, p:+(food.p*gg).toFixed(1), c:+(food.c*gg).toFixed(1), f:+(food.f*gg).toFixed(1), kcal:Math.round(food.kcal*gg)};
    itens.push(it); tot.p+=it.p; tot.c+=it.c; tot.f+=it.f; tot.kcal+=it.kcal;
  });
  tot.p=Math.round(tot.p); tot.c=Math.round(tot.c); tot.f=Math.round(tot.f);
  return {itens, tot};
}

// plano de treino dimensionado pelo tempo disponível por sessão
function gerarPlanoTreino(a){
  const dias = Math.max(2, Math.min(6, a.anamnese.diasTreino||3));
  const exp = a.anamnese.experiencia || 'iniciante';
  const local = a.anamnese.local || 'academia';
  const lesoes = a.anamnese.lesoes || [];
  const minutos = Math.max(20, Math.min(120, a.anamnese.minutosTreino||60));
  const capExercicio = {iniciante:3, intermediario:4, avancado:5}[exp]; // teto de séries por exercício
  const capSemanal = {iniciante:12, intermediario:16, avancado:20}[exp]; // teto de séries/grupo/semana pela 05-treino, evita superdosar
  const repScheme = a.objetivo==='hipertrofia' ? '8–12 reps' : a.objetivo==='emagrecimento' ? '10–15 reps' : '6–10 reps';
  const rir = exp==='iniciante' ? 'RIR 3 (deixe 3 na reserva)' : exp==='avancado' ? 'RIR 1–2' : 'RIR 2–3';
  // descanso por objetivo e tipo
  const descanso = (comp) => {
    if(a.objetivo==='hipertrofia') return comp ? '90–120 s' : '60–90 s';
    if(a.objetivo==='emagrecimento') return comp ? '60–90 s' : '45–60 s';
    return comp ? '2–3 min' : '60–90 s';
  };
  // minutos estimados por série: descanso médio + ~45 s de execução
  const minPorSerie = (comp) => {
    let rest;
    if(a.objetivo==='hipertrofia') rest = comp ? 105 : 75;
    else if(a.objetivo==='emagrecimento') rest = comp ? 75 : 52;
    else rest = comp ? 150 : 75;
    return (rest + 45)/60;
  };
  const aquecimento = 8; // min de aquecimento e mobilidade
  const orcamento = Math.max(12, minutos - aquecimento);
  const splits = {
    2:[['peito','costas','ombro','biceps','triceps','abdomen'],['quadriceps','posterior','gluteo','panturrilha','abdomen']],
    3:[['peito','ombro','triceps'],['costas','biceps'],['quadriceps','posterior','gluteo','panturrilha']],
    4:[['peito','costas','ombro','triceps','biceps'],['quadriceps','posterior','gluteo','panturrilha'],['peito','costas','ombro','biceps','triceps','abdomen'],['quadriceps','posterior','gluteo','panturrilha']],
    5:[['peito','costas','ombro','biceps','triceps'],['quadriceps','posterior','gluteo','panturrilha'],['peito','ombro','triceps','abdomen'],['costas','biceps','abdomen'],['quadriceps','posterior','gluteo','panturrilha']],
    6:[['peito','ombro','triceps'],['costas','biceps'],['quadriceps','posterior','gluteo','panturrilha'],['peito','ombro','triceps','abdomen'],['costas','biceps','abdomen'],['quadriceps','posterior','gluteo','panturrilha']]
  };
  const eqOk = ex => local==='academia' ? ex.eq.includes('academia')
    : local==='casa_halter' ? (ex.eq.includes('casa')||ex.eq.includes('casa_halter'))
    : ex.eq.includes('casa');
  const safe = ex => !(ex.contra||[]).some(c => lesoes.includes(c));
  const maxExGrupo = gr => (gr==='abdomen'||gr==='panturrilha') ? 1 : (['peito','costas','quadriceps'].includes(gr) ? 3 : 2);
  const dividir = splits[dias];
  const volSemana = {}; // séries por grupo acumuladas na semana

  const treinos = dividir.map((grupos,i)=>{
    const pool = {}; grupos.forEach(gr=>{ pool[gr]=EXS.filter(e=>e.g===gr && eqOk(e) && safe(e)); });
    const exs = [];
    grupos.forEach(gr=>{ const c=pool[gr][0]; if(c) exs.push({exercicio:c.n, grupo:gr, comp:!!c.comp, series:2}); }); // começa enxuto: 1 exercício, 2 séries
    const tempo = () => exs.reduce((s,e)=>s+e.series*minPorSerie(e.comp),0);
    const volGrupo = gr => exs.filter(e=>e.grupo===gr).reduce((s,e)=>s+e.series,0);
    const cabeSemana = gr => (volSemana[gr]||0)+volGrupo(gr) < capSemanal;
    const maxExSessao = Math.max(4, Math.min(9, Math.round(minutos/9))); // ~1 exercício a cada 9 min; 60min≈7, 90min≈9
    // preenche o tempo: 1) leva as séries a um piso de 3, 2) adiciona exercícios até o teto da sessão, 3) aprofunda séries até o teto
    let guard=0;
    while(tempo() < orcamento && guard++ < 400){
      let mexeu=false;
      // 1) piso de 3 séries por exercício antes de espalhar
      for(const e of exs){
        if(e.series >= 3 || e.series >= capExercicio || !cabeSemana(e.grupo)) continue;
        if(tempo()+minPorSerie(e.comp) <= orcamento){ e.series++; mexeu=true; break; }
      }
      if(mexeu) continue;
      // 2) largura: novo exercício, respeitando o teto de exercícios da sessão
      if(exs.length < maxExSessao){
        for(const gr of grupos){
          const usados = exs.filter(e=>e.grupo===gr).length;
          const prox = pool[gr][usados];
          if(usados < maxExGrupo(gr) && prox && cabeSemana(gr)){
            const novo={exercicio:prox.n, grupo:gr, comp:!!prox.comp, series:2};
            if(tempo()+novo.series*minPorSerie(novo.comp) <= orcamento){ exs.push(novo); mexeu=true; break; }
          }
        }
      }
      if(mexeu) continue;
      // 3) profundidade: sobe séries até o teto por exercício
      for(const e of exs){
        if(e.series >= capExercicio || !cabeSemana(e.grupo)) continue;
        if(tempo()+minPorSerie(e.comp) <= orcamento){ e.series++; mexeu=true; break; }
      }
      if(!mexeu) break; // nada mais cabe ou os tetos foram atingidos
    }
    grupos.forEach(gr=> volSemana[gr]=(volSemana[gr]||0)+volGrupo(gr));
    return {nome:`Treino ${String.fromCharCode(65+i)}`, foco:grupos.join(', '), duracaoMin:Math.round(aquecimento+tempo()),
      exercicios: exs.map(e=>({exercicio:e.exercicio, grupo:e.grupo, series:e.series, reps:repScheme, descanso:descanso(e.comp)}))};
  });
  // volume semanal por grupo
  const vol={};
  treinos.forEach(t=>t.exercicios.forEach(e=>{ vol[e.grupo]=(vol[e.grupo]||0)+e.series; }));
  return {dias, experiencia:exp, rir, repScheme, treinos, volume:vol, minutosSessao:minutos,
    cadencia:'Controle a descida em 2–3 s e suba com força, sem deixar a carga cair. Amplitude completa.',
    cardio: a.objetivo==='emagrecimento'
      ? 'LISS 30–40 min 3–4x/semana OU HIIT 2x/semana (10–15 min), fora dos dias de perna pesada.'
      : 'Cardio leve 2x/semana (20–30 min) para saúde cardiovascular, sem prejudicar a recuperação.',
    deload:'A cada 6–8 semanas, semana de deload: reduza ~40% do volume mantendo a técnica.'};
}

// suplementos sugeridos
function suggestSupps(a){
  const usa = a.anamnese.suplementos||[];
  const ordem = ['creatina','whey','cafeina','omega3','vitd'];
  return ordem.map(k=>{
    const s = SUPPS[k]; if(!s) return null;
    const sugerido = (k==='creatina') || (k==='whey') ||
      (k==='cafeina' && a.objetivo!=='manutencao');
    return {key:k, nome:s.nome, dose:s.dose, nota:s.nota, usa:usa.includes(k), sugerido};
  }).filter(Boolean);
}

/* --------------------- motor de ajustes (módulo 08) ---------------------- */
function serieDePeso(a){ return (a.checkins||[]).filter(c=>c.peso).map(c=>({date:c.date,peso:+c.peso})).sort((x,y)=>x.date<y.date?-1:1); }
function mediaMovel(serie, janela=7){
  return serie.map((_,i)=>{ const s=serie.slice(Math.max(0,i-janela+1),i+1); return {date:serie[i].date, peso:+(s.reduce((a,p)=>a+p.peso,0)/s.length).toFixed(2)}; });
}
function tendencia30(serie){
  if(serie.length<2) return null;
  const fim=serie[serie.length-1];
  const alvo=serie.filter(p=>(new Date(fim.date)-new Date(p.date))/86400000<=30);
  if(alvo.length<2) return null;
  const ini=alvo[0], last=alvo[alvo.length-1];
  const dias=Math.max(1,(new Date(last.date)-new Date(ini.date))/86400000);
  return {deltaSemana:+(((last.peso-ini.peso)/dias)*7).toFixed(2), deltaTotal:+(last.peso-ini.peso).toFixed(2)};
}
function aderencia(a, campo){
  const recent=(a.checkins||[]).slice(-14); if(!recent.length) return null;
  const ok=recent.filter(c=>c[campo]==='sim'||c[campo]==='ok').length;
  return Math.round(100*ok/recent.length);
}
function analisarAjustes(a){
  const alertas=[]; const serie=serieDePeso(a); const mm=mediaMovel(serie); const tend=tendencia30(mm);
  const ult=(a.checkins||[]).slice(-7);
  const adTreino=aderencia(a,'treino'), adDieta=aderencia(a,'alimentacao');
  if(tend){
    const d=tend.deltaSemana;
    if(a.objetivo==='emagrecimento'){
      if(d>-0.05 && (adDieta===null||adDieta>=70)) alertas.push({tipo:'warn',t:'Peso estagnado com boa aderência',m:`Média de 30 dias quase parada (${fmt(tend.deltaTotal,1)} kg). Avalie reduzir 5–10% das calorias ou somar passos e cardio. Cheque antes sono e estresse.`});
      else if(d<-1.0) alertas.push({tipo:'warn',t:'Perda rápida demais',m:`Queda de ${fmt(d,2)} kg/semana. Acima de ~1% do peso costuma custar massa magra. Avalie afrouxar o déficit.`});
      else if(d<=-0.05) alertas.push({tipo:'good',t:'Emagrecimento no ritmo',m:`Tendência de ${fmt(d,2)} kg/semana. Ritmo saudável, mantenha.`});
    }
    if(a.objetivo==='hipertrofia'){
      if(d<0.05) alertas.push({tipo:'warn',t:'Ganho travado',m:`Peso quase parado (${fmt(d,2)} kg/sem). Avalie subir 5–8% das calorias, priorizando carbo peri-treino.`});
      else if(d>0.5) alertas.push({tipo:'warn',t:'Ganho rápido demais',m:`${fmt(d,2)} kg/semana tende a acumular gordura. Reduza um pouco o superávit.`});
      else alertas.push({tipo:'good',t:'Ganho controlado',m:`${fmt(d,2)} kg/semana, dentro do esperado.`});
    }
  }
  const sonoRuim=ult.filter(c=>c.sono&&+c.sono<6).length;
  if(sonoRuim>=3) alertas.push({tipo:'bad',t:'Sono insuficiente',m:`${sonoRuim} dos últimos ${ult.length} registros com menos de 6h. Não corte calorias com sono ruim. Priorize o sono primeiro.`});
  const fome=ult.filter(c=>c.saciedade==='baixa').length;
  if(fome>=3) alertas.push({tipo:'warn',t:'Fome alta recorrente',m:`Baixa saciedade em ${fome} registros. Aumente proteína e fibras e reveja a hidratação antes de mexer nas calorias.`});
  const energiaBaixa=ult.filter(c=>c.energia&&+c.energia<=2).length;
  if(energiaBaixa>=3) alertas.push({tipo:'warn',t:'Energia baixa persistente',m:`Energia baixa em ${energiaBaixa} registros. Pode ser recuperação insuficiente ou déficit agressivo. Considere refeed ou diet break.`});
  if(adTreino!==null&&adTreino<60) alertas.push({tipo:'bad',t:'Aderência ao treino baixa',m:`Só ${adTreino}% dos dias com treino (14d). Ajuste horário, duração ou local antes de mudar o plano.`});
  if(adDieta!==null&&adDieta<60) alertas.push({tipo:'bad',t:'Aderência à dieta baixa',m:`Só ${adDieta}% dos dias com dieta ok (14d). Simplifique refeições e reduza restrições antes de cortar calorias.`});
  if(!alertas.length) alertas.push({tipo:'info',t:'Sem sinais que exijam ajuste',m: serie.length<7?'Poucos registros ainda. Mantenha os check-ins por pelo menos uma semana.':'Dados dentro do esperado. Siga o plano e reavalie a cada 2–4 semanas.'});
  return {alertas, serie, mm, tend, adTreino, adDieta};
}

function configPadrao(objetivo){
  const c={atividade:'moderado', deficitPct:20, superavitPct:10, aguaMlKg:35, refeicoes:4};
  if(objetivo==='emagrecimento'){ c.proteinaGkg=2.0; c.gorduraGkg=0.8; }
  else if(objetivo==='hipertrofia'){ c.proteinaGkg=1.8; c.gorduraGkg=0.9; }
  else { c.proteinaGkg=1.8; c.gorduraGkg=0.9; }
  return c;
}

/* ------------------------------- roteador -------------------------------- */
const app = document.getElementById('app');
const titleEl = document.getElementById('topbar-title');
const backBtn = document.getElementById('btn-back');
let route = {name:'home', id:null, tab:'resumo'};
function go(name, id=null, tab='resumo'){
  route={name,id,tab}; window.scrollTo(0,0); render();
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.dataset.nav===name));
  backBtn.hidden = !(name==='aluno'||name==='novo'||name==='mod');
}
backBtn.onclick=()=>go('home');
document.querySelectorAll('[data-nav]').forEach(b=> b.onclick=()=>go(b.dataset.nav));
function render(){
  if(route.name==='home') return renderHome();
  if(route.name==='novo') return renderNovo();
  if(route.name==='aluno') return renderAluno(route.id, route.tab);
  if(route.name==='conhecimento') return renderConhecimento();
  if(route.name==='mod') return renderModulo(route.id);
  renderHome();
}

/* --------------------------------- HOME ---------------------------------- */
function renderHome(){
  titleEl.textContent='NutriCoach';
  const list=store.all().sort((a,b)=>b.updatedAt-a.updatedAt);
  const cards=list.map(a=>{
    const ini=(a.perfil.nome||'?').trim().charAt(0).toUpperCase();
    const obj={emagrecimento:'Emagrecimento',hipertrofia:'Hipertrofia',manutencao:'Manutenção'}[a.objetivo];
    return `<div class="student" data-open="${a.id}"><div class="avatar">${esc(ini)}</div>
      <div class="meta"><b>${esc(a.perfil.nome||'Sem nome')}</b><small>${esc(obj)} · ${(a.checkins||[]).length} check-in(s)</small></div>
      <span class="chevron">›</span></div>`;
  }).join('');
  app.innerHTML=`
    <div class="spread" style="margin-bottom:1rem"><h2 style="margin:0">Seus alunos</h2>
      <button class="btn small" data-nav-inline="novo">+ Novo aluno</button></div>
    ${list.length?cards:`<div class="empty"><div class="big">🗂️</div>Nenhum aluno ainda.<br>Comece cadastrando o primeiro.</div>`}
    <div class="card tight" style="margin-top:1rem"><div class="spread">
      <div><b>Backup</b><br><small class="muted">Importe um .json de aluno exportado antes.</small></div>
      <button class="btn secondary small" id="btn-import">Importar</button></div>
      <input type="file" id="file-import" accept="application/json" class="hidden"></div>
    <p class="footnote">Os dados ficam salvos só neste aparelho. Exporte cada aluno para não perder o histórico.</p>`;
  app.querySelectorAll('[data-open]').forEach(el=>el.onclick=()=>go('aluno',el.dataset.open));
  app.querySelector('[data-nav-inline]').onclick=()=>go('novo');
  const fi=app.querySelector('#file-import');
  app.querySelector('#btn-import').onclick=()=>fi.click(); fi.onchange=importarAluno;
}

/* -------------------------------- NOVO ----------------------------------- */
let draft=null, step=0;
const STEPS=['Identificação','Objetivo & meta','Rotina & treino','Saúde','Alimentação','Estilo & suplementos'];
function renderNovo(){
  titleEl.textContent='Novo aluno';
  if(!draft){
    draft={id:uid(),createdAt:Date.now(),
      perfil:{nome:'',sexo:'M',idade:'',altura:'',peso:'',pesoMeta:''},
      objetivo:'emagrecimento',
      anamnese:{diasTreino:3,minutosTreino:60,experiencia:'iniciante',local:'academia',lesoes:[],condicoes:[],medicamentos:'',
        restricoes:[],alergias:'',naoGosta:'',orcamento:'medio',cozinha:'proprio',alcool:'',cafeina:'',
        sonoHoras:'',sonoQualidade:'media',estresse:'medio',aguaAtual:'',passos:'',gestante:'nao',cicloMenstrual:'',
        suplementos:[]},
      config:configPadrao('emagrecimento'), checkins:[], medidas:[], exames:[], dias:{}};
    step=0;
  }
  const bars=STEPS.map((_,i)=>`<div class="${i<=step?'on':''}"></div>`).join('');
  app.innerHTML=`<div class="stepbar">${bars}</div>
    <div class="card"><h2>${step+1}. ${STEPS[step]}</h2><div id="stepbody"></div></div>
    <div class="row">${step>0?'<button class="btn secondary" id="prev">Voltar</button>':''}
      <button class="btn" id="next">${step<STEPS.length-1?'Continuar':'Salvar aluno'}</button></div>`;
  renderStep();
  const prev=app.querySelector('#prev'); if(prev) prev.onclick=()=>{collectStep(); step--; renderNovo();};
  app.querySelector('#next').onclick=()=>{ if(!collectStep()) return;
    if(step<STEPS.length-1){ step++; renderNovo(); } else { store.upsert(draft); const id=draft.id; draft=null; go('aluno',id); }};
}
function seg(name,val,opts){ return `<div class="seg" data-seg="${name}">${opts.map(([v,l])=>`<button type="button" data-v="${v}" class="${val===v?'on':''}">${l}</button>`).join('')}</div>`; }
function checks(name,sel,opts){ return `<div data-checks="${name}">${opts.map(([v,l])=>`<label style="display:flex;gap:.5rem;align-items:center;color:var(--text);margin:.35rem 0"><input type="checkbox" style="width:auto" value="${v}" ${sel.includes(v)?'checked':''}> ${l}</label>`).join('')}</div>`; }
function renderStep(){
  const b=app.querySelector('#stepbody'); const d=draft;
  if(step===0){
    b.innerHTML=`<label>Nome</label><input id="f-nome" value="${esc(d.perfil.nome)}" placeholder="Nome do aluno">
      <label>Sexo biológico <small>(para o cálculo metabólico)</small></label>${seg('sexo',d.perfil.sexo,[['M','Masculino'],['F','Feminino']])}
      <div class="row"><div><label>Idade</label><input id="f-idade" type="number" inputmode="numeric" value="${esc(d.perfil.idade)}" placeholder="anos"></div>
      <div><label>Altura (cm)</label><input id="f-altura" type="number" inputmode="numeric" value="${esc(d.perfil.altura)}" placeholder="cm"></div></div>
      <label>Peso atual (kg)</label><input id="f-peso" type="number" inputmode="decimal" value="${esc(d.perfil.peso)}" placeholder="kg">`;
  } else if(step===1){
    b.innerHTML=`<label>Objetivo principal</label>${seg('objetivo',d.objetivo,[['emagrecimento','Emagrecer'],['manutencao','Manter'],['hipertrofia','Ganhar massa']])}
      <label>Meta de peso — quantos kg quer atingir</label>
      <input id="f-pesometa" type="number" inputmode="decimal" value="${esc(d.perfil.pesoMeta)}" placeholder="peso-alvo em kg (opcional)">
      <div class="field-help">Ex.: está com 90 e quer chegar a 80. O app estima o prazo pelo ritmo saudável. Deixe em branco em manutenção.</div>
      <div class="alert" style="margin-top:1rem">O app calcula déficit ou superávit conforme o objetivo. Você ajusta depois na tela do aluno.</div>`;
  } else if(step===2){
    b.innerHTML=`<label>Nível de atividade no dia a dia</label>
      <select id="f-atividade">${Object.entries(NAF).map(([k,v])=>`<option value="${k}" ${d.config.atividade===k?'selected':''}>${v.label}</option>`).join('')}</select>
      <div class="row"><div><label>Dias de treino/semana</label><input id="f-dias" type="number" min="2" max="6" value="${esc(d.anamnese.diasTreino)}"></div>
      <div><label>Minutos por treino</label><input id="f-mintreino" type="number" inputmode="numeric" min="20" max="120" step="5" value="${esc(d.anamnese.minutosTreino)}" placeholder="ex: 60"></div></div>
      <label>Passos médios/dia</label><input id="f-passos" type="number" inputmode="numeric" value="${esc(d.anamnese.passos)}" placeholder="ex: 7000">
      <div class="field-help">O treino é montado pra preencher esse tempo. Mais minutos, mais volume. Menos minutos, treino enxuto.</div>
      <label>Experiência com treino</label>${seg('experiencia',d.anamnese.experiencia,[['iniciante','Iniciante'],['intermediario','Intermediário'],['avancado','Avançado']])}
      <label>Onde treina</label>${seg('local',d.anamnese.local,[['academia','Academia'],['casa_halter','Casa c/ halteres'],['casa','Casa s/ equip.']])}
      <label>Lesões / restrições articulares</label>${checks('lesoes',d.anamnese.lesoes,[['ombro','Ombro'],['lombar','Lombar'],['joelho','Joelho'],['cotovelo','Cotovelo']])}
      <div class="field-help">Exercícios de risco para essas áreas são evitados no plano.</div>`;
  } else if(step===3){
    const fem=d.perfil.sexo==='F';
    b.innerHTML=`<label>Condições de saúde relatadas</label>${checks('condicoes',d.anamnese.condicoes,[['diabetes','Diabetes'],['hipertensao','Hipertensão'],['hipotireoidismo','Hipotireoidismo'],['colesterol','Colesterol alto'],['gordura_figado','Gordura no fígado'],['nenhuma','Nenhuma']])}
      <label>Medicamentos em uso</label><textarea id="f-medic" placeholder="Liste medicamentos e doses, se houver">${esc(d.anamnese.medicamentos)}</textarea>
      ${fem?`<label>Situação hormonal / ciclo</label>${seg('gestante',d.anamnese.gestante,[['nao','Nenhuma'],['gestante','Gestante'],['lactante','Lactante'],['menopausa','Menopausa']])}
      <label>Observações do ciclo</label><input id="f-ciclo" value="${esc(d.anamnese.cicloMenstrual)}" placeholder="regularidade, TPM, etc.">`:''}
      <div class="alert warn" style="margin-top:1rem"><b>Importante</b>Casos clínicos (diabetes, gestação, doença renal, transtorno alimentar) exigem acompanhamento presencial. O app organiza e orienta, não substitui consulta.</div>`;
  } else if(step===4){
    b.innerHTML=`<div class="row"><div><label>Refeições/dia</label><input id="f-refeicoes" type="number" min="3" max="6" value="${esc(d.config.refeicoes)}"></div>
      <div><label>Quem cozinha</label><select id="f-cozinha"><option value="proprio" ${d.anamnese.cozinha==='proprio'?'selected':''}>O próprio</option><option value="familia" ${d.anamnese.cozinha==='familia'?'selected':''}>Família</option><option value="fora" ${d.anamnese.cozinha==='fora'?'selected':''}>Come fora/marmita</option></select></div></div>
      <label>Restrições alimentares</label>${checks('restricoes',d.anamnese.restricoes,[['vegetariano','Vegetariano'],['vegano','Vegano'],['sem_lactose','Sem lactose'],['sem_gluten','Sem glúten']])}
      <label>Alergias / intolerâncias</label><input id="f-alergias" value="${esc(d.anamnese.alergias)}" placeholder="ex: camarão, amendoim">
      <label>Alimentos que não gosta</label><input id="f-naogosta" value="${esc(d.anamnese.naoGosta)}" placeholder="ex: jiló, fígado">
      <label>Orçamento para alimentação</label>${seg('orcamento',d.anamnese.orcamento,[['baixo','Baixo'],['medio','Médio'],['alto','Alto']])}`;
  } else if(step===5){
    b.innerHTML=`<div class="row"><div><label>Horas de sono</label><input id="f-sono" type="number" inputmode="decimal" value="${esc(d.anamnese.sonoHoras)}" placeholder="ex: 7"></div>
      <div><label>Água atual (L/dia)</label><input id="f-agua" type="number" inputmode="decimal" value="${esc(d.anamnese.aguaAtual)}" placeholder="ex: 2"></div></div>
      <label>Qualidade do sono</label>${seg('sonoQualidade',d.anamnese.sonoQualidade,[['boa','Boa'],['media','Média'],['ruim','Ruim']])}
      <label>Nível de estresse</label>${seg('estresse',d.anamnese.estresse,[['baixo','Baixo'],['medio','Médio'],['alto','Alto']])}
      <label>Suplementos que usa ou quer usar</label>${checks('suplementos',d.anamnese.suplementos,[['creatina','Creatina'],['whey','Whey / proteína'],['cafeina','Cafeína / pré-treino'],['omega3','Ômega-3'],['vitd','Vitamina D']])}
      <label>Consumo de álcool</label><input id="f-alcool" value="${esc(d.anamnese.alcool)}" placeholder="ex: fim de semana, 2 latas">`;
  }
  b.querySelectorAll('[data-seg]').forEach(g=>{
    const key=g.dataset.seg;
    g.dataset.val = key==='sexo'?draft.perfil.sexo : key==='objetivo'?draft.objetivo : (draft.anamnese[key]!==undefined?draft.anamnese[key]:'');
    g.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{
      g.querySelectorAll('button').forEach(x=>x.classList.remove('on')); btn.classList.add('on'); g.dataset.val=btn.dataset.v;
      if(key==='sexo') draft.perfil.sexo=btn.dataset.v;
      if(key==='objetivo'){ draft.objetivo=btn.dataset.v; draft.config=configPadrao(btn.dataset.v); }
    });
  });
}
function collectStep(){
  const q=id=>app.querySelector(id), d=draft;
  const segVal=n=>{const g=app.querySelector(`[data-seg="${n}"]`); return g?g.dataset.val:null;};
  const checkVals=n=>Array.from(app.querySelectorAll(`[data-checks="${n}"] input:checked`)).map(i=>i.value);
  try{
    if(step===0){
      d.perfil.nome=q('#f-nome').value.trim(); d.perfil.idade=+q('#f-idade').value; d.perfil.altura=+q('#f-altura').value; d.perfil.peso=+q('#f-peso').value; d.perfil.sexo=segVal('sexo')||d.perfil.sexo;
      if(!d.perfil.nome){alert('Informe o nome.');return false;}
      if(!(d.perfil.idade>0&&d.perfil.altura>0&&d.perfil.peso>0)){alert('Preencha idade, altura e peso.');return false;}
    } else if(step===1){ d.objetivo=segVal('objetivo')||d.objetivo; d.perfil.pesoMeta=+q('#f-pesometa').value||''; }
    else if(step===2){ d.config.atividade=q('#f-atividade').value; d.anamnese.diasTreino=+q('#f-dias').value||3; d.anamnese.minutosTreino=Math.max(20,Math.min(120,+q('#f-mintreino').value||60)); d.anamnese.passos=+q('#f-passos').value||''; d.anamnese.experiencia=segVal('experiencia'); d.anamnese.local=segVal('local'); d.anamnese.lesoes=checkVals('lesoes'); }
    else if(step===3){ d.anamnese.condicoes=checkVals('condicoes'); d.anamnese.medicamentos=q('#f-medic').value.trim(); if(d.perfil.sexo==='F'){ d.anamnese.gestante=segVal('gestante')||'nao'; const c=q('#f-ciclo'); if(c) d.anamnese.cicloMenstrual=c.value.trim(); } }
    else if(step===4){ d.config.refeicoes=+q('#f-refeicoes').value||4; d.anamnese.cozinha=q('#f-cozinha').value; d.anamnese.restricoes=checkVals('restricoes'); d.anamnese.alergias=q('#f-alergias').value.trim(); d.anamnese.naoGosta=q('#f-naogosta').value.trim(); d.anamnese.orcamento=segVal('orcamento'); }
    else if(step===5){ d.anamnese.sonoHoras=+q('#f-sono').value||''; d.anamnese.aguaAtual=+q('#f-agua').value||''; d.anamnese.sonoQualidade=segVal('sonoQualidade'); d.anamnese.estresse=segVal('estresse'); d.anamnese.suplementos=checkVals('suplementos'); d.anamnese.alcool=q('#f-alcool').value.trim(); }
    return true;
  }catch(e){ console.error(e); return true; }
}

/* -------------------------------- ALUNO ---------------------------------- */
function renderAluno(id, tab){
  const a=store.get(id); if(!a){ go('home'); return; }
  titleEl.textContent=a.perfil.nome;
  const tabs=[['resumo','Resumo'],['dieta','Dieta'],['dia','Dia'],['treino','Treino'],['checkin','Check-in'],['evolucao','Evolução'],['medidas','Medidas'],['dados','Dados']];
  app.innerHTML=`<div class="subtabs">${tabs.map(([k,l])=>`<button data-tab="${k}" class="${tab===k?'on':''}">${l}</button>`).join('')}</div><div id="alunobody"></div>`;
  app.querySelectorAll('[data-tab]').forEach(bt=>bt.onclick=()=>go('aluno',id,bt.dataset.tab));
  const body=app.querySelector('#alunobody');
  const fn={resumo:tabResumo,dieta:tabDieta,dia:tabDia,treino:tabTreino,checkin:tabCheckin,evolucao:tabEvolucao,medidas:tabMedidas,dados:tabDados}[tab]||tabResumo;
  try{ fn(a, body); }
  catch(err){ console.error(err);
    body.innerHTML=`<div class="alert bad"><b>Ops, algo falhou ao montar esta aba</b>${esc(err&&err.message||err)}</div>
      <p class="field-help">Tire um print desta mensagem e me mande. Enquanto isso, as outras abas seguem funcionando.</p>`; }
}

function tabResumo(a, body){
  const m=calcMetas(a);
  const objLabel={emagrecimento:'Emagrecimento',hipertrofia:'Hipertrofia',manutencao:'Manutenção'}[a.objetivo];
  const proj=projecaoMeta(a);
  let projHtml='';
  if(proj){
    if(proj.atingido) projHtml=`<div class="alert good"><b>Meta atingida</b>Peso atual ${fmt(proj.atual,1)} kg já alcançou a meta de ${fmt(proj.meta,1)} kg. Hora de manter ou definir novo objetivo.</div>`;
    else projHtml=`<div class="card"><h3>Projeção até a meta</h3>
      <div class="metrics"><div class="metric"><div class="k">Atual → meta</div><div class="v">${fmt(proj.atual,1)}→${fmt(proj.meta,1)}</div><div class="u">kg (${fmt(Math.abs(proj.total),1)} kg)</div></div>
      <div class="metric"><div class="k">Ritmo saudável</div><div class="v">${fmt(proj.weeklyKg,2)}</div><div class="u">kg/semana</div></div>
      <div class="metric brand"><div class="k">Prazo estimado</div><div class="v">${proj.weeks}</div><div class="u">semanas (~${fmt(proj.meses,1)} meses)</div></div>
      <div class="metric"><div class="k">Data-alvo</div><div class="v" style="font-size:1rem">${proj.dataAlvo}</div><div class="u">estimativa</div></div></div>
      <p class="field-help">Estimativa por ritmo saudável. A resposta real manda; ajuste nas semanas seguintes.</p></div>`;
  }
  body.innerHTML=`
    <div class="card"><div class="spread"><h2 style="margin:0">Metas diárias</h2><span class="pill info">${objLabel}</span></div>
      <div class="metrics" style="margin-top:.8rem">
        <div class="metric brand"><div class="k">Calorias</div><div class="v">${fmt(m.calorias)}</div><div class="u">kcal/dia</div></div>
        <div class="metric"><div class="k">Proteína</div><div class="v">${fmt(m.proteinaG)}</div><div class="u">g · ${fmt(a.config.proteinaGkg,1)} g/kg</div></div>
        <div class="metric"><div class="k">Carboidrato</div><div class="v">${fmt(m.carboG)}</div><div class="u">g</div></div>
        <div class="metric"><div class="k">Gordura</div><div class="v">${fmt(m.gorduraG)}</div><div class="u">g</div></div>
        <div class="metric"><div class="k">Água</div><div class="v">${fmt(m.agua/1000,1)}</div><div class="u">litros</div></div>
        <div class="metric"><div class="k">Fibra</div><div class="v">${fmt(m.fibra)}</div><div class="u">g</div></div></div></div>
    ${projHtml}
    <div class="card tight"><table>
      <tr><td>Peso usado no cálculo</td><td class="num">${fmt(m.peso,1)} kg</td></tr>
      <tr><td>TMB (Mifflin-St Jeor)</td><td class="num">${fmt(m.tmb)} kcal</td></tr>
      <tr><td>Fator de atividade</td><td class="num">${fmt(m.fator,3)}</td></tr>
      <tr><td>Gasto total (GET)</td><td class="num">${fmt(m.get)} kcal</td></tr>
      <tr><td>${a.objetivo==='emagrecimento'?'Déficit':a.objetivo==='hipertrofia'?'Superávit':'Ajuste'}</td><td class="num">${a.objetivo==='emagrecimento'?'-'+a.config.deficitPct+'%':a.objetivo==='hipertrofia'?'+'+a.config.superavitPct+'%':'0%'}</td></tr></table></div>
    <div class="card"><h3>Ajustar parâmetros</h3><div class="row">
      ${a.objetivo==='emagrecimento'?`<div><label>Déficit (%)</label><input id="c-def" type="number" value="${a.config.deficitPct}"></div>`:''}
      ${a.objetivo==='hipertrofia'?`<div><label>Superávit (%)</label><input id="c-sup" type="number" value="${a.config.superavitPct}"></div>`:''}
      <div><label>Proteína (g/kg)</label><input id="c-prot" type="number" step="0.1" value="${a.config.proteinaGkg}"></div>
      <div><label>Gordura (g/kg)</label><input id="c-gord" type="number" step="0.1" value="${a.config.gorduraGkg}"></div></div>
      <button class="btn secondary small" id="c-save" style="margin-top:.8rem">Recalcular</button></div>`;
  body.querySelector('#c-save').onclick=()=>{
    const def=body.querySelector('#c-def'),sup=body.querySelector('#c-sup');
    if(def)a.config.deficitPct=+def.value; if(sup)a.config.superavitPct=+sup.value;
    a.config.proteinaGkg=+body.querySelector('#c-prot').value; a.config.gorduraGkg=+body.querySelector('#c-gord').value;
    store.upsert(a); renderAluno(a.id,'resumo');
  };
}

// monta os selects de uma refeição e a tabela de gramas
function blocoRefeicao(a, slot, target, sel, idPrefix){
  const pool=filterFoods(a.anamnese.restricoes).filter(f=>f.meals.includes(slot));
  const opt=(cat,cur)=>{
    const items=pool.filter(f=>cat==='carb'?(f.cat==='carb'||f.cat==='fruta'):f.cat===cat);
    if(!items.length) return '';
    const label={prot:'Proteína',carb:'Carbo',gord:'Gordura',veg:'Vegetais'}[cat];
    return `<label>${label}</label><select data-sel="${cat}" data-pfx="${idPrefix}">${items.map(f=>`<option value="${esc(f.nome)}" ${cur&&cur.nome===f.nome?'selected':''}>${esc(f.nome)}</option>`).join('')}</select>`;
  };
  const calc=calcPorcoes(target, sel);
  const linhas=calc.itens.map(i=>`<tr><td>${esc(i.nome)}</td><td class="num">${i.grams} g</td><td class="num">${i.kcal}</td></tr>`).join('');
  return `<div class="row">${opt('prot',sel.prot)}${opt('carb',sel.carb)}</div>
    <div class="row">${opt('gord',sel.gord)}${slot==='almoco'?opt('veg',sel.veg):''}</div>
    <table style="margin-top:.5rem"><tr><th>Alimento</th><th class="num">Qtd</th><th class="num">kcal</th></tr>${linhas}</table>
    <div class="sub" style="margin-top:.3rem">Bate: P ${calc.tot.p}g · C ${calc.tot.c}g · G ${calc.tot.f}g · ${calc.tot.kcal} kcal &nbsp;|&nbsp; meta: P ${Math.round(target.p)} · C ${Math.round(target.c)} · G ${Math.round(target.f)}</div>`;
}

// estado transitório dos selects (por refeição)
let selState={};
function tabDieta(a, body){
  const m=calcMetas(a);
  const slots=mealSlots(a.config.refeicoes);
  selState={};
  const blocos=slots.map((s,i)=>{
    const target={p:m.proteinaG*s.dist, c:m.carboG*s.dist, f:m.gorduraG*s.dist, kcal:m.calorias*s.dist};
    const sel=selecaoPadrao(s.slot, a.anamnese.restricoes);
    selState['d'+i]={slot:s.slot,target,sel};
    return `<div class="block"><div class="spread"><h4>${esc(s.nome)}</h4><span class="pill">${Math.round(target.kcal)} kcal</span></div>
      <div id="d${i}">${blocoRefeicao(a,s.slot,target,sel,'d'+i)}</div></div>`;
  }).join('');
  const supps=suggestSupps(a).map(s=>`<div class="block"><div class="spread"><h4>${esc(s.nome)}</h4>
     ${s.usa?'<span class="pill good">usa</span>':s.sugerido?'<span class="pill info">sugerido</span>':'<span class="pill">opcional</span>'}</div>
     <div class="sub"><b>Dose:</b> ${esc(s.dose)}</div><div class="sub">${esc(s.nota)}</div></div>`).join('');
  body.innerHTML=`
    <div class="card"><h2>Plano alimentar</h2>
      <p class="muted" style="margin:.3rem 0 0">Total do dia: ${fmt(m.calorias)} kcal · P ${m.proteinaG}g · C ${m.carboG}g · G ${m.gorduraG}g</p>
      <p class="field-help">Troque qualquer alimento nos menus — os gramas recalculam sozinhos para bater a meta da refeição.</p></div>
    ${blocos}
    <div class="card"><h3>Suplementos</h3><p class="field-help">Opcionais e baseados em evidência. Comida vem primeiro; caso clínico é com médico.</p>${supps}</div>
    <div class="card"><h3>Alimentos</h3><p class="field-help">A tabela vem pronta. Adicione itens seus (valores por 100 g).</p>
      <button class="btn secondary small" id="add-food">+ Adicionar alimento</button><div id="food-form"></div></div>
    <div class="alert"><b>Como usar</b>São alvos por refeição com gramas calculados. Para o registro do dia com recálculo automático, use a aba <b>Dia</b>.</div>`;
  // troca de alimento -> recalcula bloco
  body.querySelectorAll('[data-sel]').forEach(selEl=> selEl.onchange=()=>{
    const pfx=selEl.dataset.pfx, cat=selEl.dataset.sel, st=selState[pfx];
    const food=getFoods().find(f=>f.nome===selEl.value);
    st.sel[cat]=food;
    body.querySelector('#'+pfx).innerHTML=blocoRefeicao(a, st.slot, st.target, st.sel, pfx);
    // religa handlers do bloco recriado
    body.querySelectorAll('#'+pfx+' [data-sel]').forEach(e2=> e2.onchange=selEl.onchange);
  });
  body.querySelector('#add-food').onclick=()=>{
    const f=body.querySelector('#food-form');
    f.innerHTML=`<div class="row"><div><label>Nome</label><input id="nf-n" placeholder="ex: Frango desfiado"></div>
      <div><label>Categoria</label><select id="nf-cat"><option value="prot">Proteína</option><option value="carb">Carbo</option><option value="gord">Gordura</option><option value="veg">Vegetal</option><option value="fruta">Fruta</option></select></div></div>
      <div class="row"><div><label>kcal/100g</label><input id="nf-k" type="number"></div><div><label>Prot</label><input id="nf-p" type="number"></div>
      <div><label>Carbo</label><input id="nf-c" type="number"></div><div><label>Gord</label><input id="nf-f" type="number"></div></div>
      <button class="btn small" id="nf-save" style="margin-top:.6rem">Salvar alimento</button>`;
    f.querySelector('#nf-save').onclick=()=>{
      const nome=f.querySelector('#nf-n').value.trim(); if(!nome){alert('Nome?');return;}
      customFoods.add({nome,cat:f.querySelector('#nf-cat').value,kcal:+f.querySelector('#nf-k').value||0,
        p:+f.querySelector('#nf-p').value||0,c:+f.querySelector('#nf-c').value||0,f:+f.querySelector('#nf-f').value||0,
        meals:['cafe','lanche','almoco','ceia'],tags:['veg','vgn']});
      renderAluno(a.id,'dieta');
    };
  };
}

/* --------------------------- DIA (adaptativo) ---------------------------- */
let diaSel={}; // diaSel[date][idx] = {prot,carb,gord,veg} nomes
function tabDia(a, body){
  const m=calcMetas(a);
  const date=todayISO();
  const slots=mealSlots(a.config.refeicoes);
  a.dias=a.dias||{};
  const log=a.dias[date]||slots.map(()=>null);
  // consumidos
  const done={p:0,c:0,f:0,kcal:0};
  log.forEach(r=>{ if(r){ done.p+=r.p; done.c+=r.c; done.f+=r.f; done.kcal+=r.kcal; } });
  const restante={p:Math.max(0,m.proteinaG-done.p), c:Math.max(0,m.carboG-done.c), f:Math.max(0,m.gorduraG-done.f), kcal:Math.max(0,m.calorias-done.kcal)};
  const pesoPend=slots.reduce((s,sl,i)=>s+(log[i]?0:sl.dist),0)||1;
  diaSel[date]=diaSel[date]||{};

  const cards=slots.map((s,i)=>{
    if(log[i]){
      const r=log[i];
      return `<div class="block"><div class="spread"><h4>✔ ${esc(s.nome)}</h4><span class="pill good">registrado</span></div>
        <div class="sub">${esc(r.desc||'')}</div><div class="sub">P ${r.p}g · C ${r.c}g · G ${r.f}g · ${r.kcal} kcal</div>
        <button class="btn secondary small" data-undo="${i}" style="margin-top:.5rem">Desfazer</button></div>`;
    }
    const alvo={p:restante.p*s.dist/pesoPend, c:restante.c*s.dist/pesoPend, f:restante.f*s.dist/pesoPend, kcal:restante.kcal*s.dist/pesoPend};
    let sel=selecaoPadrao(s.slot, a.anamnese.restricoes);
    const saved=diaSel[date][i];
    if(saved){ const g=getFoods(); ['prot','carb','gord','veg'].forEach(c=>{ if(saved[c]){ const f=g.find(x=>x.nome===saved[c]); if(f) sel[c]=f; } }); }
    selState['x'+date+i]={slot:s.slot,target:alvo,sel};
    return `<div class="block"><div class="spread"><h4>${esc(s.nome)}</h4><span class="pill">${Math.round(alvo.kcal)} kcal</span></div>
      <div id="x${i}">${blocoRefeicao(a,s.slot,alvo,sel,'x'+date+i)}</div>
      <div class="row" style="margin-top:.5rem"><button class="btn small" data-log="${i}">Comi isso</button>
        <button class="btn secondary small" data-manual="${i}">Registro manual</button></div>
      <div id="man${i}"></div></div>`;
  }).join('');

  const pct=v=>Math.min(100,Math.round(100*v));
  body.innerHTML=`
    <div class="card"><div class="spread"><h2 style="margin:0">Dia — ${date}</h2>
      <button class="btn secondary small" id="reset-dia">Zerar dia</button></div>
      <p class="field-help">Registre cada refeição. Se comer diferente da meta, as refeições seguintes recalculam sozinhas para o dia fechar.</p>
      <table style="margin-top:.5rem"><tr><th>Consumido / meta</th><th class="num">kcal</th><th class="num">P</th><th class="num">C</th><th class="num">G</th></tr>
      <tr><td>Hoje</td><td class="num">${done.kcal}/${m.calorias}</td><td class="num">${Math.round(done.p)}/${m.proteinaG}</td><td class="num">${Math.round(done.c)}/${m.carboG}</td><td class="num">${Math.round(done.f)}/${m.gorduraG}</td></tr></table>
      <div class="stepbar" style="margin-top:.6rem"><div class="on" style="flex:${pct(done.kcal/m.calorias)}"></div><div style="flex:${100-pct(done.kcal/m.calorias)}"></div></div></div>
    ${cards}`;

  // selects -> recalcula e memoriza
  const rewire=()=>body.querySelectorAll('[data-sel]').forEach(selEl=> selEl.onchange=()=>{
    const pfx=selEl.dataset.pfx, cat=selEl.dataset.sel, st=selState[pfx];
    const idx=pfx.slice((date+'x').length-1); // não confiável; usar mapa
    const food=getFoods().find(f=>f.nome===selEl.value); st.sel[cat]=food;
    // memoriza escolha
    const i=+pfx.replace('x'+date,''); diaSel[date][i]=diaSel[date][i]||{}; diaSel[date][i][cat]=food.nome;
    const cont=selEl.closest('.block').querySelector('[id^="x"]');
    cont.innerHTML=blocoRefeicao(a, st.slot, st.target, st.sel, pfx); rewire();
  });
  rewire();
  body.querySelectorAll('[data-log]').forEach(bt=> bt.onclick=()=>{
    const i=+bt.dataset.log, st=selState['x'+date+i];
    const calc=calcPorcoes(st.target, st.sel);
    const desc=calc.itens.map(x=>`${x.nome} ${x.grams}g`).join(', ');
    salvarRefeicao(a,date,slots,i,{p:calc.tot.p,c:calc.tot.c,f:calc.tot.f,kcal:calc.tot.kcal,desc});
  });
  body.querySelectorAll('[data-manual]').forEach(bt=> bt.onclick=()=>{
    const i=+bt.dataset.manual, cont=body.querySelector('#man'+i);
    cont.innerHTML=`<div class="row" style="margin-top:.5rem"><div><label>Prot</label><input id="mm-p${i}" type="number"></div>
      <div><label>Carbo</label><input id="mm-c${i}" type="number"></div><div><label>Gord</label><input id="mm-f${i}" type="number"></div></div>
      <input id="mm-d${i}" placeholder="o que comeu (opcional)" style="margin-top:.4rem">
      <button class="btn small" id="mm-s${i}" style="margin-top:.5rem">Salvar</button>`;
    cont.querySelector('#mm-s'+i).onclick=()=>{
      const p=+cont.querySelector('#mm-p'+i).value||0,c=+cont.querySelector('#mm-c'+i).value||0,f=+cont.querySelector('#mm-f'+i).value||0;
      salvarRefeicao(a,date,slots,i,{p,c,f,kcal:Math.round(p*4+c*4+f*9),desc:cont.querySelector('#mm-d'+i).value.trim()});
    };
  });
  body.querySelectorAll('[data-undo]').forEach(bt=> bt.onclick=()=>{
    const i=+bt.dataset.undo; a.dias[date][i]=null; store.upsert(a); renderAluno(a.id,'dia');
  });
  body.querySelector('#reset-dia').onclick=()=>{ if(confirm('Zerar os registros de hoje?')){ delete a.dias[date]; delete diaSel[date]; store.upsert(a); renderAluno(a.id,'dia'); } };
}
function salvarRefeicao(a,date,slots,i,rec){
  a.dias=a.dias||{}; if(!a.dias[date]) a.dias[date]=slots.map(()=>null);
  a.dias[date][i]=rec; store.upsert(a); renderAluno(a.id,'dia');
}

// última sessão registrada de um exercício (para prefill)
function ultimaSessaoEx(a, exercicio){
  const sess=((a.treinoLog||{}).sessions)||[];
  for(let i=sess.length-1;i>=0;i--){
    const ex=sess[i].exercicios.find(e=>e.exercicio===exercicio);
    if(ex) return {date:sess[i].date, sets:ex.sets};
  }
  return null;
}
let treinoAtivo=null; // sessão em andamento (em memória)

function tabTreino(a, body){
  const t=gerarPlanoTreino(a);
  if(treinoAtivo && treinoAtivo.alunoId===a.id){ return editorTreino(a, body, t); }
  // tela inicial: iniciar treino + histórico + plano
  const botoes=t.treinos.map((tr,i)=>`<button class="btn small" data-start="${i}" style="margin:.2rem 0">▶ ${esc(tr.nome)} · ~${tr.duracaoMin}min — ${esc(tr.foco)}</button>`).join('');
  const sess=((a.treinoLog||{}).sessions)||[];
  const hist=sess.slice(-8).reverse().map(s=>{
    const load=s.exercicios.reduce((sum,e)=>sum+e.sets.filter(x=>x.feito).reduce((z,x)=>z+(+x.peso||0)*(+x.reps||0),0),0);
    const nsets=s.exercicios.reduce((n,e)=>n+e.sets.filter(x=>x.feito).length,0);
    return `<tr><td>${esc(s.date)}</td><td>${esc(s.nome)}</td><td class="num">${nsets}</td><td class="num">${fmt(load)} kg·rep</td></tr>`;
  }).join('');
  const gruposPt={peito:'Peito',costas:'Costas',ombro:'Ombro',biceps:'Bíceps',triceps:'Tríceps',quadriceps:'Quadríceps',posterior:'Posterior',gluteo:'Glúteo',panturrilha:'Panturrilha',abdomen:'Abdômen'};
  const volRows=Object.entries(t.volume).map(([g,v])=>`<tr><td>${gruposPt[g]||g}</td><td class="num">${v} séries/sem</td></tr>`).join('');
  const planos=t.treinos.map(tr=>`<div class="block"><h4>${esc(tr.nome)} <span class="pill">${esc(tr.foco)}</span> <span class="pill info">~${tr.duracaoMin}min</span></h4>
    <table style="margin-top:.4rem"><tr><th>Exercício</th><th class="num">Séries</th><th>Reps</th><th>Descanso</th></tr>
    ${tr.exercicios.map(e=>`<tr><td>${esc(e.exercicio)}</td><td class="num">${e.series}</td><td>${esc(e.reps)}</td><td>${esc(e.descanso)}</td></tr>`).join('')}</table></div>`).join('');
  body.innerHTML=`
    <div class="card"><div class="spread"><h2 style="margin:0">Treino de hoje</h2><span class="pill info">${t.dias}x/sem · ~${t.minutosSessao}min · ${esc(t.experiencia)}</span></div>
      <p class="field-help">Escolha o treino do dia e registre cada série: peso, repetições e se executou.</p>${botoes}</div>
    ${sess.length?`<div class="card tight"><h3>Histórico</h3><table><tr><th>Data</th><th>Treino</th><th class="num">Séries</th><th class="num">Volume</th></tr>${hist}</table>
      <p class="field-help">Volume = soma de peso × reps das séries feitas. Subir com o tempo é o sinal de progressão.</p></div>`:''}
    <div class="card"><h3>Plano completo (referência)</h3>${planos}
      <div class="alert" style="margin-top:.6rem"><b>Cadência</b>${esc(t.cadencia)}</div>
      <div class="card tight" style="margin:.6rem 0 0"><h3>Volume semanal por grupo</h3><table>${volRows}</table></div>
      <div class="alert warn" style="margin-top:.6rem"><b>Deload</b>${esc(t.deload)}</div>
      <div class="alert"><b>Cardio</b>${esc(t.cardio)}</div></div>`;
  body.querySelectorAll('[data-start]').forEach(bt=> bt.onclick=()=>{
    const tr=t.treinos[+bt.dataset.start];
    treinoAtivo={alunoId:a.id, nome:tr.nome, foco:tr.foco, date:todayISO(),
      exercicios:tr.exercicios.map(e=>{
        const ult=ultimaSessaoEx(a, e.exercicio);
        const nSets=e.series;
        const sets=[];
        for(let i=0;i<nSets;i++){ const p=ult&&ult.sets[i]; sets.push({peso:p?p.peso:'', reps:p?p.reps:'', feito:false}); }
        return {exercicio:e.exercicio, reps:e.reps, descanso:e.descanso, meta:ult?ult.date:null, sets};
      })};
    renderAluno(a.id,'treino');
  });
}

function editorTreino(a, body, t){
  const s=treinoAtivo;
  const exsHtml=s.exercicios.map((ex,ei)=>{
    const ult=ultimaSessaoEx(a, ex.exercicio);
    const ref=ult?`última: ${ult.sets.map(x=>`${x.peso||'–'}×${x.reps||'–'}`).join(', ')}`:'primeira vez com este exercício';
    const linhas=ex.sets.map((st,si)=>`<tr>
      <td class="num">${si+1}</td>
      <td><input type="number" inputmode="decimal" data-e="${ei}" data-s="${si}" data-k="peso" value="${esc(st.peso)}" placeholder="kg" style="padding:.45rem"></td>
      <td><input type="number" inputmode="numeric" data-e="${ei}" data-s="${si}" data-k="reps" value="${esc(st.reps)}" placeholder="reps" style="padding:.45rem"></td>
      <td class="num"><input type="checkbox" data-e="${ei}" data-s="${si}" data-k="feito" ${st.feito?'checked':''} style="width:22px;height:22px"></td>
    </tr>`).join('');
    return `<div class="block"><div class="spread"><h4>${esc(ex.exercicio)}</h4><span class="pill">${esc(ex.reps)} · desc. ${esc(ex.descanso)}</span></div>
      <div class="sub">${esc(ref)}</div>
      <table style="margin-top:.4rem"><tr><th class="num">#</th><th>Peso</th><th>Reps</th><th class="num">✓</th></tr>${linhas}</table>
      <div class="row" style="margin-top:.4rem"><button class="btn secondary small" data-addset="${ei}">+ série</button><button class="btn secondary small" data-delset="${ei}">− série</button></div></div>`;
  }).join('');
  body.innerHTML=`
    <div class="card"><div class="spread"><h2 style="margin:0">${esc(s.nome)}</h2><span class="pill info">${esc(s.foco)}</span></div>
      <p class="field-help">Marque o ✓ nas séries que você fez. Peso e reps já vêm da última vez — ajuste conforme o treino.</p></div>
    ${exsHtml}
    <div class="row"><button class="btn secondary" id="cancelar">Descartar</button><button class="btn" id="concluir">Concluir e salvar</button></div>`;
  // inputs
  body.querySelectorAll('input[data-e]').forEach(inp=> inp.onchange=()=>{
    const ei=+inp.dataset.e, si=+inp.dataset.s, k=inp.dataset.k;
    s.exercicios[ei].sets[si][k] = k==='feito'?inp.checked : (inp.value===''?'':+inp.value);
  });
  body.querySelectorAll('[data-addset]').forEach(bt=> bt.onclick=()=>{ const ei=+bt.dataset.addset; const last=s.exercicios[ei].sets.slice(-1)[0]||{peso:'',reps:''}; s.exercicios[ei].sets.push({peso:last.peso,reps:last.reps,feito:false}); renderAluno(a.id,'treino'); });
  body.querySelectorAll('[data-delset]').forEach(bt=> bt.onclick=()=>{ const ei=+bt.dataset.delset; if(s.exercicios[ei].sets.length>1) s.exercicios[ei].sets.pop(); renderAluno(a.id,'treino'); });
  body.querySelector('#cancelar').onclick=()=>{ if(confirm('Descartar este treino sem salvar?')){ treinoAtivo=null; renderAluno(a.id,'treino'); } };
  body.querySelector('#concluir').onclick=()=>{
    const feitas=s.exercicios.some(ex=>ex.sets.some(x=>x.feito));
    if(!feitas && !confirm('Nenhuma série marcada como feita. Salvar mesmo assim?')) return;
    a.treinoLog=a.treinoLog||{sessions:[]};
    a.treinoLog.sessions.push({date:s.date, nome:s.nome, foco:s.foco,
      exercicios:s.exercicios.map(ex=>({exercicio:ex.exercicio, sets:ex.sets.map(x=>({peso:x.peso,reps:x.reps,feito:!!x.feito}))}))});
    store.upsert(a); treinoAtivo=null; renderAluno(a.id,'treino');
  };
}

function tabCheckin(a, body){
  const hoje=todayISO(); const jaHoje=(a.checkins||[]).find(c=>c.date===hoje); const c=jaHoje||{};
  body.innerHTML=`<div class="card"><h2>Check-in diário</h2><small class="muted">${jaHoje?'Editando o registro de hoje':'Registro de '+hoje}</small>
    <div class="row"><div><label>Peso (kg)</label><input id="k-peso" type="number" step="0.1" inputmode="decimal" value="${esc(c.peso||'')}"></div>
    <div><label>Sono (h)</label><input id="k-sono" type="number" step="0.5" value="${esc(c.sono||'')}"></div></div>
    <div class="row"><div><label>Passos</label><input id="k-passos" type="number" value="${esc(c.passos||'')}"></div>
    <div><label>Água (L)</label><input id="k-agua" type="number" step="0.1" value="${esc(c.agua||'')}"></div></div>
    <label>Treinou hoje?</label>${seg('k-treino',c.treino||'',[['sim','Sim'],['nao','Não'],['descanso','Descanso']])}
    <label>Seguiu a dieta?</label>${seg('k-alim',c.alimentacao||'',[['sim','Sim'],['parcial','Parcial'],['nao','Não']])}
    <label>Saciedade (fome)</label>${seg('k-sac',c.saciedade||'',[['alta','Saciado'],['media','Ok'],['baixa','Com fome']])}
    <div class="row"><div><label>Energia (1–5)</label><input id="k-energia" type="number" min="1" max="5" value="${esc(c.energia||'')}"></div>
    <div><label>Humor (1–5)</label><input id="k-humor" type="number" min="1" max="5" value="${esc(c.humor||'')}"></div></div>
    <div class="row"><div><label>Estresse (1–5)</label><input id="k-estresse" type="number" min="1" max="5" value="${esc(c.estresse||'')}"></div>
    <div><label>Dor (1–5)</label><input id="k-dor" type="number" min="1" max="5" value="${esc(c.dor||'')}"></div></div>
    <label>Digestão / observações</label><textarea id="k-obs" placeholder="Intestino, digestão, como foi o dia...">${esc(c.obs||'')}</textarea>
    <button class="btn" id="k-save" style="margin-top:.8rem">${jaHoje?'Atualizar check-in':'Salvar check-in'}</button></div>
    ${(a.checkins||[]).length?`<div class="card tight"><h3>Últimos registros</h3><table><tr><th>Data</th><th class="num">Peso</th><th class="num">Sono</th><th>Treino</th></tr>
    ${a.checkins.slice(-7).reverse().map(x=>`<tr><td>${esc(x.date)}</td><td class="num">${x.peso?fmt(x.peso,1):'—'}</td><td class="num">${x.sono||'—'}</td><td>${esc(x.treino||'—')}</td></tr>`).join('')}</table></div>`:''}`;
  body.querySelectorAll('[data-seg]').forEach(g=>{
    g.dataset.val=c[{'k-treino':'treino','k-alim':'alimentacao','k-sac':'saciedade'}[g.dataset.seg]]||'';
    g.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{g.querySelectorAll('button').forEach(x=>x.classList.remove('on'));btn.classList.add('on');g.dataset.val=btn.dataset.v;});
  });
  body.querySelector('#k-save').onclick=()=>{
    const g=n=>body.querySelector(`[data-seg="${n}"]`).dataset.val;
    const rec={date:hoje,peso:+body.querySelector('#k-peso').value||'',sono:+body.querySelector('#k-sono').value||'',
      passos:+body.querySelector('#k-passos').value||'',agua:+body.querySelector('#k-agua').value||'',
      treino:g('k-treino'),alimentacao:g('k-alim'),saciedade:g('k-sac'),
      energia:+body.querySelector('#k-energia').value||'',humor:+body.querySelector('#k-humor').value||'',
      estresse:+body.querySelector('#k-estresse').value||'',dor:+body.querySelector('#k-dor').value||'',obs:body.querySelector('#k-obs').value.trim()};
    a.checkins=(a.checkins||[]).filter(x=>x.date!==hoje).concat(rec).sort((x,y)=>x.date<y.date?-1:1);
    store.upsert(a); go('aluno',a.id,'evolucao');
  };
}

let chartRefs=[];
function tabEvolucao(a, body){
  const an=analisarAjustes(a);
  const alertHtml=an.alertas.map(al=>`<div class="alert ${al.tipo}"><b>${esc(al.t)}</b>${esc(al.m)}</div>`).join('');
  const tend=an.tend;
  body.innerHTML=`<div class="card"><h2>Análise automática</h2><small class="muted">Baseada nas Regras de Ajustes e no Sistema de Evolução</small>
    <div style="margin-top:.7rem">${alertHtml}</div></div>
    ${an.serie.length?`<div class="card"><h3>Peso — registros e média móvel de 7 dias</h3><canvas id="chart-peso" height="180"></canvas>
    ${tend?`<div class="metrics" style="margin-top:.8rem"><div class="metric"><div class="k">Tendência 30d</div><div class="v">${fmt(tend.deltaSemana,2)}</div><div class="u">kg/semana</div></div>
    <div class="metric"><div class="k">Variação 30d</div><div class="v">${fmt(tend.deltaTotal,1)}</div><div class="u">kg</div></div></div>`:''}</div>`:`<div class="empty"><div class="big">📈</div>Ainda sem peso registrado.<br>Faça check-ins para ver a tendência.</div>`}
    ${an.adTreino!==null?`<div class="card tight"><h3>Aderência (14 dias)</h3><div class="metrics">
    <div class="metric"><div class="k">Treino</div><div class="v">${fmt(an.adTreino)}%</div></div>
    <div class="metric"><div class="k">Dieta</div><div class="v">${an.adDieta!==null?fmt(an.adDieta)+'%':'—'}</div></div></div></div>`:''}`;
  chartRefs.forEach(c=>{try{c.destroy()}catch(e){}}); chartRefs=[];
  if(an.serie.length && window.Chart){
    chartRefs.push(new Chart(body.querySelector('#chart-peso'),{type:'line',
      data:{labels:an.serie.map(p=>p.date.slice(5)),datasets:[
        {label:'Peso',data:an.serie.map(p=>p.peso),borderColor:'#38bdf8',pointRadius:2,tension:.2},
        {label:'Média 7d',data:an.mm.map(p=>p.peso),borderColor:'#14b8a6',borderWidth:2,pointRadius:0,tension:.3}]},
      options:{plugins:{legend:{labels:{color:'#93a3bd'}}},scales:{x:{ticks:{color:'#93a3bd',maxTicksLimit:7},grid:{color:'#22314c'}},y:{ticks:{color:'#93a3bd'},grid:{color:'#22314c'}}}}}));
  }
}

function tabMedidas(a, body){
  const meds=a.medidas||[];
  body.innerHTML=`<div class="card"><h2>Medidas corporais</h2>
    <div class="row"><div><label>Data</label><input id="med-date" type="date" value="${todayISO()}"></div><div><label>% Gordura</label><input id="med-gc" type="number" step="0.1"></div></div>
    <div class="row"><div><label>Cintura (cm)</label><input id="med-cintura" type="number" step="0.1"></div><div><label>Quadril (cm)</label><input id="med-quadril" type="number" step="0.1"></div></div>
    <div class="row"><div><label>Braço (cm)</label><input id="med-braco" type="number" step="0.1"></div><div><label>Coxa (cm)</label><input id="med-coxa" type="number" step="0.1"></div></div>
    <button class="btn secondary small" id="med-save" style="margin-top:.8rem">Salvar medida</button></div>
    ${meds.length?`<div class="card tight"><table><tr><th>Data</th><th class="num">Cintura</th><th class="num">Quadril</th><th class="num">%GC</th></tr>
    ${meds.slice().reverse().map(mm=>`<tr><td>${esc(mm.date)}</td><td class="num">${mm.cintura||'—'}</td><td class="num">${mm.quadril||'—'}</td><td class="num">${mm.gorduraPct||'—'}</td></tr>`).join('')}</table></div>`:`<div class="empty"><div class="big">📏</div>Sem medidas ainda.</div>`}`;
  body.querySelector('#med-save').onclick=()=>{
    const rec={date:body.querySelector('#med-date').value||todayISO(),gorduraPct:+body.querySelector('#med-gc').value||'',
      cintura:+body.querySelector('#med-cintura').value||'',quadril:+body.querySelector('#med-quadril').value||'',
      braco:+body.querySelector('#med-braco').value||'',coxa:+body.querySelector('#med-coxa').value||''};
    a.medidas=(a.medidas||[]).filter(x=>x.date!==rec.date).concat(rec).sort((x,y)=>x.date<y.date?-1:1);
    store.upsert(a); renderAluno(a.id,'medidas');
  };
}

function tabDados(a, body){
  const an=a.anamnese, linha=(k,v)=>`<tr><td>${k}</td><td>${esc(v||'—')}</td></tr>`;
  const suppLabels={creatina:'Creatina',whey:'Whey',cafeina:'Cafeína',omega3:'Ômega-3',vitd:'Vit. D'};
  body.innerHTML=`<div class="card tight"><h3>Anamnese</h3><table>
    ${linha('Idade',a.perfil.idade+' anos')}${linha('Altura',a.perfil.altura+' cm')}${linha('Peso inicial',a.perfil.peso+' kg')}
    ${a.perfil.pesoMeta?linha('Meta de peso',a.perfil.pesoMeta+' kg'):''}
    ${linha('Atividade',(NAF[a.config.atividade]||{}).label)}${linha('Treino',an.diasTreino+'x/sem · '+an.experiencia+' · '+an.local)}
    ${linha('Lesões',(an.lesoes||[]).join(', '))}${linha('Condições',(an.condicoes||[]).join(', '))}${linha('Medicamentos',an.medicamentos)}
    ${linha('Restrições',(an.restricoes||[]).join(', '))}${linha('Alergias',an.alergias)}${linha('Não gosta',an.naoGosta)}
    ${linha('Suplementos',(an.suplementos||[]).map(s=>suppLabels[s]||s).join(', '))}
    ${linha('Sono',an.sonoHoras+'h · '+an.sonoQualidade)}${linha('Estresse',an.estresse)}
    ${a.perfil.sexo==='F'?linha('Situação hormonal',an.gestante):''}</table></div>
    <div class="card"><h3>Backup e gestão</h3><button class="btn" id="d-export">Exportar aluno (.json)</button>
    <button class="btn secondary" id="d-json" style="margin-top:.6rem">Ver dados brutos</button>
    <button class="btn danger" id="d-del" style="margin-top:.6rem">Excluir aluno</button>
    <p class="field-help">Exporte com frequência. É o único backup do histórico deste aparelho.</p></div>`;
  body.querySelector('#d-export').onclick=()=>exportarAluno(a);
  body.querySelector('#d-json').onclick=()=>{const w=window.open('','_blank'); if(w) w.document.write('<pre>'+esc(JSON.stringify(a,null,2))+'</pre>');};
  body.querySelector('#d-del').onclick=()=>{ if(confirm('Excluir '+a.perfil.nome+'? Exporte antes se quiser manter o histórico.')){ store.remove(a.id); go('home'); } };
}

/* --------------------------- export / import ----------------------------- */
function exportarAluno(a){
  const blob=new Blob([JSON.stringify(a,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob);
  const link=document.createElement('a'); const nome=(a.perfil.nome||'aluno').toLowerCase().replace(/[^a-z0-9]+/g,'-');
  link.href=url; link.download=`nutricoach-${nome}-${todayISO()}.json`; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
}
function importarAluno(ev){
  const file=ev.target.files[0]; if(!file) return; const reader=new FileReader();
  reader.onload=()=>{ try{ const obj=JSON.parse(reader.result); if(!obj.perfil||!obj.id) throw 0; if(store.get(obj.id)) obj.id=uid(); store.upsert(obj); go('aluno',obj.id); }catch(e){ alert('Arquivo inválido. Use um .json exportado pelo NutriCoach.'); } };
  reader.readAsText(file); ev.target.value='';
}

/* ----------------------------- CONHECIMENTO ------------------------------ */
const MODULOS=[['01-persona','Persona'],['02-fluxo-de-atendimento','Fluxo de atendimento'],['03-anamnese','Anamnese'],['04-nutricao','Nutrição'],['05-treino','Treino'],['06-banco-de-exercicios','Banco de exercícios'],['07-acompanhamento','Acompanhamento'],['08-regras-de-ajustes','Regras de ajustes'],['09-diario','Diário'],['10-evidencias-cientificas','Evidências científicas'],['11-casos-especiais','Casos especiais'],['12-comunicacao','Comunicação'],['13-sistema-de-evolucao','Sistema de evolução'],['14-suplementos','Suplementos']];
function renderConhecimento(){
  titleEl.textContent='Base de conhecimento';
  app.innerHTML=`<div class="card"><h2>O cérebro do sistema</h2><p class="muted">Os 13 módulos que definem como o nutricionista raciocina. O app aplica essa lógica; aqui você lê a fundamentação.</p></div>
    ${MODULOS.map(([slug,nome],i)=>`<div class="student" data-mod="${slug}"><div class="avatar">${i+1}</div><div class="meta"><b>${esc(nome)}</b></div><span class="chevron">›</span></div>`).join('')}`;
  app.querySelectorAll('[data-mod]').forEach(el=>el.onclick=()=>go('mod',el.dataset.mod));
}
function renderModulo(slug){
  const nome=(MODULOS.find(m=>m[0]===slug)||[])[1]||'Módulo'; titleEl.textContent=nome;
  app.innerHTML=`<div class="card md-body" id="md">Carregando…</div>`;
  fetch(`conhecimento/${slug}.md`).then(r=>{if(!r.ok)throw 0;return r.text();}).then(txt=>{app.querySelector('#md').innerHTML=miniMarkdown(txt);})
    .catch(()=>{app.querySelector('#md').innerHTML='<p class="muted">Não foi possível carregar o módulo. Ele fica em <code>conhecimento/'+esc(slug)+'.md</code>.</p>';});
}
function miniMarkdown(md){
  const lines=md.replace(/\r/g,'').split('\n'); let html='',inList=false,inCode=false,inTable=false;
  const inline=s=>esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/`(.+?)`/g,'<code>$1</code>');
  const closeList=()=>{if(inList){html+='</ul>';inList=false;}}; const closeTable=()=>{if(inTable){html+='</table>';inTable=false;}};
  for(let raw of lines){
    if(raw.trim().startsWith('```')){ if(inCode){html+='</pre>';inCode=false;} else {closeList();closeTable();html+='<pre>';inCode=true;} continue; }
    if(inCode){ html+=esc(raw)+'\n'; continue; }
    const line=raw.trimEnd();
    if(/^\|.*\|$/.test(line.trim())){ const cells=line.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim()); if(/^[-: ]+$/.test(cells.join(''))) continue; if(!inTable){closeList();html+='<table>';inTable=true;} html+='<tr>'+cells.map(c=>`<td>${inline(c)}</td>`).join('')+'</tr>'; continue; } else closeTable();
    if(/^### /.test(line)){closeList();html+=`<h3>${inline(line.slice(4))}</h3>`;}
    else if(/^## /.test(line)){closeList();html+=`<h2>${inline(line.slice(3))}</h2>`;}
    else if(/^# /.test(line)){closeList();html+=`<h1>${inline(line.slice(2))}</h1>`;}
    else if(/^[-*] /.test(line)){if(!inList){html+='<ul>';inList=true;}html+=`<li>${inline(line.slice(2))}</li>`;}
    else if(line.trim()===''){closeList();}
    else {closeList();html+=`<p>${inline(line)}</p>`;}
  }
  closeList();closeTable();if(inCode)html+='</pre>'; return html;
}

/* ------------------------------- start ----------------------------------- */
/* pede ao navegador para NÃO descartar os dados salvos. No Android/Chrome com o app na tela de início, sem isto o sistema apaga o localStorage quando quer. */
if(navigator.storage && navigator.storage.persist){
  navigator.storage.persisted().then(function(jaPersistente){ if(!jaPersistente) navigator.storage.persist(); }).catch(function(){});
}
go('home');
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
