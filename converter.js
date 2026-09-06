/**
 * Unicode Devanagari → Kruti Dev 010
 * Mapping and reordering follow the widely used Convert_to_Kritidev_010 method
 * (Devlys 010 / Kruti Dev 010 share the same encoding).
 */
const UNI = [
  "‘", "’", "“", "”", "(", ")", "{", "}", "=", "।", "?", "-", "µ", "॰", ",", ".", "् ",
  "०", "१", "२", "३", "४", "५", "६", "७", "८", "९",
  "फ़्", "क़", "ख़", "ग़", "ज़्", "ज़", "ड़", "ढ़", "फ़", "य़", "ऱ", "ऩ",
  "त्त्", "त्त", "क्त", "दृ", "कृ",
  "ह्न", "ह्य", "हृ", "ह्म", "ह्र", "ह्", "द्द", "क्ष्", "क्ष", "त्र्", "त्र", "ज्ञ",
  "छ्य", "ट्य", "ठ्य", "ड्य", "ढ्य", "द्य", "द्व",
  "श्र", "ट्र", "ड्र", "ढ्र", "छ्र", "क्र", "फ्र", "द्र", "प्र", "ग्र", "रु", "रू",
  "्र",
  "ओ", "औ", "आ", "अ", "ई", "इ", "उ", "ऊ", "ऐ", "ए", "ऋ",
  "क्", "क", "क्क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ",
  "चै", "च्", "च", "छ", "ज्", "ज", "झ्", "झ", "ञ",
  "ट्ट", "ट्ठ", "ट", "ठ", "ड्ड", "ड्ढ", "ड", "ढ", "ण्", "ण",
  "त्", "त", "थ्", "थ", "द्ध", "द", "ध्", "ध", "न्", "न",
  "प्", "प", "फ्", "फ", "ब्", "ब", "भ्", "भ", "म्", "म",
  "य्", "य", "र", "ल्", "ल", "ळ", "व्", "व",
  "श्", "श", "ष्", "ष", "स्", "स", "ह",
  "ऑ", "ॉ", "ो", "ौ", "ा", "ी", "ु", "ू", "ृ", "े", "ै",
  "ं", "ँ", "ः", "ॅ", "ऽ", "् ", "्"
];

const KRUTI = [
  "^", "*", "Þ", "ß", "¼", "½", "¿", "À", "¾", "A", "\\", "&", "&", "Œ", "]", "-", "~ ",
  "å", "ƒ", "„", "…", "†", "‡", "ˆ", "‰", "Š", "‹",
  "¶", "d", "[k", "x", "T", "t", "M+", "<+", "Q", ";", "j", "u",
  "Ù", "Ùk", "ä", "–", "—",
  "à", "á", "â", "ã", "ºz", "º", "í", "{", "{k", "«", "=", "K",
  "Nî", "Vî", "Bî", "Mî", "<î", "|", "}",
  "J", "Vª", "Mª", "<ªª", "Nª", "Ø", "Ý", "æ", "ç", "xz", "#", ":",
  "z",
  "vks", "vkS", "vk", "v", "bZ", "b", "m", "Å", ",s", ",", "_",
  "D", "d", "ô", "[", "[k", "X", "x", "?", "?k", "³",
  "pkS", "P", "p", "N", "T", "t", "÷", ">", "¥",
  "ê", "ë", "V", "B", "ì", "ï", "M", "<", ".", ".k",
  "R", "r", "F", "Fk", ")", "n", "/", "/k", "U", "u",
  "I", "i", "¶", "Q", "C", "c", "H", "Hk", "E", "e",
  "¸", ";", "j", "Y", "y", "G", "O", "o",
  "'", "'k", '"', '"k', "L", "l", "g",
  "v‚", "‚", "ks", "kS", "k", "h", "q", "w", "`", "s", "S",
  "a", "¡", "%", "W", "·", "~ ", "~"
];

function replaceAllLiteral(haystack, from, to) {
  if (!from) return haystack;
  return haystack.split(from).join(to);
}

function convertChunk(modified) {
  if (!modified) return "";

  modified = replaceAllLiteral(modified, "क़", "क़");
  modified = replaceAllLiteral(modified, "ख़", "ख़");
  modified = replaceAllLiteral(modified, "ग़", "ग़");
  modified = replaceAllLiteral(modified, "ज़", "ज़");
  modified = replaceAllLiteral(modified, "ड़", "ड़");
  modified = replaceAllLiteral(modified, "ढ़", "ढ़");
  modified = replaceAllLiteral(modified, "ऩ", "ऩ");
  modified = replaceAllLiteral(modified, "फ़", "फ़");
  modified = replaceAllLiteral(modified, "य़", "य़");
  modified = replaceAllLiteral(modified, "ऱ", "ऱ");

  let positionOfF = modified.indexOf("ि");
  while (positionOfF !== -1) {
    const left = modified.charAt(positionOfF - 1);
    modified = modified.replace(left + "ि", "f" + left);
    positionOfF = positionOfF - 1;
    while (modified.charAt(positionOfF - 1) === "्" && positionOfF !== 0) {
      const half = modified.charAt(positionOfF - 2) + "्";
      modified = modified.replace(half + "f", "f" + half);
      positionOfF = positionOfF - 2;
    }
    positionOfF = modified.indexOf("ि", positionOfF + 1);
  }

  const matras = "ािीुूृेैोौं:ँॅ";
  modified += "  ";
  let halfR = modified.indexOf("र्");
  while (halfR > 0) {
    let zPos = halfR + 2;
    let right = modified.charAt(zPos + 1);
    while (matras.indexOf(right) !== -1) {
      zPos += 1;
      right = modified.charAt(zPos + 1);
    }
    const middle = modified.substr(halfR + 2, zPos - halfR - 1);
    modified = modified.replace("र्" + middle, middle + "Z");
    halfR = modified.indexOf("र्");
  }
  modified = modified.substr(0, modified.length - 2);

  for (let i = 0; i < UNI.length; i++) {
    modified = replaceAllLiteral(modified, UNI[i], KRUTI[i]);
  }
  return modified;
}

export function unicodeToKrutiDev(text) {
  if (!text) return "";
  text = text.normalize("NFC");
  const max = 6000;
  let out = "";
  let start = 0;
  const len = text.length;
  while (start < len) {
    let end = Math.min(start + max, len);
    if (end < len) {
      const space = text.lastIndexOf(" ", end);
      if (space > start) end = space;
    }
    out += convertChunk(text.substring(start, end));
    start = end;
  }
  return out;
}