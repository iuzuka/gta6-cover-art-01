import { drawCover } from './cover.js';
import { runShot } from './shots.js';

const canvas = document.getElementById('cover');
const caption = document.getElementById('caption');
const status = document.getElementById('status');
const photoInput = document.getElementById('photo');
const sizeSelect = document.getElementById('size');
let photo = null;
let gridSize = 4;

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function redraw() {
  if (photo) {
    drawCover(canvas, photo, caption.value, gridSize, canvas.width, canvas.height);
  } else {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0d0a15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

photoInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  photo = await loadImage(url);
  redraw();
});

caption.addEventListener('input', () => redraw());
sizeSelect.addEventListener('change', () => {
  const w = parseInt(sizeSelect.value.split('x')[0]);
  const h = parseInt(sizeSelect.value.split('x')[1]);
  canvas.width = w;
  canvas.height = h;
  redraw();
});

document.getElementById('export').addEventListener('click', () => {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `cover-${canvas.width}x${canvas.height}.png`;
    a.click();
    status.textContent = `Saved cover-${canvas.width}x${canvas.height}.png`;
  }, 'image/png');
});

const shot = new URLSearchParams(location.search).get('shot');
if (shot) {
  runShot(shot, new URLSearchParams(location.search), async (sample, text) => {
    photo = await loadImage(sample);
    caption.value = text;
    redraw();
  });
} else {
  const defaultImg = new Image();
  defaultImg.src = './samples/pier.jpg';
  defaultImg.onload = () => {
    photo = await loadImage(defaultImg.src);
    redraw();
  };
}