/**
 * English (roman) → Hindi Unicode.
 * Tries Google Input Tools when online; otherwise a local phonetic map.
 */
const PAIRS = [
  ["ksh", "क्ष्"], ["gya", "ज्ञ"], ["gy", "ज्ञ्"], ["shr", "श्र्"],
  ["chh", "छ्"], ["kh", "ख्"], ["gh", "घ्"], ["ch", "च्"], ["jh", "झ्"],
  ["th", "थ्"], ["dh", "ध्"], ["ph", "फ्"], ["bh", "भ्"], ["sh", "श्"],
  ["ng", "ङ्"], ["nj", "ञ्"],
  ["Th", "ठ्"], ["Dh", "ढ्"], ["Sh", "ष्"], ["Rh", "ढ़्"],
  ["aa", "आ"], ["ee", "ई"], ["ii", "ई"], ["oo", "ऊ"], ["uu", "ऊ"],
  ["ai", "ऐ"], ["au", "औ"],
  ["ka", "क"], ["kha", "ख"], ["ga", "ग"], ["gha", "घ"],
  ["cha", "च"], ["chha", "छ"], ["ja", "ज"], ["jha", "झ"],
  ["Ta", "ट"], ["Tha", "ठ"], ["Da", "ड"], ["Dha", "ढ"], ["Na", "ण"],
  ["ta", "त"], ["tha", "थ"], ["da", "द"], ["dha", "ध"], ["na", "न"],
  ["pa", "प"], ["pha", "फ"], ["ba", "ब"], ["bha", "भ"], ["ma", "म"],
  ["ya", "य"], ["ra", "र"], ["la", "ल"], ["va", "व"], ["wa", "व"],
  ["sha", "श"], ["Sha", "ष"], ["sa", "स"], ["ha", "ह"],
  ["k", "क्"], ["g", "ग्"], ["c", "च्"], ["j", "ज्"],
  ["T", "ट्"], ["D", "ड्"], ["N", "ण्"],
  ["t", "त्"], ["d", "द्"], ["n", "न्"],
  ["p", "प्"], ["b", "ब्"], ["m", "म्"],
  ["y", "य्"], ["r", "र्"], ["l", "ल्"], ["v", "व्"], ["w", "व्"],
  ["s", "स्"], ["h", "ह्"], ["f", "फ्"], ["z", "ज़्"], ["q", "क़्"], ["x", "क्ष्"],
  ["a", "अ"], ["i", "इ"], ["u", "उ"], ["e", "ए"], ["o", "ओ"],
  ["A", "आ"], ["I", "ई"], ["U", "ऊ"], ["M", "ं"], ["H", "ः"]
];
PAIRS.sort((a, b) => b[0].length - a[0].length);

const MATRA = {
  आ: "ा", इ: "ि", ई: "ी", उ: "ु", ऊ: "ू",
  ए: "े", ऐ: "ै", ओ: "ो", औ: "ौ", अं: "ं"
};

function localPhonetic(word) {
  let s = word;
  let out = "";
  while (s.length) {
    let hit = null;
    for (let i = 0; i < PAIRS.length; i++) {
      if (s.indexOf(PAIRS[i][0]) === 0) {
        hit = PAIRS[i];
        break;
      }
    }
    if (!hit) {
      out += s.charAt(0);
      s = s.slice(1);
      continue;
    }
    const glyph = hit[1];
    s = s.slice(hit[0].length);
    if (glyph === "अ" && out.charAt(out.length - 1) === "्") {
      out = out.slice(0, -1);
      continue;
    }
    if (out.length && MATRA[glyph]) {
      const last = out.charAt(out.length - 1);
      if (last === "्") {
        out = out.slice(0, -1) + MATRA[glyph];
        continue;
      }
      if (/[क-हक़-य़]/.test(last)) {
        out += MATRA[glyph];
        continue;
      }
    }
    out += glyph;
  }
  out = out.replace(/([क-हक़-य़])्(?=$|[^\u0900-\u097F])/g, "$1");
  return out;
}

async function googleSuggestions(word) {
  const url =
    "https://inputtools.google.com/request?text=" +
    encodeURIComponent(word) +
    "&itc=hi-t-i0-und&num=5&ie=utf-8&oe=utf-8&app=krutidev-converter";
  const res = await fetch(url);
  if (!res.ok) throw new Error("network");
  const data = await res.json();
  if (!data || data[0] !== "SUCCESS" || !data[1] || !data[1][0]) {
    throw new Error("empty");
  }
  return data[1][0][1] || [];
}

export async function romanToHindi(word) {
  const trimmed = word.trim();
  if (!trimmed) return word;
  if (!/^[A-Za-z']+$/.test(trimmed)) return word;
  try {
    const list = await googleSuggestions(trimmed);
    if (list && list[0]) return list[0];
  } catch {
    /* offline / CORS */
  }
  return localPhonetic(trimmed);
}

export async function googleSuggestionsExport(word) {
  return googleSuggestions(word);
}

export function localPhoneticExport(word) {
  return localPhonetic(word);
}