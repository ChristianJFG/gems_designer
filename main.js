// Initialize Fabric.js canvas
const canvas = new fabric.Canvas('teeth-canvas');

// Set teeth image as background
fabric.Image.fromURL('assets/teeth_model.jpg', function(img) {
  // Scale image to fit canvas
  const scale = Math.min(
    canvas.width / img.width,
    canvas.height / img.height
  );
  img.set({
    left: 0,
    top: 0,
    scaleX: scale,
    scaleY: scale,
    selectable: false,
    evented: false
  });
  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
});

// List of gem shapes (add more kinds)
const gemShapes = [
  { name: 'Circle', draw: () => new fabric.Circle({ radius: 25, fill: '#00bcd4', stroke: '#0097a7', strokeWidth: 3 }), icon: (ctx) => { ctx.beginPath(); ctx.arc(25,25,20,0,2*Math.PI); ctx.fillStyle='#00bcd4'; ctx.fill(); ctx.strokeStyle='#0097a7'; ctx.lineWidth=3; ctx.stroke(); } },
  { name: 'Triangle', draw: () => new fabric.Triangle({ width: 50, height: 50, fill: '#ffeb3b', stroke: '#fbc02d', strokeWidth: 3 }), icon: (ctx) => { ctx.beginPath(); ctx.moveTo(25,5); ctx.lineTo(45,45); ctx.lineTo(5,45); ctx.closePath(); ctx.fillStyle='#ffeb3b'; ctx.fill(); ctx.strokeStyle='#fbc02d'; ctx.lineWidth=3; ctx.stroke(); } },
  { name: 'Rectangle', draw: () => new fabric.Rect({ width: 50, height: 35, fill: '#8bc34a', stroke: '#558b2f', strokeWidth: 3, rx: 8, ry: 8 }), icon: (ctx) => { ctx.beginPath(); ctx.moveTo(8,8); ctx.lineTo(42,8); ctx.lineTo(42,42); ctx.lineTo(8,42); ctx.closePath(); ctx.fillStyle='#8bc34a'; ctx.fill(); ctx.strokeStyle='#558b2f'; ctx.lineWidth=3; ctx.stroke(); } },
  { name: 'Ellipse', draw: () => new fabric.Ellipse({ rx: 25, ry: 15, fill: '#9c27b0', stroke: '#6a1b9a', strokeWidth: 3 }), icon: (ctx) => { ctx.beginPath(); ctx.ellipse(25,25,20,12,0,0,2*Math.PI); ctx.fillStyle='#9c27b0'; ctx.fill(); ctx.strokeStyle='#6a1b9a'; ctx.lineWidth=3; ctx.stroke(); } },
  { name: 'Diamond', draw: () => new fabric.Polygon([{x:25,y:5},{x:45,y:25},{x:25,y:45},{x:5,y:25}], { fill: '#00e676', stroke: '#008e5b', strokeWidth: 3 }), icon: (ctx) => { ctx.beginPath(); ctx.moveTo(25,5); ctx.lineTo(45,25); ctx.lineTo(25,45); ctx.lineTo(5,25); ctx.closePath(); ctx.fillStyle='#00e676'; ctx.fill(); ctx.strokeStyle='#008e5b'; ctx.lineWidth=3; ctx.stroke(); } },
  { name: 'Pentagon', draw: () => new fabric.Polygon([{x:25,y:5},{x:45,y:18},{x:37,y:45},{x:13,y:45},{x:5,y:18}], { fill: '#ff9800', stroke: '#e65100', strokeWidth: 3 }), icon: (ctx) => { ctx.beginPath(); ctx.moveTo(25,5); ctx.lineTo(45,18); ctx.lineTo(37,45); ctx.lineTo(13,45); ctx.lineTo(5,18); ctx.closePath(); ctx.fillStyle='#ff9800'; ctx.fill(); ctx.strokeStyle='#e65100'; ctx.lineWidth=3; ctx.stroke(); } },
  { name: 'Hexagon', draw: () => new fabric.Polygon([{x:10,y:25},{x:20,y:7},{x:40,y:7},{x:50,y:25},{x:40,y:43},{x:20,y:43}], { fill: '#03a9f4', stroke: '#01579b', strokeWidth: 3 }), icon: (ctx) => { ctx.beginPath(); ctx.moveTo(10,25); ctx.lineTo(20,7); ctx.lineTo(40,7); ctx.lineTo(50,25); ctx.lineTo(40,43); ctx.lineTo(20,43); ctx.closePath(); ctx.fillStyle='#03a9f4'; ctx.fill(); ctx.strokeStyle='#01579b'; ctx.lineWidth=3; ctx.stroke(); } },
  { name: 'Drop', draw: () => new fabric.Path('M25 5 Q45 30 25 45 Q5 30 25 5 Z', { fill: '#f06292', stroke: '#ad1457', strokeWidth: 3 }), icon: (ctx) => { ctx.beginPath(); ctx.moveTo(25,5); ctx.quadraticCurveTo(45,30,25,45); ctx.quadraticCurveTo(5,30,25,5); ctx.closePath(); ctx.fillStyle='#f06292'; ctx.fill(); ctx.strokeStyle='#ad1457'; ctx.lineWidth=3; ctx.stroke(); } },
  { name: 'Moon', draw: () => new fabric.Path('M35 25 A15 15 0 1 1 20 10 Q30 25 35 25 Z', { fill: '#fff176', stroke: '#fbc02d', strokeWidth: 3 }), icon: (ctx) => { ctx.beginPath(); ctx.arc(25,25,15,Math.PI*0.2,Math.PI*1.8,false); ctx.quadraticCurveTo(30,25,35,25); ctx.closePath(); ctx.fillStyle='#fff176'; ctx.fill(); ctx.strokeStyle='#fbc02d'; ctx.lineWidth=3; ctx.stroke(); } },
  { name: 'Star', draw: () => new fabric.Polygon([
    {x:25,y:0},{x:32,y:18},{x:50,y:18},{x:36,y:29},{x:41,y:47},{x:25,y:37},{x:9,y:47},{x:14,y:29},{x:0,y:18},{x:18,y:18}
  ], { fill: '#e91e63', stroke: '#ad1457', strokeWidth: 3, scaleX:1, scaleY:1 }), icon: (ctx) => { ctx.save(); ctx.translate(25,25); ctx.rotate(-Math.PI/10); ctx.beginPath(); for(let i=0;i<5;i++){ctx.lineTo(0,20);ctx.translate(0,20);ctx.rotate((Math.PI*2/10));ctx.lineTo(0,-20);ctx.translate(0,-20);ctx.rotate(-(Math.PI*6/10));} ctx.closePath(); ctx.restore(); ctx.fillStyle='#e91e63'; ctx.fill(); ctx.strokeStyle='#ad1457'; ctx.lineWidth=3; ctx.stroke(); } },
  { name: 'Heart', draw: () => new fabric.Path('M 25 30 Q 25 10 50 10 Q 75 10 75 30 Q 75 50 50 70 Q 25 50 25 30 Z', {
    fill: '#f44336', stroke: '#b71c1c', strokeWidth: 3, scaleX:0.5, scaleY:0.5
  }), icon: (ctx) => { ctx.beginPath(); ctx.moveTo(25,30); ctx.quadraticCurveTo(25,10,50,10); ctx.quadraticCurveTo(75,10,75,30); ctx.quadraticCurveTo(75,50,50,70); ctx.quadraticCurveTo(25,50,25,30); ctx.closePath(); ctx.save(); ctx.scale(0.33,0.33); ctx.translate(0,10); ctx.fillStyle='#f44336'; ctx.fill(); ctx.strokeStyle='#b71c1c'; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); } }
];

