# KrutiDev Converter Offline

> A fast, simple and privacy-friendly Hindi text converter for **Unicode ↔ KrutiDev**, designed to work offline.

---

## 📌 About

**KrutiDev Converter Offline** is a lightweight web-based Hindi text conversion tool that allows users to convert Hindi text between **Unicode** and **KrutiDev** encoding.

KrutiDev is commonly found in older Hindi documents, typing systems, data-entry workflows and legacy applications, while modern applications generally use Unicode Hindi.

This project provides an easy way to convert text between these formats directly in the browser.

The application is designed with an **offline-first approach**, meaning the conversion logic runs locally in the user's browser instead of depending on an online conversion server.

### Why this project?

Working with old Hindi documents can be difficult when text is stored in KrutiDev and modern software expects Unicode.

This tool makes the process simple:

```text
KrutiDev Text
      ↓
   Convert
      ↓
Unicode Hindi
```

or:

```text
Unicode Hindi
      ↓
   Convert
      ↓
KrutiDev Text
```

---

# ✨ Features

- 🔄 Unicode → KrutiDev
- 🔄 KrutiDev → Unicode
- ⚡ Fast client-side conversion
- 📴 Offline-first design
- 🔒 Local text processing
- 📋 Easy copy/paste workflow
- 🌐 Browser-based
- 📱 Responsive interface
- 📦 Progressive Web App support
- 💾 Service Worker based offline caching
- 🪶 Lightweight project
- 🇮🇳 Designed for Hindi users and legacy workflows

---

# 🎯 Use Cases

KrutiDev Converter Offline can be useful for:

- Hindi typing
- KrutiDev text conversion
- Unicode Hindi conversion
- Old Hindi documents
- Government and office workflows
- Hindi data entry
- Hindi typing practice
- Legacy Hindi databases
- Old Word documents
- Hindi publishing workflows
- Converting legacy Hindi text into modern Unicode

---

# 🖥️ Installation

There are multiple ways to run the application.

---

## Method 1 — Download the Repository

### Step 1: Download

Open the GitHub repository and click:

```text
Code → Download ZIP
```

### Step 2: Extract

Extract the downloaded ZIP file anywhere on your computer.

Example:

```text
Desktop/
└── Krutidev-converter-offline/
```

### Step 3: Open the Application

Open the extracted folder.

You should see files similar to:

```text
index.html
app.js
converter.js
transliterate.js
manifest.json
sw.js
favicon.svg
```

You can then open:

```text
index.html
```

in your browser.

---

# 🪟 Windows Installation

For a normal Windows user, there is no complicated installation process.

### Basic Method

1. Download the repository ZIP.
2. Extract the ZIP.
3. Open the project folder.
4. Double-click `index.html`.
5. The application opens in your web browser.
6. Start converting Hindi text.

---

## ⚠️ Important

Opening `index.html` directly using:

```text
file://
```

works for basic application functionality, but some browser features such as **Service Worker and PWA installation** may not work correctly.

For the complete experience, using a local web server is recommended.

---

# 🚀 Recommended Installation

## Run Using a Local Server

A local server provides a better environment for the application and its offline/PWA features.

### Step 1: Install Python

Download and install Python if it is not already installed on your computer.

During installation, make sure Python is added to the system PATH.

### Step 2: Open the Project Folder

Open the extracted project folder.

### Step 3: Open Command Prompt

Click the folder address bar and type:

```text
cmd
```

Press Enter.

A Command Prompt window will open inside the project folder.

### Step 4: Start the Server

Run:

```bash
python -m http.server 8000
```

### Step 5: Open the Application

Open your browser and visit:

```text
http://localhost:8000
```

The application should now open.

---

# 📦 PWA Installation

KrutiDev Converter Offline includes Progressive Web App support through:

```text
manifest.json
sw.js
```

If the application is hosted in a browser environment that supports PWA installation, you may be able to install it like a normal application.

