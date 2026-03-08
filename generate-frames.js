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

  function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
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
    
    // Instead of bounce, we just use a smooth fade-in / scale-up
    const appearY = easeOutCubic(assembleProgress);
    const smoothRotate = easeInOutCubic(rotateProgress) * Math.PI * 2; 

    const cx = WIDTH / 2;
    const cy = HEIGHT / 2 + 100; 

    const tableRX = 450;
    const tableRY = 180;

    // Minimalist Aesthetic Pedestal Ring
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + (appearY * 0.1)})`;
    ctx.lineWidth = 1;
    drawEllipse(ctx, cx, cy, tableRX + 20, tableRY + 20);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255, 255, 255, ${appearY * 0.4})`;
    ctx.lineWidth = 2;
    drawEllipse(ctx, cx, cy, tableRX, tableRY);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255, 255, 255, ${appearY * 0.05})`;
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
        const zDepth = Math.sin(finalAngle); 
        
        item.isoX = isoX;
        item.groundY = isoY;
        
        // Items rise gently from slightly below, and scale up from 0
        const riseOffset = 50 * (1 - appearY);
        item.drawY = isoY + riseOffset - 30;
        item.zDepth = zDepth;
        
        // Scale handles both perspective depth and initial assembly scaling
        item.scale = (1 + zDepth * 0.2) * (appearY * 1.5);

        item.shadowAlpha = appearY * 0.5;
        item.shadowScaleX = item.scale;
        item.shadowScaleY = item.scale * 0.3;
        item.opacity = appearY;
    });

    items.sort((a, b) => a.zDepth - b.zDepth);

    items.forEach(item => {
        // Shadow/Glow (replaces bulky plates)
        ctx.save();
        ctx.translate(item.isoX, item.groundY);
        
        drawEllipse(ctx, 0, 0, 80 * item.shadowScaleX, 40 * item.shadowScaleY);
        ctx.fillStyle = `rgba(0, 0, 0, ${item.shadowAlpha})`;
        ctx.fill();
        
        if (assembleProgress > 0.05) {
            // A subtle minimalist ring instead of a full physical plate
            drawEllipse(ctx, 0, 0, 90 * (1 + item.zDepth * 0.2) * item.opacity, 40 * (1 + item.zDepth * 0.2) * item.opacity);
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * item.opacity})`;
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
        ctx.globalAlpha = item.opacity;
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(item.img, -imgSize/2, -imgSize/2, imgSize, imgSize);
        ctx.globalCompositeOperation = 'source-over'; // reset
        ctx.globalAlpha = 1.0;
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
