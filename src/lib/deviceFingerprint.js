/**
 * Device fingerprint generator for guest/free user tracking.
 * Generates a stable fingerprint from browser properties and persists it in localStorage.
 */

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function collectBrowserProperties() {
  const properties = [];
  properties.push(window.screen.width);
  properties.push(window.screen.height);
  properties.push(window.screen.colorDepth);
  properties.push(window.screen.pixelDepth);
  properties.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
  properties.push(navigator.language);
  properties.push((navigator.languages || []).join(','));
  properties.push(navigator.platform);
  properties.push(navigator.hardwareConcurrency || 'unknown');
  properties.push(navigator.userAgent);

  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 50;
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('TokScript FP', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('TokScript FP', 4, 17);
    properties.push(canvas.toDataURL());
  } catch (e) {
    properties.push('canvas-unavailable');
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        properties.push(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
        properties.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
      }
    }
  } catch (e) {
    properties.push('webgl-unavailable');
  }

  properties.push('ontouchstart' in window ? 'touch' : 'no-touch');
  properties.push(navigator.maxTouchPoints || 0);

  return properties.join('|||');
}

export function getDeviceFingerprint() {
  if (typeof window === 'undefined') return null;

  // Return cached fingerprint if available (prevents drift from browser updates)
  try {
    const cached = localStorage.getItem('tokscript_device_fp');
    if (cached) return cached;
  } catch (e) { /* localStorage unavailable */ }

  const rawData = collectBrowserProperties();
  const hash1 = hashString(rawData);
  const hash2 = hashString(rawData.split('').reverse().join(''));
  const fp = `fp_${hash1}_${hash2}`;

  // Cache for future visits
  try {
    localStorage.setItem('tokscript_device_fp', fp);
  } catch (e) { /* localStorage unavailable */ }

  return fp;
}