const paletteDiv = document.getElementById('palette');
paletteDiv.innerHTML = '<h2>Gems</h2>';

gemShapes.forEach((shape, idx) => {
  const btn = document.createElement('button');
  btn.className = 'gem-btn';
  btn.style.margin = '8px 0';
  btn.style.width = '56px';
  btn.style.height = '56px';
  btn.style.padding = '0';
  btn.style.background = 'none';
  btn.style.border = 'none';
  btn.style.display = 'flex';
  btn.style.alignItems = 'center';
  btn.style.justifyContent = 'center';
  btn.style.cursor = 'pointer';
  // Create a mini-canvas for the icon
  const icon = document.createElement('canvas');
  icon.width = 50;
  icon.height = 50;
  icon.style.pointerEvents = 'none';
  shape.icon(icon.getContext('2d'));
  btn.appendChild(icon);
  btn.onclick = () => {
    // Add the shape to the center of the canvas
    const obj = shape.draw();
    obj.set({ left: canvas.width/2 - 25, top: canvas.height/2 - 25 });
    canvas.add(obj);
    canvas.setActiveObject(obj);
  };
  paletteDiv.appendChild(btn);
});

// --- Render shiny color palette in its own bar ---
const shinyPaletteDiv = document.getElementById('shiny-palette');
shinyPaletteDiv.innerHTML = '<div class="shiny-label">Shiny Colors</div>';

const shinyColors = [
  { name: 'Gold', hex: '#FFD700', gradient: 'linear-gradient(135deg, #FFD700 60%, #FFFACD 100%)' },
  { name: 'Silver', hex: '#C0C0C0', gradient: 'linear-gradient(135deg, #C0C0C0 60%, #F8F8FF 100%)' },
  { name: 'Rose Gold', hex: '#E6C7C2', gradient: 'linear-gradient(135deg, #E6C7C2 60%, #FFD1DC 100%)' },
  { name: 'Platinum', hex: '#E5E4E2', gradient: 'linear-gradient(135deg, #E5E4E2 60%, #F8F8FF 100%)' },
  { name: 'Bronze', hex: '#CD7F32', gradient: 'linear-gradient(135deg, #CD7F32 60%, #FFDAB9 100%)' },
  { name: 'Diamond', hex: '#E0EFFF', gradient: 'linear-gradient(135deg, #E0EFFF 60%, #FFFFFF 100%)' }
];