### Chrome / Edge

1. Open the application.
2. Look for the **Install** icon in the address bar.
3. Click **Install**.
4. Confirm the installation.
5. The application will appear as an installed app.

You can then launch it from the Windows Start Menu or the installed-app shortcut.

---

# 📖 How to Use

Using the converter is very easy.

---

## 1. Open the Application

Start KrutiDev Converter Offline in your browser.

---

## 2. Select the Conversion Type

Choose the conversion direction you need.

### Unicode → KrutiDev

Use this when you have normal Unicode Hindi text and want KrutiDev text.

Example:

```text
नमस्ते भारत
```

### KrutiDev → Unicode

Use this when you have KrutiDev encoded text and want readable Unicode Hindi.

Example:

```text
ueLrs Hkkjr
```

---

## 3. Enter Your Text

Copy the Hindi text that you want to convert.

Paste the text into the input field.

You can also type or edit the text directly.

---

## 4. Convert

Select the required conversion mode and click the **Convert** button.

The application processes the text locally and generates the converted result.

---

## 5. Copy the Result

After conversion, the result will appear in the output section.

Use the **Copy** option to copy the converted text.

You can then paste the result into:

- Microsoft Word
- Notepad
- Google Docs
- Websites
- Hindi typing software
- Government forms
- Data-entry software
- Other text editors

---

# 🔄 Example Workflow

### Unicode → KrutiDev

```text
1. Open the application
        ↓
2. Select Unicode → KrutiDev
        ↓
3. Paste Unicode Hindi text
        ↓
4. Click Convert
        ↓
5. Copy the KrutiDev result
```

---

### KrutiDev → Unicode

```text
1. Open the application
        ↓
2. Select KrutiDev → Unicode
        ↓
3. Paste KrutiDev text
        ↓
4. Click Convert
        ↓
5. Copy the Unicode result
```

---

# 📴 Offline Usage

The application is designed to support offline usage.

The project includes a Service Worker that can cache application resources.

After the required files have been cached, the application can continue to work without an active internet connection, depending on how it was installed or served.

### Recommended Offline Setup

1. Open the application while connected to the internet.
2. Allow the application to load completely.
3. If supported, install it as a PWA.
4. Open the installed application later.
5. Use the converter without requiring an active internet connection.

---

# 🔐 Privacy

Privacy is an important part of this project.

The conversion is performed locally in the browser.

This means your text does not need to be sent to a remote conversion server for the core conversion process.

### Privacy Benefits

- ❌ No account required
- ❌ No login required
- ❌ No server-side conversion required
- ❌ No external conversion API required
- ✅ Local browser processing
- ✅ Offline capable

> Your text stays on your device while the conversion is being performed locally.

---

# 🧠 How the Converter Works

The basic workflow is:

```text
User Input
    ↓
Text Processing
    ↓
Conversion Engine
    ↓
Unicode / KrutiDev Mapping
    ↓
Converted Text
    ↓
User Output
```

The conversion logic is handled by JavaScript and runs directly inside the browser.

---

# ⚙️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS | Interface and styling |
| JavaScript | Application logic |
| JavaScript Conversion Logic | Unicode/KrutiDev conversion |
| Service Worker | Offline caching |
| Web App Manifest | PWA support |
| SVG | Application icon |

The core application does not require a traditional backend server for text conversion.

---

# 📂 Project Structure

```text
Krutidev-converter-offline/
│
├── index.html
│   └── Main application interface
│
├── app.js
│   └── Application logic and UI interactions
│
├── converter.js
│   └── Unicode/KrutiDev conversion logic
│
├── transliterate.js
│   └── Transliteration and Hindi text processing
│
├── manifest.json
│   └── Progressive Web App configuration
│
├── sw.js
│   └── Service Worker and offline caching
│
├── favicon.svg
│   └── Application icon
│
└── README.md
    └── Project documentation
```

---

