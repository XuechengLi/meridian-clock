/* ======================================================
   经络时钟主脚本
   ====================================================== */

// -------------------------------
// 1️⃣ 基础数据
// -------------------------------
const meridians = [
  { name: '胆经', hours: [23, 0], img: 'images/12_sanjiao.png', element: 'wood',
    info: '胆经主决断，晚23–1时最旺，宜早睡养胆。', desc: '子时：足少阳胆经（五行属木， 23-1，愤怒）' },
  { name: '肝经', hours: [1, 2], img: 'images/1_dan.png', element: 'wood',
    info: '肝经通情志，夜1–3时最旺，不宜熬夜。', desc: '丑时：足厥阴肝经（五行属木， 1-3，愤怒）' },
  { name: '肺经', hours: [3, 4], img: 'images/2_gan.png', element: 'metal',
    info: '肺朝百脉，3–5时宜深呼吸养肺。', desc: '寅时：手太阴肺经（五行属金， 3-5，易生负面情绪：懊恼，悲伤）' },
  { name: '大肠经', hours: [5, 6], img: 'images/3_fei.png', element: 'metal',
    info: '5–7时宜排便，大肠通畅则颜面光洁。', desc: '卯时：手阳明大肠经（五行属金， 5-7，懊恼，悲伤）' },
  { name: '胃经', hours: [7, 8], img: 'images/4_dachang.png', element: 'earth',
    info: '7–9时胃经旺，宜进食早餐补充能量。', desc: '辰时：足阳明胃经（五行属土， 7-9，抱怨，忧虑）' },
  { name: '脾经', hours: [9, 10], img: 'images/5_wei.png', element: 'earth',
    info: '9–11时脾经主运化，宜学习思考。', desc: '巳时：足太阴脾经（五行属土， 9-11，抱怨，忧虑）' },
  { name: '心经', hours: [11, 12], img: 'images/6_pi.png', element: 'fire',
    info: '11–13时心经旺，午时心气旺宜午休。', desc: '午时：手少阴心经（五行属火， 11-13，易生负面情绪：仇恨，癫喜）' },
  { name: '小肠经', hours: [13, 14], img: 'images/7_xin.png', element: 'fire',
    info: '13–15时分清泌浊，助消化吸收。', desc: '未时：手太阳小肠经（五行属火， 13-15，仇恨，癫喜）' },
  { name: '膀胱经', hours: [15, 16], img: 'images/8_xiaochang.png', element: 'water',
    info: '15–17时宜勤走动、多喝水助水代谢。', desc: '申时：足太阳膀胱经（五行属水， 15-17，厌烦，恐惧）' },
  { name: '肾经', hours: [17, 18], img: 'images/9_pangguang.png', element: 'water',
    info: '17–19时肾主藏精，宜温补强身。', desc: '酉时：足少阴肾经（五行属水， 17-19，厌烦，恐惧）' },
  { name: '心包经', hours: [19, 20], img: 'images/10_shen.png', element: 'fire',
    info: '19–21时心包护心，宜静心放松。', desc: '戌时：手厥阴心包经（五行属火 ，19-21，情绪空档期）' },
  { name: '三焦经', hours: [21, 22], img: 'images/11_xinbao.png', element: 'fire',
    info: '21–23时宜放松身心，准备入睡。', desc: '亥时：手少阳三焦经（五行属火， 21-23，情绪空档期）' },
];

// 五行颜色配置
const elementColors = {
  wood: '#e8f5e9',  // 淡绿
  fire: '#f30f31ff',  // 淡红
  earth: '#fff3e0', // 淡黄
  metal: '#d3d3ccff', // 近白
  water: '#e1f5fe'  // 淡蓝
};

// ============================
// 五行主题颜色定义
// ============================
const themeColors = {
  '金': '#f9f9f7',  // 白
  '木': '#b7d3b0',  // 绿
  '水': '#2f2e2d',  // 黑
  '火': '#e57373',  // 红
  '土': '#f6e4b6'   // 黄
};

// -------------------------------
// 2️⃣ 获取当前时辰经络
// -------------------------------
function getCurrentMeridianIndex(date = new Date()) {
  const h = date.getHours();
  return meridians.findIndex(m => m.hours.includes(h));
}

// -------------------------------
// 3️⃣ 刷新主界面内容
// -------------------------------
let currentIndex = getCurrentMeridianIndex();



