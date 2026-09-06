import { unicodeToKrutiDev } from "./converter.js";
import { romanToHindi, googleSuggestionsExport } from "./transliterate.js";

const STORAGE_KEY = "krutidev_history";
const MAX_HISTORY = 10;

const els = {
  unicodeIn: document.getElementById("unicodeIn"),
  krutiOut: document.getElementById("krutiOut"),
  copyBtn: document.getElementById("copyBtn"),
  downloadBtn: document.getElementById("downloadBtn"),
  clearBtn: document.getElementById("clearBtn"),
  copyStatus: document.getElementById("copyStatus"),
  imeStatus: document.getElementById("imeStatus"),
  toggleIme: document.getElementById("toggleIme"),
  suggestions: document.getElementById("suggestions"),
  typeHint: document.getElementById("typeHint"),
  modeBadge: document.getElementById("modeBadge"),
  tabType: document.getElementById("tabType"),
  tabPaste: document.getElementById("tabPaste")
};

let imeOn = true;
let converting = false;
let lastWord = "";
let currentMode = "type";
let debounceTimer = null;

function convertNow() {
  els.krutiOut.value = unicodeToKrutiDev(els.unicodeIn.value);
}

function setIme(on) {
  imeOn = on;
  els.imeStatus.textContent = on
    ? "Hindi typing ON — Press Space to convert"
    : "English Lock — Type as-is, no conversion";
  els.toggleIme.textContent = on ? "English Lock" : "Hindi Typing ON";
  els.toggleIme.setAttribute("aria-pressed", on);
}

function latinWordBeforeCaret(text, caret) {
  const left = text.slice(0, caret);
  const m = left.match(/[A-Za-z']+$/);
  return m ? m[0] : "";
}

function replaceBeforeCaret(wordLen, replacement) {
  const caret = els.unicodeIn.selectionStart;
  const text = els.unicodeIn.value;
  const start = caret - wordLen;
  els.unicodeIn.value = text.slice(0, start) + replacement + text.slice(caret);
  const next = start + replacement.length;
  els.unicodeIn.setSelectionRange(next, next);
  convertNow();
}

async function showSuggestions(word) {
  els.suggestions.innerHTML = "";
  els.suggestions.classList.remove("show");
  if (!word || word.length < 2) return;
  try {
    const list = await googleSuggestionsExport(word);
    if (!list || !list.length) return;
    list.slice(0, 5).forEach((item, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "suggestion-btn" + (idx === 0 ? " primary" : "");
      btn.textContent = item;
      btn.setAttribute("role", "option");
      btn.addEventListener("click", () => {
        const caret = els.unicodeIn.selectionStart;
        const current = latinWordBeforeCaret(els.unicodeIn.value, caret);
        const useLen = current ? current.length : lastWord.length;
        if (!useLen) return;
        replaceBeforeCaret(useLen, item + " ");
        els.suggestions.classList.remove("show");
        els.unicodeIn.focus();
      });
      els.suggestions.appendChild(btn);
    });
    els.suggestions.classList.add("show");
  } catch {
    els.suggestions.classList.remove("show");
  }
}

function setMode(mode) {
  currentMode = mode;
  const isType = mode === "type";
  els.tabType.classList.toggle("active", isType);
  els.tabPaste.classList.toggle("active", !isType);
  els.tabType.setAttribute("aria-selected", isType);
  els.tabPaste.setAttribute("aria-selected", !isType);
  els.modeBadge.textContent = isType ? "English → Hindi" : "Paste Unicode";
  setIme(isType);
  els.typeHint.textContent = isType
    ? 'Type in English, press Space: <kbd>namaste</kbd> → <kbd>नमस्ते</kbd>'
    : "Paste Unicode Hindi from Google Input / Gboard";
  els.unicodeIn.placeholder = isType
    ? "Type in English and press Space, or paste Unicode Hindi here…"
    : "Paste Unicode Hindi here…";
  els.unicodeIn.focus();
}

function saveToHistory(text) {
  if (!text.trim()) return;
  try {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const filtered = history.filter(h => h !== text);
    filtered.unshift(text);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_HISTORY)));
  } catch {}
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function showCopyStatus(message, type = "ok") {
  els.copyStatus.textContent = message;
  els.copyStatus.className = "status " + type;
  clearTimeout(window.copyStatusTimer);
  window.copyStatusTimer = setTimeout(() => {
    els.copyStatus.textContent = "";
    els.copyStatus.className = "status";
  }, 4000);
}

async function handleCopy() {
  convertNow();
  const text = els.krutiOut.value;
  if (!text) {
    showCopyStatus("Type something first.", "warn");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    showCopyStatus("Copied! Paste in Word → apply Kruti Dev 010 font.", "ok");
    saveToHistory(text);
  } catch {
    els.krutiOut.select();
    document.execCommand("copy");
    showCopyStatus("Copied!", "ok");
  }
}

function handleDownload() {
  convertNow();
  const blob = new Blob([els.krutiOut.value], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "krutidev.txt";
  a.click();
  URL.revokeObjectURL(a.href);
}

function handleClear() {
  els.unicodeIn.value = "";
  els.krutiOut.value = "";
  els.copyStatus.textContent = "";
  els.suggestions.classList.remove("show");
  els.unicodeIn.focus();
}

function handleInput() {
  convertNow();
  if (!imeOn) return;
  const word = latinWordBeforeCaret(els.unicodeIn.value, els.unicodeIn.selectionStart);
  lastWord = word;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    if (word.length >= 2) showSuggestions(word);
    else els.suggestions.classList.remove("show");
  }, 80);
}

async function handleKeydown(ev) {
  if (!imeOn || converting) return;
  if (ev.key !== " " && ev.key !== "Enter") return;
  const word = latinWordBeforeCaret(els.unicodeIn.value, els.unicodeIn.selectionStart);
  if (!word) return;
  ev.preventDefault();
  converting = true;
  els.imeStatus.textContent = "Converting…";
  try {
    const hindi = await romanToHindi(word);
    replaceBeforeCaret(word.length, hindi + (ev.key === "Enter" ? "\n" : " "));
    els.suggestions.classList.remove("show");
    setIme(true);
  } catch {
    replaceBeforeCaret(word.length, word + " ");
  }
  converting = false;
}

function handleGlobalKeydown(ev) {
  if (ev.target.closest("textarea, input, button")) return;
  if (ev.ctrlKey && ev.key === "Enter") {
    ev.preventDefault();
    convertNow();
  }
  if (ev.ctrlKey && ev.shiftKey && ev.key === "C") {
    ev.preventDefault();
    handleCopy();
  }
  if (ev.key === "Escape") {
    els.suggestions.classList.remove("show");
  }
}

function init() {
  els.tabType.addEventListener("click", () => setMode("type"));
  els.tabPaste.addEventListener("click", () => setMode("paste"));
  els.unicodeIn.addEventListener("input", handleInput);
  els.unicodeIn.addEventListener("keydown", handleKeydown);
  els.toggleIme.addEventListener("click", () => setIme(!imeOn));
  els.copyBtn.addEventListener("click", handleCopy);
  els.downloadBtn.addEventListener("click", handleDownload);
  els.clearBtn.addEventListener("click", handleClear);
  document.addEventListener("keydown", handleGlobalKeydown);

  convertNow();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}