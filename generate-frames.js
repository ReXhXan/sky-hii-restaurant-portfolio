const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

const NUM_FRAMES = 120;
const WIDTH = 1920;
const HEIGHT = 1080;
const OUTPUT_DIR = path.join(__dirname, 'public', 'assets', 'sequence');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generated 3D assets
const PIZZA_PATH = 'C:\\Users\\REHAN RAZZA KHAN\\.gemini\\antigravity\\brain\\08fa160a-b361-4c37-b379-f743d0d5dbe8\\sketch_pizza_1772964667509.png';
const BURGER_PATH = 'C:\\Users\\REHAN RAZZA KHAN\\.gemini\\antigravity\\brain\\08fa160a-b361-4c37-b379-f743d0d5dbe8\\sketch_burger_1772964683690.png';
const BIRYANI_PATH = 'C:\\Users\\REHAN RAZZA KHAN\\.gemini\\antigravity\\brain\\08fa160a-b361-4c37-b379-f743d0d5dbe8\\sketch_biryani_1772964701115.png';

async function main() {
  console.log(`Loading assets...`);
  const pizzaImg = await loadImage(PIZZA_PATH);
  const burgerImg = await loadImage(BURGER_PATH);
  const biryaniImg = await loadImage(BIRYANI_PATH);

  console.log(`Generating ${NUM_FRAMES} frames for isometric 3D assemble effect...`);

  function drawEllipse(ctx, x, y, radiusX, radiusY, rotation = 0) {
      ctx.beginPath();
      ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
  }

  function easeOutBounce(x) {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (x < 1 / d1) return n1 * x * x;
      else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
      else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
      else return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }

  function easeInOutCubic(x) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  for (let i = 1; i <= NUM_FRAMES; i++) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const progress = i / NUM_FRAMES;
    
    let assembleProgress = Math.min(progress / 0.4, 1.0);
    let rotateProgress = Math.max((progress - 0.4) / 0.6, 0.0);
    
    const bounceY = easeOutBounce(assembleProgress);
    const smoothRotate = easeInOutCubic(rotateProgress) * Math.PI * 2; 

    const cx = WIDTH / 2;
    const cy = HEIGHT / 2 + 100; 

    const tableRX = 450;
    const tableRY = 180;

    // Table Base
    ctx.fillStyle = '#2d1b15'; 
    drawEllipse(ctx, cx, cy + 40, tableRX, tableRY);
    ctx.fill();
    ctx.fillRect(cx - tableRX, cy, tableRX * 2, 40);

    // Table Top
    drawEllipse(ctx, cx, cy, tableRX, tableRY);
    const woodTopGrad = ctx.createLinearGradient(cx - tableRX, cy - tableRY, cx + tableRX, cy + tableRY);
    woodTopGrad.addColorStop(0, '#795548');
    woodTopGrad.addColorStop(0.5, '#5d4037');
    woodTopGrad.addColorStop(1, '#3e2723');
    ctx.fillStyle = woodTopGrad;
    ctx.fill();

    ctx.strokeStyle = '#4e342e';
    ctx.lineWidth = 3;
    for (let r = 0.2; r < 1.0; r += 0.2) {
        drawEllipse(ctx, cx, cy, tableRX * r, tableRY * r);
        ctx.stroke();
    }

    const items = [
        { img: pizzaImg, angleOffset: 0 },
        { img: burgerImg, angleOffset: (Math.PI * 2) / 3 },
        { img: biryaniImg, angleOffset: ((Math.PI * 2) / 3) * 2 }
    ];

    items.forEach(item => {
        const finalAngle = item.angleOffset + smoothRotate;
        const radiusFactor = 0.65; 
        const isoX = cx + Math.cos(finalAngle) * (tableRX * radiusFactor);
        const isoY = cy + Math.sin(finalAngle) * (tableRY * radiusFactor);
        const flyHeightOffset = -800 * (1 - bounceY);
        const zDepth = Math.sin(finalAngle); 
        
        item.isoX = isoX;
        item.groundY = isoY;
        item.drawY = isoY + flyHeightOffset - 30;
        item.zDepth = zDepth;
        
        const dropScale = 1 + (1 - bounceY) * 2; 
        item.scale = (1 + zDepth * 0.2) * dropScale;

        item.shadowAlpha = Math.max(0.05, 0.5 - ((1 - bounceY) * 0.4));
        item.shadowScaleX = item.scale * (1 + (1 - bounceY));
        item.shadowScaleY = item.scale * 0.3 * (1 + (1 - bounceY));
    });

    items.sort((a, b) => a.zDepth - b.zDepth);

    items.forEach(item => {
        // Shadow/Plate
        ctx.save();
        ctx.translate(item.isoX, item.groundY);
        
        drawEllipse(ctx, 0, 0, 80 * item.shadowScaleX, 40 * item.shadowScaleY);
        ctx.fillStyle = `rgba(0, 0, 0, ${item.shadowAlpha})`;
        ctx.fill();
        
        if (assembleProgress > 0.05) {
            drawEllipse(ctx, 0, 0, 100 * (1 + item.zDepth * 0.2), 45 * (1 + item.zDepth * 0.2));
            const plateGrad = ctx.createLinearGradient(0, -45, 0, 45);
            plateGrad.addColorStop(0, '#444');
            plateGrad.addColorStop(1, '#222');
            ctx.fillStyle = plateGrad;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#666';
            ctx.stroke();
        }
        ctx.restore();

        // Image
        ctx.save();
        ctx.translate(item.isoX, item.drawY);
        ctx.scale(item.scale, item.scale);
        
        // Ensure image fits nicely above the plate, assuming square generated images (200x200 drawn size)
        const imgSize = 160;
        
        // Enable screen blend mode to drop the black background and only draw the white sketch lines
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(item.img, -imgSize/2, -imgSize/2, imgSize, imgSize);
        ctx.globalCompositeOperation = 'source-over'; // reset
        ctx.restore();
    });

    // Cinematic letterboxing
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, WIDTH, 120);
    ctx.fillRect(0, HEIGHT - 120, WIDTH, 120);

    const fileName = `dish-frame-${i.toString().padStart(3, '0')}.png`;
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), buffer);
  }

  console.log('Done!');
}

main().catch(console.error);
