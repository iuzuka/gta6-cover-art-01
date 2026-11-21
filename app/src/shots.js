export async function runShot(shot, query, load) {
  if (shot === 'cover') document.body.classList.add('shot-cover');
  await load(`samples/${query.get('photo') ?? 'pier'}.jpg`, query.get('caption') ?? 'Sunset Heist');
  requestAnimationFrame(() => requestAnimationFrame(() => { window.__shotReady = true; }));
}