# 👨‍💻 Developer Setup

Developers can clone the repository and run it locally.

## Clone

```bash
git clone https://github.com/saktitechlab-os/Krutidev-converter-offline.git
```

## Enter the project directory

```bash
cd Krutidev-converter-offline
```

## Start a local server

```bash
python -m http.server 8000
```

## Open in browser

```text
http://localhost:8000
```

---

# 🧪 Testing

When modifying the project, test both conversion directions.

### Test Unicode → KrutiDev

Try examples containing:

```text
नमस्ते
भारत
हिन्दी भाषा
विद्यालय
कंप्यूटर
```

### Test KrutiDev → Unicode

Test the corresponding KrutiDev encoded text and verify the generated Unicode output.

Also test:

- Numbers
- Punctuation
- Matras
- Combined characters
- Special characters
- Long paragraphs
- Empty input
- Large text input

---

# 🛠️ Development Workflow

```text
Edit Code
   ↓
Run Local Server
   ↓
Open Browser
   ↓
Test Conversion
   ↓
Check Output
   ↓
Fix Issues
   ↓
Repeat
```

Because the project uses standard HTML, CSS and JavaScript, development does not require a complicated build system.

---

# 🗺️ Roadmap

Planned or possible future improvements include:

- [ ] Improved KrutiDev conversion accuracy
- [ ] Better character mapping
- [ ] Automatic encoding detection
- [ ] TXT file conversion
- [ ] Batch text conversion
- [ ] Drag & drop support
- [ ] Conversion history
- [ ] Hindi typing keyboard
- [ ] More legacy Hindi font support
- [ ] Improved mobile interface
- [ ] Better PWA experience
- [ ] Desktop application
- [ ] Windows `.exe` version
- [ ] Additional document conversion support

> The roadmap may change as the project develops.

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

### 1. Fork the repository

Create your own fork on GitHub.

### 2. Clone your fork

```bash
git clone https://github.com/YOUR-USERNAME/Krutidev-converter-offline.git
```

### 3. Create a branch

```bash
git checkout -b feature/my-feature
```

### 4. Make your changes

Update the application or conversion logic.

### 5. Test everything

Make sure both conversion directions work correctly.

### 6. Commit your changes

```bash
git add .
git commit -m "Improve conversion functionality"
```

### 7. Push your branch

```bash
git push origin feature/my-feature
```

### 8. Create a Pull Request

Open a Pull Request on GitHub and explain what you changed.

---

# 🐛 Bug Reports

Found a bug?

Please create a GitHub Issue.

Include:

- Conversion direction
- Input text
- Expected output
- Actual output
- Browser
- Operating system
- Steps to reproduce

### Example

Conversion:
Unicode → KrutiDev

Input:
नमस्ते भारत

Expected:
Correct KrutiDev output

Actual:
Incorrect output

Browser:
Google Chrome

OS:
Windows 7,8,10,11
Linux
Mac
```

Please do not include sensitive or private text in bug reports.

---

# 💡 Feature Requests

Have an idea for improving the project?

Open a GitHub Issue and explain:

1. What feature you want
2. Why it would be useful
3. How you expect it to work

Feature suggestions and improvements are welcome.

---

# 📜 License

This project is open source.

Please refer to the repository for the applicable license and usage terms.

---

# ❤️ Credits

Developed by **SaktiTechLab OS**.

Built to make Hindi text conversion between **Unicode and KrutiDev** easier, faster and more accessible.

---

# ⭐ Support the Project

If you find this project useful:

⭐ Star the repository  
🍴 Fork the repository  
🐛 Report bugs  
💡 Suggest features  
🤝 Contribute

Your support helps the project grow.

---

# 🇮🇳 KrutiDev Converter Offline

### Convert Hindi text between Unicode and KrutiDev — fast, simple and offline.

No Login.
No Complicated Setup.
No Internet Required for Core Conversion.
Just Convert. ⚡
```
````