function updateClock() {
  const now = new Date();
  const meridian = getCurrentMeridian();

  const info = document.getElementById('time-info');
  const hourStr = now.toTimeString().slice(0, 5);
  info.textContent = `北京时间 ${hourStr} — 当前：${meridian.name}`;

  const img = document.getElementById('meridian-img');
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = meridian.img;
    img.alt = meridian.name;
    img.style.opacity = 1;
  }, 500);

  // 更新说明卡
  const descBox = document.getElementById('meridian-desc');
  descBox.textContent = meridian.desc;
}

function updateDisplay() {
  const now = new Date();
  const m = meridians[currentIndex];

  // 1. 更新顶部文字
  document.getElementById('time-info').textContent = 
    `北京时间 ${now.toTimeString().slice(0,5)} — 当前：${m.name}`;

  // 2. 更新描述 desc (解决你不显示文字的问题)
  const descBox = document.getElementById('meridian-desc');
  if (descBox) descBox.textContent = m.desc;

  // 3. 更新图片 (加入错误处理)
  const img = document.getElementById('meridian-img');
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = m.img;
    img.alt = m.name;
    // 如果图片加载失败的补救逻辑
    img.onerror = () => { img.src = 'images/default.png'; };
    img.style.opacity = 1;
  }, 500);

  // 4. 更新五行背景色
  const themeColor = elementColors[m.element] || '#f9f5f0';
  document.documentElement.style.setProperty('--theme-color', themeColor);

  // 5. 更新随机提示语
  const quote = document.getElementById('quote');
  quote.style.opacity = 0;
  setTimeout(() => {
    quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    quote.style.opacity = 1;
  }, 500);

  updateCountdown();
}

// -------------------------------
// 4️⃣ 手动切换功能
// -------------------------------
document.getElementById('prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + meridians.length) % meridians.length;
  updateDisplay();
});
document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % meridians.length;
  updateDisplay();
});

// -------------------------------
// 5️⃣ 信息卡弹出逻辑
// -------------------------------
const infoCard = document.getElementById('info-card');
document.getElementById('close-info').addEventListener('click', () => {
  infoCard.classList.add('hidden');
});
document.getElementById('meridian-img').addEventListener('click', () => {
  const m = meridians[currentIndex];
  document.getElementById('info-title').textContent = m.name;
  document.getElementById('info-desc').textContent = m.info;
  infoCard.classList.remove('hidden');
});

// -------------------------------
// 6️⃣ 倒计时提示
// -------------------------------
function updateCountdown() {
  const now = new Date();
  const nextIndex = (currentIndex + 1) % meridians.length;
  // 下一时辰起点小时
  const nextHour = meridians[nextIndex].hours[0];
  let target = new Date(now);
  let targetHour = nextHour;
  // 若目标小时 <= 当前小时 → 到次日
  if (targetHour <= now.getHours()) target.setDate(target.getDate() + 1);
  target.setHours(targetHour, 0, 0, 0);

  const diff = target - now;
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const cd = document.getElementById('countdown');
  cd.textContent = `下个时辰剩余：${mins} 分 ${secs} 秒`;
}

// -------------------------------
// 7️⃣ 背景动态线动画（气流象征）
// -------------------------------
const canvas = document.getElementById('flow-bg');
const ctx = canvas.getContext('2d');
let width, height, lines = [];
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 初始化几条随机流线
for (let i = 0; i < 20; i++) {
  lines.push({
    x: Math.random() * width,
    y: Math.random() * height,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    radius: 1 + Math.random() * 2,
    alpha: 0.2 + Math.random() * 0.3
  });
}

// 动画绘制：柔和移动的“气”
function drawBackground() {
  ctx.clearRect(0, 0, width, height);
  for (const l of lines) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(150,120,90,${l.alpha})`;
    ctx.arc(l.x, l.y, l.radius, 0, Math.PI * 2);
    ctx.fill();
    // 位移
    l.x += l.speedX;
    l.y += l.speedY;
    // 边界反弹
    if (l.x < 0 || l.x > width) l.speedX *= -1;
    if (l.y < 0 || l.y > height) l.speedY *= -1;
  }
  requestAnimationFrame(drawBackground);
}
drawBackground(); // 启动动画

// -------------------------------
// 8️⃣ 启动自动刷新逻辑
// -------------------------------
updateDisplay(); // 初始化
setInterval(() => {
  // 自然时间对应的经络更新（防止手动后不同步）
  currentIndex = getCurrentMeridianIndex();
  updateDisplay();
}, 2 * 60 * 60 * 1000); // 每两个小时更新（你可调短试验）

// 每秒更新倒计时