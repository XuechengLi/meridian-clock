/* =========================================
   经络时钟主脚本
   ========================================= */

// 时辰 → 经络名称与图片映射
const meridians = [
  { name: '肝经',  start: 1, end: 3, img: 'images/1_dan.png', desc: '子时，肝经旺，宜入眠养胆，修复机体。' },
  { name: '肺经',  start: 3, end: 5,  img: 'images/2_gan.png', desc: '丑时，肺经旺，宜熟睡解毒，让气血调畅。' },
  { name: '大肠经',  start: 5, end: 7,  img: 'images/3_fei.png', desc: '寅时，大肠经旺，宜深呼吸，促进气体交换。' },
  { name: '胃经', start: 7, end: 9, img: 'images/4_dachang.png' , desc: '卯时，胃经旺，宜排便清理体内废物。' },
  { name: '脾经',  start: 9, end: 11, img: 'images/5_wei.png' , desc: '辰时，脾经旺，宜进食早餐，补充能量。' },
  { name: '心经',  start: 11, end: 13, img: 'images/6_pi.png' , desc: '巳时，心经旺，宜消化吸收，增强体质。' },
  { name: '小肠经',  start: 13, end: 15, img: 'images/7_xin.png', desc: '午时，小肠经旺，宜心情舒畅，促进血液循环。' },
  { name: '膀胱经', start: 15, end: 17, img: 'images/8_xiaochang.png', desc: '未时，膀胱经旺，宜吸收营养，排除废物。' },
  { name: '肾经', start: 17, end: 19, img: 'images/9_pangguang.png', desc: '申时，肾经旺，宜排尿，清除体内毒素。' },
  { name: '心包经',  start: 19, end: 21, img: 'images/10_shen.png', desc: '酉时，心包经旺，宜休息养肾，增强体力。' },
  { name: '三焦经', start: 21, end: 22, img: 'images/11_xinbao.png', desc: '戌时，三焦经旺，宜调节情绪，保护心脏。' },
  { name: '胆经', start: 23, end: 1, img: 'images/12_sanjiao.png', desc: '亥时，胆经旺，宜放松身心，促进代谢。' },
];

// 根据当前小时确定时辰与经络
function getCurrentMeridian() {
  const h = new Date().getHours();
  return meridians.find(m => {        
    if (m.start > m.end) { 
      // 处理跨年/跨天逻辑（如 23 到 1 点）
      return h >= m.start || h < m.end;
    }
    // 正常范围判断
    return h >= m.start && h < m.end;
  }) || meridians[0]; 

  for (const m of meridians) {
    if (m.hours.includes(h)) return m;
  }
  return meridians[0]; // fallback
}

// 更新时间与图片
function updateClock() {
  const now = new Date();
  const meridian = getCurrentMeridian();



  // 更新文字
  const info = document.getElementById('time-info');
  const hourStr = now.toTimeString().slice(0, 5);
  info.textContent = `北京时间 ${hourStr} — 当前：${meridian.name}`;

  // 更新图片
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

// 启动定时刷新（每分钟检查一次）
updateClock();
setInterval(updateClock, 60 * 1000);