shinyColors.forEach((col) => {
  const btn = document.createElement('button');
  btn.className = 'shiny-btn';
  btn.title = col.name;
  btn.style.margin = '8px 0';
  btn.style.padding = '0';
  btn.style.background = 'none';
  btn.style.border = 'none';
  btn.style.display = 'flex';
  btn.style.alignItems = 'center';
  btn.style.justifyContent = 'center';
  btn.style.cursor = 'pointer';
  // Create a high-res canvas for shiny effect
  const icon = document.createElement('canvas');
  icon.width = 48;
  icon.height = 48;
  icon.style.width = '36px';
  icon.style.height = '36px';
  icon.style.pointerEvents = 'none';
  const ctx = icon.getContext('2d');
  // Draw shiny effect
  // 1. Base color (radial gradient)
  const grad = ctx.createRadialGradient(24, 24, 8, 24, 24, 24);
  grad.addColorStop(0, '#fff');
  grad.addColorStop(0.18, '#fff');
  grad.addColorStop(0.22, col.hex);
  grad.addColorStop(0.95, col.hex);
  grad.addColorStop(1, '#bbb');
  ctx.beginPath();
  ctx.arc(24, 24, 22, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  // 2. Highlight (ellipse)
  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.beginPath();
  ctx.ellipse(18, 16, 8, 4, Math.PI / 6, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 6;
  ctx.fill();
  ctx.restore();
  // 3. Sparkle
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(30, 30, 2, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
  btn.appendChild(icon);
  btn.onclick = function() {
    colorPicker.value = col.hex;
    const obj = canvas.getActiveObject();
    if (obj && obj.set) {
      obj.set('fill', col.hex);
      if ('stroke' in obj) {
        obj.set('stroke', col.hex);
      }
      canvas.requestRenderAll();
    }
  };
  shinyPaletteDiv.appendChild(btn);
});

// Enable controls for all objects (move, scale, rotate)
canvas.on('object:added', function(e) {
  if (e.target) {
    e.target.set({
      hasControls: true,
      hasBorders: true,
      selectable: true
    });
  }
});

// Export functionality
const exportBtn = document.getElementById('export-btn');
exportBtn.onclick = function() {
  const dataURL = canvas.toDataURL({ format: 'png' });
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'teeth-design.png';
  link.click();
};

// --- Drag to Garbage Bin to Delete ---
const garbageBin = document.getElementById('garbage-bin');
let isOverBin = false;

// Helper: get bin position
function getBinRect() {
  const rect = garbageBin.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY
  };
}

canvas.on('object:moving', function(e) {
  const obj = e.target;
  const pointer = canvas.getPointer(e.e);
  const abs = canvas.getElement().getBoundingClientRect();
  const objX = abs.left + window.scrollX + obj.left * canvas.getZoom();
  const objY = abs.top + window.scrollY + obj.top * canvas.getZoom();
  const bin = getBinRect();
  // Check if center of object is over bin
  isOverBin = (objX > bin.left && objX < bin.right && objY > bin.top && objY < bin.bottom);
  garbageBin.style.background = isOverBin ? '#ffb6c1' : '#fff0f7';
});

canvas.on('mouse:up', function(e) {
  if (isOverBin && e.target && e.target !== canvas.backgroundImage) {
    canvas.remove(e.target);
    isOverBin = false;
    garbageBin.style.background = '#fff0f7';
  }
});

// --- Duplicate selected object ---
const duplicateBtn = document.getElementById('duplicate-btn');
duplicateBtn.addEventListener('click', function() {
  const obj = canvas.getActiveObject();
  if (obj && obj.clone) {
    obj.clone(function(cloned) {
      cloned.set({
        left: (obj.left || 0) + 30,
        top: (obj.top || 0) + 30,
        evented: true
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.requestRenderAll();
    });
  }
});

// --- Color Picker for Selected Object ---
const colorPicker = document.getElementById('color-picker');
canvas.on('selection:created', updateColorPicker);
canvas.on('selection:updated', updateColorPicker);
canvas.on('selection:cleared', function() {
  colorPicker.value = '#ff69b4';
});

function updateColorPicker(e) {
  const obj = e.selected[0];
  if (obj && obj.fill) {
    // Convert fill to hex if needed
    let fill = obj.fill;
    if (fill.startsWith('rgb')) {
      colorPicker.value = rgbToHex(fill);
    } else {
      colorPicker.value = fill;
    }
  }
}

colorPicker.addEventListener('input', function() {
  const obj = canvas.getActiveObject();
  if (obj && obj.set) {
    obj.set('fill', colorPicker.value);
    if ('stroke' in obj) {
      obj.set('stroke', colorPicker.value);
    }
    canvas.requestRenderAll();
  }
});

// Helper: Convert rgb/rgba to hex
function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result) return '#ff69b4';
  return (
    '#' +
    ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2]))
      .toString(16)
      .slice(1)
  );
} 