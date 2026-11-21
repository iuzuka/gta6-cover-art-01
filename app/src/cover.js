export const GRID_LAYOUTS = {
  3: { rows: 2, cols: 2, skip: [3] },
  4: { rows: 2, cols: 2 },
  5: { rows: 2, cols: 3 },
  6: { rows: 2, cols: 3 }
};

export function drawCover(canvas, photo, captionText, gridSize = 4, cw, ch) {
  const ctx = canvas.getContext('2d');
  const w = cw || canvas.width;
  const h = ch || canvas.height;

  if (!photo) {
    ctx.fillStyle = '#0d0a15';
    ctx.fillRect(0, 0, w, h);
    return;
  }

  const scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight);
  const coveredW = photo.naturalWidth * scale;
  const coveredH = photo.naturalHeight * scale;
  const offsetX = (coveredW - w) / 2;
  const offsetY = (coveredH - h) / 2;

  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, 'rgba(66, 0, 130, 0.45)');
  gradient.addColorStop(0.5, 'rgba(255, 105, 180, 0.35)');
  gradient.addColorStop(1, 'rgba(255, 69, 0, 0.45)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  const layout = GRID_LAYOUTS[gridSize] || GRID_LAYOUTS[4];
  const { rows, cols, skip } = layout;
  const panelW = w / cols;
  const panelH = h / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (skip && skip.includes(idx)) continue;

      // cover-fit the photo into each panel: crop a centered window of the image
      const pScale = Math.max(panelW / photo.naturalWidth, panelH / photo.naturalHeight);
      const pW = photo.naturalWidth * pScale;
      const pH = photo.naturalHeight * pScale;
      // shift the crop per panel so panels differ slightly
      const shift = (idx % 3) * 0.12;
      const sx = Math.min((pW - panelW / pScale) * (0.5 + shift - 0.12), Math.max(0, pW - panelW / pScale));
      const sy = Math.min((pH - panelH / pScale) * (0.4 + shift * 0.5), Math.max(0, pH - panelH / pScale));
      ctx.drawImage(photo, sx, sy, panelW / pScale, panelH / pScale, c * panelW, r * panelH, panelW, panelH);
    }
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
  addGrain(ctx, w, h);

  drawCaption(ctx, captionText, w, h);
}

export function addGrain(ctx, w, h) {
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
}

export function drawCaption(ctx, text, w, h) {
  const t = text.trim().toUpperCase();
  if (!t) return;

  ctx.font = 'bold 120px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.lineWidth = 4;
  ctx.strokeText(t, w / 2, 20);

  ctx.fillStyle = '#fff';
  ctx.fillText(t, w / 2, 20);
}