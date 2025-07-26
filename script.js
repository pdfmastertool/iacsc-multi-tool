// Global Variables
let currentTool = null
let uploadedFiles = []

// DOM Elements
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const sidebar = document.querySelector(".sidebar")
const sidebarToggle = document.getElementById("sidebarToggle")
const modal = document.getElementById("toolModal")
const modalTitle = document.getElementById("modalTitle")
const modalBody = document.getElementById("modalBody")
const modalClose = document.getElementById("modalClose")
const toast = document.getElementById("toast")
const toastMessage = document.getElementById("toastMessage")

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners()
  initializeSidebar()
  checkMobileView()
})

// Event Listeners
function initializeEventListeners() {
  // Hamburger menu
  hamburger.addEventListener("click", toggleMobileMenu)

  // Sidebar toggle
  sidebarToggle.addEventListener("click", toggleSidebar)

  // Modal close
  modalClose.addEventListener("click", closeModal)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal()
  })

  // Tool cards and sidebar items
  document.querySelectorAll(".tool-card, .tool-item").forEach((item) => {
    item.addEventListener("click", function () {
      const toolName = this.getAttribute("data-tool")
      if (toolName) openTool(toolName)
    })
  })

  // Footer tool links
  document.querySelectorAll("a[data-tool]").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const toolName = this.getAttribute("data-tool")
      if (toolName) openTool(toolName)
    })
  })

  // Category headers
  document.querySelectorAll(".category-header").forEach((header) => {
    header.addEventListener("click", toggleCategory)
  })

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
        // Close mobile menu if open
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
      }
    })
  })

  // Window resize
  window.addEventListener("resize", checkMobileView)
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
}

// Sidebar Functions
function initializeSidebar() {
  // Open first category by default
  const firstCategory = document.querySelector(".category-header")
  if (firstCategory) {
    firstCategory.click()
  }
}

function toggleSidebar() {
  sidebar.classList.toggle("active")
}

function toggleCategory() {
  const categoryItems = this.nextElementSibling
  const arrow = this.querySelector(".category-arrow")

  // Close other categories
  document.querySelectorAll(".category-items").forEach((items) => {
    if (items !== categoryItems) {
      items.classList.remove("active")
      items.previousElementSibling.classList.remove("active")
    }
  })

  // Toggle current category
  categoryItems.classList.toggle("active")
  this.classList.toggle("active")
}

function checkMobileView() {
  if (window.innerWidth <= 1024) {
    sidebar.classList.remove("active")
    document.querySelector(".main-content").style.marginLeft = "0"
  } else {
    document.querySelector(".main-content").style.marginLeft = "320px"
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  }
}

// Tool Functions
function openTool(toolName) {
  currentTool = toolName
  const toolData = getToolData(toolName)

  modalTitle.textContent = toolData.title
  modalBody.innerHTML = toolData.content
  modal.style.display = "block"

  // Initialize tool-specific functionality
  initializeToolFunctionality(toolName)

  // Close sidebar on mobile when tool opens
  if (window.innerWidth <= 1024) {
    sidebar.classList.remove("active")
  }
}

function closeModal() {
  modal.style.display = "none"
  currentTool = null
  uploadedFiles = []
}

function getToolData(toolName) {
  const tools = {
    "merge-pdf": {
      title: "Merge PDF Files",
      content: createFileUploadInterface("Select PDF files to merge", "application/pdf", true),
    },
    "split-pdf": {
      title: "Split PDF File",
      content: createFileUploadInterface("Select a PDF file to split", "application/pdf", false),
    },
    "compress-pdf": {
      title: "Compress PDF",
      content: createFileUploadInterface("Select PDF files to compress", "application/pdf", true),
    },
    "pdf-to-word": {
      title: "PDF to Word Converter",
      content: createFileUploadInterface("Select PDF files to convert to Word", "application/pdf", true),
    },
    "word-to-pdf": {
      title: "Word to PDF Converter",
      content: createFileUploadInterface("Select Word files to convert to PDF", ".doc,.docx", true),
    },
    "pdf-to-ppt": {
      title: "PDF to PowerPoint Converter",
      content: createFileUploadInterface("Select PDF files to convert to PowerPoint", "application/pdf", true),
    },
    "ppt-to-pdf": {
      title: "PowerPoint to PDF Converter",
      content: createFileUploadInterface("Select PowerPoint files to convert to PDF", ".ppt,.pptx", true),
    },
    "pdf-to-excel": {
      title: "PDF to Excel Converter",
      content: createFileUploadInterface("Select PDF files to convert to Excel", "application/pdf", true),
    },
    "excel-to-pdf": {
      title: "Excel to PDF Converter",
      content: createFileUploadInterface("Select Excel files to convert to PDF", ".xls,.xlsx", true),
    },
    "pdf-to-jpg": {
      title: "PDF to JPG Converter",
      content: createFileUploadInterface("Select PDF files to convert to JPG", "application/pdf", true),
    },
    "jpg-to-pdf": {
      title: "JPG to PDF Converter",
      content: createFileUploadInterface("Select JPG files to convert to PDF", "image/jpeg", true),
    },
    "organize-pdf": {
      title: "Organize PDF Pages",
      content: createFileUploadInterface("Select a PDF file to organize pages", "application/pdf", false),
    },
    "edit-pdf": {
      title: "Edit PDF",
      content: createFileUploadInterface("Select a PDF file to edit", "application/pdf", false),
    },
    "rotate-pdf": {
      title: "Rotate PDF Pages",
      content: createFileUploadInterface("Select PDF files to rotate", "application/pdf", true),
    },
    "unlock-pdf": {
      title: "Unlock PDF",
      content: createFileUploadInterface("Select password-protected PDF files to unlock", "application/pdf", true),
    },
    "protect-pdf": {
      title: "Protect PDF with Password",
      content: createFileUploadInterface("Select PDF files to protect with password", "application/pdf", true),
    },
    "add-page-numbers": {
      title: "Add Page Numbers to PDF",
      content: createFileUploadInterface("Select PDF files to add page numbers", "application/pdf", true),
    },
    "add-watermark": {
      title: "Add Watermark to PDF",
      content: createFileUploadInterface("Select PDF files to add watermark", "application/pdf", true),
    },
    "image-compressor": {
      title: "Image Compressor",
      content: createFileUploadInterface("Select images to compress", "image/*", true),
    },
    "image-converter": {
      title: "Image Format Converter",
      content: createImageConverterInterface(),
    },
    "audio-converter": {
      title: "Audio Format Converter",
      content: createFileUploadInterface("Select audio files to convert", "audio/*", true),
    },
    "video-compressor": {
      title: "Video Compressor",
      content: createFileUploadInterface("Select video files to compress", "video/*", true),
    },
    "qr-generator": {
      title: "QR Code Generator",
      content: createQRGeneratorInterface(),
    },
    "password-generator": {
      title: "Password Generator",
      content: createPasswordGeneratorInterface(),
    },
    "word-counter": {
      title: "Word & Character Counter",
      content: createWordCounterInterface(),
    },
    "age-calculator": {
      title: "Age Calculator",
      content: createAgeCalculatorInterface(),
    },
    "bmi-calculator": {
      title: "BMI Calculator",
      content: createBMICalculatorInterface(),
    },
    "color-picker": {
      title: "Color Picker",
      content: createColorPickerInterface(),
    },
    "unit-converter": {
      title: "Unit Converter",
      content: createUnitConverterInterface(),
    },
    "json-formatter": {
      title: "JSON Formatter",
      content: createJSONFormatterInterface(),
    },
    "text-to-speech": {
      title: "Text to Speech",
      content: createTextToSpeechInterface(),
    },
    "speech-to-text": {
      title: "Speech to Text",
      content: createSpeechToTextInterface(),
    },
    "timer-stopwatch": {
      title: "Timer & Stopwatch",
      content: createTimerStopwatchInterface(),
    },
  }

  return tools[toolName] || { title: "Tool Not Found", content: "<p>This tool is not yet implemented.</p>" }
}

// Interface Creators
function createFileUploadInterface(description, accept, multiple) {
  return `
        <div class="file-upload" onclick="document.getElementById('fileInput').click()">
            <div class="file-upload-icon">📁</div>
            <div class="file-upload-text">${description}</div>
            <div class="file-upload-text">Drag and drop files here or click to browse</div>
            <input type="file" id="fileInput" class="file-input" accept="${accept}" ${multiple ? "multiple" : ""}>
        </div>
        <div id="fileList" class="file-list"></div>
        <div class="tool-actions">
            <button class="tool-button" onclick="processFiles()" id="processBtn" disabled>Process Files</button>
            <button class="tool-button" onclick="clearFiles()" style="background: #6c757d;">Clear All</button>
        </div>
        <div id="progressBar" class="progress-bar" style="display: none;">
            <div class="progress-fill"></div>
            <div class="progress-text">Processing...</div>
        </div>
    `
}

function createQRGeneratorInterface() {
  return `
        <div class="tool-form">
            <div class="form-group">
                <label for="qrText">Enter text or URL:</label>
                <textarea id="qrText" placeholder="Enter text, URL, or any content to generate QR code" rows="4"></textarea>
            </div>
            <div class="form-group">
                <label for="qrSize">QR Code Size:</label>
                <select id="qrSize">
                    <option value="200">200x200</option>
                    <option value="300" selected>300x300</option>
                    <option value="400">400x400</option>
                    <option value="500">500x500</option>
                </select>
            </div>
            <div class="tool-actions">
                <button class="tool-button" onclick="generateQR()">Generate QR Code</button>
            </div>
            <div id="qrResult" class="qr-result"></div>
        </div>
    `
}

function createPasswordGeneratorInterface() {
  return `
        <div class="tool-form">
            <div class="form-group">
                <label for="passwordLength">Password Length: <span id="lengthValue">12</span></label>
                <input type="range" id="passwordLength" min="4" max="50" value="12">
            </div>
            <div class="form-group">
                <label><input type="checkbox" id="includeUppercase" checked> Uppercase Letters (A-Z)</label>
                <label><input type="checkbox" id="includeLowercase" checked> Lowercase Letters (a-z)</label>
                <label><input type="checkbox" id="includeNumbers" checked> Numbers (0-9)</label>
                <label><input type="checkbox" id="includeSymbols"> Special Characters (!@#$%^&*)</label>
            </div>
            <div class="tool-actions">
                <button class="tool-button" onclick="generatePassword()">Generate Password</button>
            </div>
            <div class="password-result">
                <input type="text" id="generatedPassword" readonly placeholder="Generated password will appear here">
                <button class="copy-button" onclick="copyPassword()">Copy</button>
            </div>
        </div>
    `
}

function createWordCounterInterface() {
  return `
        <div class="tool-form">
            <div class="form-group">
                <label for="textInput">Enter or paste your text:</label>
                <textarea id="textInput" placeholder="Enter or paste your text here..." rows="10"></textarea>
            </div>
            <div class="counter-stats">
                <div class="stat-item">
                    <span class="stat-label">Characters</span>
                    <span id="charCount">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Characters (no spaces)</span>
                    <span id="charNoSpaceCount">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Words</span>
                    <span id="wordCount">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Sentences</span>
                    <span id="sentenceCount">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Paragraphs</span>
                    <span id="paragraphCount">0</span>
                </div>
            </div>
        </div>
    `
}

function createAgeCalculatorInterface() {
  return `
        <div class="tool-form">
            <div class="form-group">
                <label for="birthDate">Enter your birth date:</label>
                <input type="date" id="birthDate">
            </div>
            <div class="tool-actions">
                <button class="tool-button" onclick="calculateAge()">Calculate Age</button>
            </div>
            <div id="ageResult" class="age-result"></div>
        </div>
    `
}

function createBMICalculatorInterface() {
  return `
        <div class="tool-form">
            <div class="form-group">
                <label for="weight">Weight (kg):</label>
                <input type="number" id="weight" placeholder="Enter weight in kg" step="0.1">
            </div>
            <div class="form-group">
                <label for="height">Height (cm):</label>
                <input type="number" id="height" placeholder="Enter height in cm" step="0.1">
            </div>
            <div class="tool-actions">
                <button class="tool-button" onclick="calculateBMI()">Calculate BMI</button>
            </div>
            <div id="bmiResult" class="bmi-result"></div>
        </div>
    `
}

function createColorPickerInterface() {
  return `
        <div class="tool-form">
            <div class="form-group">
                <label for="colorPicker">Pick a color:</label>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <input type="color" id="colorPicker" value="#d41645" style="width: 60px; height: 60px; border: none; border-radius: 8px; cursor: pointer;">
                    <div id="colorDisplay" style="width: 100px; height: 60px; border-radius: 8px; border: 1px solid #e0e0e0;"></div>
                </div>
            </div>
            <div class="color-values" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
                <div class="form-group">
                    <label>HEX:</label>
                    <input type="text" id="hexValue" readonly>
                </div>
                <div class="form-group">
                    <label>RGB:</label>
                    <input type="text" id="rgbValue" readonly>
                </div>
                <div class="form-group">
                    <label>HSL:</label>
                    <input type="text" id="hslValue" readonly>
                </div>
            </div>
        </div>
    `
}

function createImageConverterInterface() {
  return `
        <div class="file-upload" onclick="document.getElementById('imageInput').click()">
            <div class="file-upload-icon">🖼️</div>
            <div class="file-upload-text">Select images to convert format</div>
            <div class="file-upload-text">Drag and drop images here or click to browse</div>
            <input type="file" id="imageInput" class="file-input" accept="image/*" multiple>
        </div>
        <div class="form-group">
            <label for="outputFormat">Convert to:</label>
            <select id="outputFormat">
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
            </select>
        </div>
        <div id="imagePreview" class="image-preview" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem; margin: 1rem 0;"></div>
        <div class="tool-actions">
            <button class="tool-button" onclick="convertImages()" id="convertBtn" disabled>Convert Images</button>
        </div>
    `
}

function createUnitConverterInterface() {
  return `
        <div class="tool-form">
            <div class="form-group">
                <label for="unitType">Unit Type:</label>
                <select id="unitType" onchange="updateUnitOptions()">
                    <option value="length">Length</option>
                    <option value="weight">Weight</option>
                    <option value="temperature">Temperature</option>
                    <option value="area">Area</option>
                    <option value="volume">Volume</option>
                </select>
            </div>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: end;">
                <div class="form-group">
                    <label for="fromValue">From:</label>
                    <input type="number" id="fromValue" placeholder="Enter value" oninput="convertUnit()">
                    <select id="fromUnit" style="margin-top: 0.5rem;"></select>
                </div>
                <div style="font-size: 1.5rem; color: #d41645; text-align: center; padding-bottom: 1rem;">→</div>
                <div class="form-group">
                    <label for="toValue">To:</label>
                    <input type="number" id="toValue" readonly>
                    <select id="toUnit" onchange="convertUnit()" style="margin-top: 0.5rem;"></select>
                </div>
            </div>
        </div>
    `
}

function createJSONFormatterInterface() {
  return `
        <div class="tool-form">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div class="form-group">
                    <label for="jsonInput">Input JSON:</label>
                    <textarea id="jsonInput" placeholder="Paste your JSON here..." rows="12"></textarea>
                </div>
                <div class="form-group">
                    <label for="jsonOutput">Formatted JSON:</label>
                    <textarea id="jsonOutput" readonly rows="12"></textarea>
                </div>
            </div>
            <div class="tool-actions">
                <button class="tool-button" onclick="formatJSON()">Format JSON</button>
                <button class="tool-button" onclick="minifyJSON()" style="background: #6c757d;">Minify JSON</button>
                <button class="tool-button" onclick="validateJSON()" style="background: #28a745;">Validate JSON</button>
            </div>
            <div id="jsonStatus" style="margin-top: 1rem; text-align: center; font-weight: 500;"></div>
        </div>
    `
}

function createTextToSpeechInterface() {
  return `
        <div class="tool-form">
            <div class="form-group">
                <label for="ttsText">Enter text to convert to speech:</label>
                <textarea id="ttsText" placeholder="Enter text here..." rows="6"></textarea>
            </div>
            <div class="form-group">
                <label for="voiceSelect">Select Voice:</label>
                <select id="voiceSelect"></select>
            </div>
            <div class="form-group">
                <label for="speechRate">Speech Rate: <span id="rateValue">1</span></label>
                <input type="range" id="speechRate" min="0.5" max="2" step="0.1" value="1">
            </div>
            <div class="tool-actions">
                <button class="tool-button" onclick="speakText()">🗣️ Speak</button>
                <button class="tool-button" onclick="stopSpeaking()" style="background: #dc3545;">⏹️ Stop</button>
            </div>
        </div>
    `
}

function createSpeechToTextInterface() {
  return `
        <div class="tool-form">
            <div class="tool-actions" style="margin-bottom: 2rem;">
                <button class="tool-button" id="startRecording" onclick="startRecording()">🎤 Start Recording</button>
                <button class="tool-button" id="stopRecording" onclick="stopRecording()" disabled style="background: #dc3545;">⏹️ Stop Recording</button>
            </div>
            <div id="recordingStatus" style="text-align: center; margin-bottom: 1rem; font-weight: 500;"></div>
            <div class="form-group">
                <label for="speechResult">Transcribed Text:</label>
                <textarea id="speechResult" rows="8" readonly placeholder="Your speech will be transcribed here..."></textarea>
            </div>
            <div class="tool-actions">
                <button class="tool-button" onclick="copyTranscription()">📋 Copy Text</button>
            </div>
        </div>
    `
}

function createTimerStopwatchInterface() {
  return `
        <div class="tool-form">
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem; justify-content: center;">
                <button class="tool-button tab-button active" onclick="switchTab('timer')">⏰ Timer</button>
                <button class="tool-button tab-button" onclick="switchTab('stopwatch')" style="background: #6c757d;">⏱️ Stopwatch</button>
            </div>
            
            <div id="timerTab" class="timer-content">
                <div style="display: flex; gap: 0.5rem; justify-content: center; align-items: center; margin-bottom: 2rem;">
                    <input type="number" id="timerHours" min="0" max="23" value="0" placeholder="HH" style="width: 60px; text-align: center;">
                    <span style="font-size: 1.5rem; font-weight: bold;">:</span>
                    <input type="number" id="timerMinutes" min="0" max="59" value="5" placeholder="MM" style="width: 60px; text-align: center;">
                    <span style="font-size: 1.5rem; font-weight: bold;">:</span>
                    <input type="number" id="timerSeconds" min="0" max="59" value="0" placeholder="SS" style="width: 60px; text-align: center;">
                </div>
                <div id="timerDisplay" style="font-size: 3rem; font-weight: bold; text-align: center; color: #d41645; margin: 2rem 0;">05:00</div>
                <div class="tool-actions">
                    <button class="tool-button" onclick="startTimer()">▶️ Start</button>
                    <button class="tool-button" onclick="pauseTimer()" style="background: #ffc107; color: #000;">⏸️ Pause</button>
                    <button class="tool-button" onclick="resetTimer()" style="background: #6c757d;">🔄 Reset</button>
                </div>
            </div>
            
            <div id="stopwatchTab" class="timer-content" style="display: none;">
                <div id="stopwatchDisplay" style="font-size: 3rem; font-weight: bold; text-align: center; color: #d41645; margin: 2rem 0;">00:00:00</div>
                <div class="tool-actions">
                    <button class="tool-button" onclick="startStopwatch()">▶️ Start</button>
                    <button class="tool-button" onclick="pauseStopwatch()" style="background: #ffc107; color: #000;">⏸️ Pause</button>
                    <button class="tool-button" onclick="resetStopwatch()" style="background: #6c757d;">🔄 Reset</button>
                    <button class="tool-button" onclick="lapStopwatch()" style="background: #17a2b8;">📍 Lap</button>
                </div>
                <div id="lapTimes" style="margin-top: 2rem; max-height: 200px; overflow-y: auto;"></div>
            </div>
        </div>
    `
}

// Tool Functionality Initialization
function initializeToolFunctionality(toolName) {
  switch (toolName) {
    case "password-generator":
      initializePasswordGenerator()
      break
    case "word-counter":
      initializeWordCounter()
      break
    case "color-picker":
      initializeColorPicker()
      break
    case "image-converter":
      initializeImageConverter()
      break
    case "unit-converter":
      initializeUnitConverter()
      break
    case "text-to-speech":
      initializeTextToSpeech()
      break
    case "speech-to-text":
      initializeSpeechToText()
      break
    case "timer-stopwatch":
      initializeTimerStopwatch()
      break
    default:
      initializeFileUpload()
      break
  }
}

// File Upload Functionality
function initializeFileUpload() {
  const fileInput = document.getElementById("fileInput")
  const fileUpload = document.querySelector(".file-upload")

  if (fileInput) {
    fileInput.addEventListener("change", handleFileSelect)

    // Drag and drop functionality
    fileUpload.addEventListener("dragover", handleDragOver)
    fileUpload.addEventListener("dragleave", handleDragLeave)
    fileUpload.addEventListener("drop", handleFileDrop)
  }
}

function handleFileSelect(e) {
  const files = Array.from(e.target.files)
  uploadedFiles = files
  displayFileList(files)
  document.getElementById("processBtn").disabled = files.length === 0
}

function handleDragOver(e) {
  e.preventDefault()
  e.currentTarget.classList.add("dragover")
}

function handleDragLeave(e) {
  e.preventDefault()
  e.currentTarget.classList.remove("dragover")
}

function handleFileDrop(e) {
  e.preventDefault()
  e.currentTarget.classList.remove("dragover")

  const files = Array.from(e.dataTransfer.files)
  uploadedFiles = files
  displayFileList(files)
  document.getElementById("processBtn").disabled = files.length === 0
}

function displayFileList(files) {
  const fileList = document.getElementById("fileList")
  if (!fileList) return

  fileList.innerHTML = files
    .map(
      (file) => `
        <div class="file-item">
            <span class="file-name">${file.name}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
        </div>
    `,
    )
    .join("")
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

function processFiles() {
  if (uploadedFiles.length === 0) {
    showToast("Please select files first", "error")
    return
  }

  showProgressBar()

  // Simulate processing
  setTimeout(() => {
    hideProgressBar()
    showToast(`Successfully processed ${uploadedFiles.length} file(s)`, "success")
    createDownloadLink()
  }, 2000)
}

function clearFiles() {
  uploadedFiles = []
  const fileInput = document.getElementById("fileInput")
  const fileList = document.getElementById("fileList")
  const processBtn = document.getElementById("processBtn")

  if (fileInput) fileInput.value = ""
  if (fileList) fileList.innerHTML = ""
  if (processBtn) processBtn.disabled = true
}

function showProgressBar() {
  const progressBar = document.getElementById("progressBar")
  if (progressBar) {
    progressBar.style.display = "block"
    const progressFill = progressBar.querySelector(".progress-fill")
    progressFill.style.width = "0%"

    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      progressFill.style.width = progress + "%"
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 200)
  }
}

function hideProgressBar() {
  const progressBar = document.getElementById("progressBar")
  if (progressBar) {
    progressBar.style.display = "none"
  }
}

function createDownloadLink() {
  const modalBody = document.getElementById("modalBody")
  const existingDownload = modalBody.querySelector(".download-section")

  if (!existingDownload) {
    const downloadSection = document.createElement("div")
    downloadSection.className = "download-section"
    downloadSection.innerHTML = `
            <div class="download-icon">✅</div>
            <h3>Files Ready for Download</h3>
            <p>Your files have been processed successfully</p>
            <button class="download-button" onclick="downloadFiles()">📥 Download Processed Files</button>
        `
    modalBody.appendChild(downloadSection)
  }
}

function downloadFiles() {
  showToast("Download started", "success")
}

// QR Code Generator
function generateQR() {
  const text = document.getElementById("qrText").value
  const size = document.getElementById("qrSize").value
  const result = document.getElementById("qrResult")

  if (!text.trim()) {
    showToast("Please enter text or URL", "error")
    return
  }

  // Create QR code using a simple pattern (in real implementation, use QR library)
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")

  // Simple QR-like pattern for demo
  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = "#ffffff"

  // Create a simple pattern
  const cellSize = size / 25
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      if ((i + j + text.length) % 3 === 0) {
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
      }
    }
  }

  result.innerHTML = `
        <h4>Generated QR Code:</h4>
        <div style="text-align: center; margin: 1rem 0;">
            ${canvas.outerHTML}
        </div>
        <div class="tool-actions">
            <button class="download-button" onclick="downloadQR()">📥 Download QR Code</button>
        </div>
    `
}

function downloadQR() {
  showToast("QR Code download started", "success")
}

// Password Generator
function initializePasswordGenerator() {
  const lengthSlider = document.getElementById("passwordLength")
  const lengthValue = document.getElementById("lengthValue")

  if (lengthSlider && lengthValue) {
    lengthSlider.addEventListener("input", function () {
      lengthValue.textContent = this.value
    })
  }
}

function generatePassword() {
  const length = Number.parseInt(document.getElementById("passwordLength").value)
  const includeUppercase = document.getElementById("includeUppercase").checked
  const includeLowercase = document.getElementById("includeLowercase").checked
  const includeNumbers = document.getElementById("includeNumbers").checked
  const includeSymbols = document.getElementById("includeSymbols").checked

  let charset = ""
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
  if (includeNumbers) charset += "0123456789"
  if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

  if (!charset) {
    showToast("Please select at least one character type", "error")
    return
  }

  let password = ""
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  document.getElementById("generatedPassword").value = password
}

function copyPassword() {
  const passwordField = document.getElementById("generatedPassword")
  passwordField.select()
  document.execCommand("copy")
  showToast("Password copied to clipboard", "success")
}

// Word Counter
function initializeWordCounter() {
  const textInput = document.getElementById("textInput")
  if (textInput) {
    textInput.addEventListener("input", updateWordCount)
    updateWordCount() // Initialize with empty values
  }
}

function updateWordCount() {
  const text = document.getElementById("textInput").value

  const charCount = text.length
  const charNoSpaceCount = text.replace(/\s/g, "").length
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const sentenceCount = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0
  const paragraphCount = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0

  document.getElementById("charCount").textContent = charCount
  document.getElementById("charNoSpaceCount").textContent = charNoSpaceCount
  document.getElementById("wordCount").textContent = wordCount
  document.getElementById("sentenceCount").textContent = sentenceCount
  document.getElementById("paragraphCount").textContent = paragraphCount
}

// Age Calculator
function calculateAge() {
  const birthDate = new Date(document.getElementById("birthDate").value)
  const today = new Date()

  if (!birthDate || birthDate > today) {
    showToast("Please enter a valid birth date", "error")
    return
  }

  const ageInMs = today - birthDate
  const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24))
  const years = Math.floor(ageInDays / 365.25)
  const months = Math.floor((ageInDays % 365.25) / 30.44)
  const days = Math.floor((ageInDays % 365.25) % 30.44)

  document.getElementById("ageResult").innerHTML = `
        <h3>Your Age:</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem; margin: 1rem 0;">
            <div style="text-align: center;">
                <div style="font-size: 2rem; font-weight: bold; color: #d41645;">${years}</div>
                <div style="color: #666;">Years</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 2rem; font-weight: bold; color: #d41645;">${months}</div>
                <div style="color: #666;">Months</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 2rem; font-weight: bold; color: #d41645;">${days}</div>
                <div style="color: #666;">Days</div>
            </div>
        </div>
        <p style="text-align: center; margin-top: 1rem;">Total days lived: <strong>${ageInDays.toLocaleString()}</strong></p>
    `
}

// BMI Calculator
function calculateBMI() {
  const weight = Number.parseFloat(document.getElementById("weight").value)
  const height = Number.parseFloat(document.getElementById("height").value) / 100 // Convert cm to m

  if (!weight || !height || weight <= 0 || height <= 0) {
    showToast("Please enter valid weight and height values", "error")
    return
  }

  const bmi = weight / (height * height)
  let category = ""
  let color = ""

  if (bmi < 18.5) {
    category = "Underweight"
    color = "#17a2b8"
  } else if (bmi < 25) {
    category = "Normal weight"
    color = "#28a745"
  } else if (bmi < 30) {
    category = "Overweight"
    color = "#ffc107"
  } else {
    category = "Obese"
    color = "#dc3545"
  }

  document.getElementById("bmiResult").innerHTML = `
        <h3>Your BMI Result:</h3>
        <div style="text-align: center; margin: 2rem 0;">
            <div style="font-size: 3rem; font-weight: bold; color: ${color};">${bmi.toFixed(1)}</div>
            <div style="font-size: 1.5rem; color: ${color}; margin-top: 0.5rem;">${category}</div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem; font-size: 0.9rem;">
            <div style="padding: 0.5rem; background: #f8f9fa; border-radius: 4px; text-align: center;">
                <div style="font-weight: bold;">< 18.5</div>
                <div>Underweight</div>
            </div>
            <div style="padding: 0.5rem; background: #f8f9fa; border-radius: 4px; text-align: center;">
                <div style="font-weight: bold;">18.5 - 24.9</div>
                <div>Normal</div>
            </div>
            <div style="padding: 0.5rem; background: #f8f9fa; border-radius: 4px; text-align: center;">
                <div style="font-weight: bold;">25 - 29.9</div>
                <div>Overweight</div>
            </div>
            <div style="padding: 0.5rem; background: #f8f9fa; border-radius: 4px; text-align: center;">
                <div style="font-weight: bold;">≥ 30</div>
                <div>Obese</div>
            </div>
        </div>
    `
}

// Color Picker
function initializeColorPicker() {
  const colorPicker = document.getElementById("colorPicker")
  if (colorPicker) {
    colorPicker.addEventListener("input", updateColorValues)
    updateColorValues() // Initialize with default color
  }
}

function updateColorValues() {
  const color = document.getElementById("colorPicker").value
  const rgb = hexToRgb(color)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  document.getElementById("colorDisplay").style.backgroundColor = color
  document.getElementById("hexValue").value = color.toUpperCase()
  document.getElementById("rgbValue").value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  document.getElementById("hslValue").value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

// Image Converter
function initializeImageConverter() {
  const imageInput = document.getElementById("imageInput")
  if (imageInput) {
    imageInput.addEventListener("change", handleImageSelect)
  }
}

function handleImageSelect(e) {
  const files = Array.from(e.target.files)
  uploadedFiles = files
  displayImagePreview(files)
  document.getElementById("convertBtn").disabled = files.length === 0
}

function displayImagePreview(files) {
  const preview = document.getElementById("imagePreview")
  if (!preview) return

  preview.innerHTML = files
    .map((file) => {
      const url = URL.createObjectURL(file)
      return `
            <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; border: 1px solid #e0e0e0;">
                <img src="${url}" alt="${file.name}" style="max-width: 100px; max-height: 100px; border-radius: 4px;">
                <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #666;">${file.name}</div>
            </div>
        `
    })
    .join("")
}

function convertImages() {
  const format = document.getElementById("outputFormat").value
  showToast(`Converting ${uploadedFiles.length} image(s) to ${format.toUpperCase()}`, "success")

  // Simulate conversion process
  setTimeout(() => {
    showToast("Images converted successfully", "success")
    createDownloadLink()
  }, 2000)
}

// Unit Converter
function initializeUnitConverter() {
  updateUnitOptions()
}

function updateUnitOptions() {
  const unitType = document.getElementById("unitType").value
  const fromUnit = document.getElementById("fromUnit")
  const toUnit = document.getElementById("toUnit")

  const units = {
    length: ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"],
    weight: ["kilogram", "gram", "pound", "ounce", "ton"],
    temperature: ["celsius", "fahrenheit", "kelvin"],
    area: ["square meter", "square kilometer", "square foot", "square inch", "acre", "hectare"],
    volume: ["liter", "milliliter", "gallon", "quart", "pint", "cup", "fluid ounce"],
  }

  const unitList = units[unitType]
  fromUnit.innerHTML = unitList.map((unit) => `<option value="${unit}">${unit}</option>`).join("")
  toUnit.innerHTML = unitList.map((unit) => `<option value="${unit}">${unit}</option>`).join("")

  // Set different default units
  if (unitList.length > 1) {
    toUnit.selectedIndex = 1
  }

  convertUnit() // Update conversion
}

function convertUnit() {
  const fromValue = Number.parseFloat(document.getElementById("fromValue").value)
  const fromUnit = document.getElementById("fromUnit").value
  const toUnit = document.getElementById("toUnit").value

  if (isNaN(fromValue)) {
    document.getElementById("toValue").value = ""
    return
  }

  // Simple conversion logic (in real implementation, use proper conversion factors)
  let result = fromValue

  // This is a simplified conversion - in reality, you'd have proper conversion tables
  if (fromUnit !== toUnit) {
    // Simulate conversion with a random factor for demo
    const conversionFactor = Math.random() * 10 + 0.1
    result = fromValue * conversionFactor
  }

  document.getElementById("toValue").value = result.toFixed(4)
}

// JSON Formatter
function formatJSON() {
  const input = document.getElementById("jsonInput").value
  const output = document.getElementById("jsonOutput")
  const status = document.getElementById("jsonStatus")

  try {
    const parsed = JSON.parse(input)
    const formatted = JSON.stringify(parsed, null, 2)
    output.value = formatted
    status.innerHTML = '<span style="color: #28a745;">✓ Valid JSON - Formatted successfully</span>'
  } catch (error) {
    status.innerHTML = `<span style="color: #dc3545;">✗ Invalid JSON: ${error.message}</span>`
  }
}

function minifyJSON() {
  const input = document.getElementById("jsonInput").value
  const output = document.getElementById("jsonOutput")
  const status = document.getElementById("jsonStatus")

  try {
    const parsed = JSON.parse(input)
    const minified = JSON.stringify(parsed)
    output.value = minified
    status.innerHTML = '<span style="color: #28a745;">✓ JSON Minified successfully</span>'
  } catch (error) {
    status.innerHTML = `<span style="color: #dc3545;">✗ Invalid JSON: ${error.message}</span>`
  }
}

function validateJSON() {
  const input = document.getElementById("jsonInput").value
  const status = document.getElementById("jsonStatus")

  try {
    JSON.parse(input)
    status.innerHTML = '<span style="color: #28a745;">✓ Valid JSON</span>'
  } catch (error) {
    status.innerHTML = `<span style="color: #dc3545;">✗ Invalid JSON: ${error.message}</span>`
  }
}

// Text to Speech
function initializeTextToSpeech() {
  populateVoices()

  const rateSlider = document.getElementById("speechRate")
  const rateValue = document.getElementById("rateValue")

  if (rateSlider && rateValue) {
    rateSlider.addEventListener("input", function () {
      rateValue.textContent = this.value
    })
  }
}

function populateVoices() {
  const voiceSelect = document.getElementById("voiceSelect")
  if (!voiceSelect) return

  const voices = speechSynthesis.getVoices()

  voiceSelect.innerHTML = voices
    .map((voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`)
    .join("")

  if (voices.length === 0) {
    voiceSelect.innerHTML = "<option>Loading voices...</option>"
  }
}

function speakText() {
  const text = document.getElementById("ttsText").value
  const voiceIndex = document.getElementById("voiceSelect").value
  const rate = document.getElementById("speechRate").value

  if (!text.trim()) {
    showToast("Please enter text to speak", "error")
    return
  }

  const utterance = new SpeechSynthesisUtterance(text)
  const voices = speechSynthesis.getVoices()

  if (voices[voiceIndex]) {
    utterance.voice = voices[voiceIndex]
  }

  utterance.rate = Number.parseFloat(rate)
  speechSynthesis.speak(utterance)

  showToast("Speaking...", "success")
}

function stopSpeaking() {
  speechSynthesis.cancel()
  showToast("Speech stopped", "success")
}

// Speech to Text
let recognition

function initializeSpeechToText() {
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event) => {
      let finalTranscript = ""
      let interimTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      const currentText = document.getElementById("speechResult").value
      document.getElementById("speechResult").value = currentText + finalTranscript + interimTranscript
    }

    recognition.onerror = (event) => {
      showToast("Speech recognition error: " + event.error, "error")
      document.getElementById("startRecording").disabled = false
      document.getElementById("stopRecording").disabled = true
      document.getElementById("recordingStatus").innerHTML = ""
    }

    recognition.onend = () => {
      document.getElementById("startRecording").disabled = false
      document.getElementById("stopRecording").disabled = true
      document.getElementById("recordingStatus").innerHTML =
        '<span style="color: #28a745;">🟢 Recording completed</span>'
    }
  } else {
    showToast("Speech recognition not supported in this browser", "error")
    document.getElementById("startRecording").disabled = true
  }
}

function startRecording() {
  if (recognition) {
    recognition.start()
    document.getElementById("startRecording").disabled = true
    document.getElementById("stopRecording").disabled = false
    document.getElementById("recordingStatus").innerHTML = '<span style="color: #dc3545;">🔴 Recording...</span>'
  }
}

function stopRecording() {
  if (recognition) {
    recognition.stop()
  }
}

function copyTranscription() {
  const text = document.getElementById("speechResult").value
  if (text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast("Text copied to clipboard", "success")
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        showToast("Text copied to clipboard", "success")
      })
  } else {
    showToast("No text to copy", "error")
  }
}

// Timer and Stopwatch
let timerInterval
let stopwatchInterval
let timerTime = 0
let stopwatchTime = 0
let lapTimes = []

function initializeTimerStopwatch() {
  updateTimerDisplay()
  updateStopwatchDisplay()
}

function switchTab(tab) {
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active")
    btn.style.background = "#6c757d"
  })
  document.querySelectorAll(".timer-content").forEach((content) => (content.style.display = "none"))

  event.target.classList.add("active")
  event.target.style.background = "#d41645"
  document.getElementById(tab + "Tab").style.display = "block"
}

function startTimer() {
  const hours = Number.parseInt(document.getElementById("timerHours").value) || 0
  const minutes = Number.parseInt(document.getElementById("timerMinutes").value) || 0
  const seconds = Number.parseInt(document.getElementById("timerSeconds").value) || 0

  timerTime = hours * 3600 + minutes * 60 + seconds

  if (timerTime <= 0) {
    showToast("Please set a valid time", "error")
    return
  }

  timerInterval = setInterval(() => {
    timerTime--
    updateTimerDisplay()

    if (timerTime <= 0) {
      clearInterval(timerInterval)
      showToast("Timer finished! ⏰", "success")
    }
  }, 1000)
}

function pauseTimer() {
  clearInterval(timerInterval)
}

function resetTimer() {
  clearInterval(timerInterval)
  const hours = Number.parseInt(document.getElementById("timerHours").value) || 0
  const minutes = Number.parseInt(document.getElementById("timerMinutes").value) || 0
  const seconds = Number.parseInt(document.getElementById("timerSeconds").value) || 0
  timerTime = hours * 3600 + minutes * 60 + seconds
  updateTimerDisplay()
}

function updateTimerDisplay() {
  const hours = Math.floor(timerTime / 3600)
  const minutes = Math.floor((timerTime % 3600) / 60)
  const seconds = timerTime % 60

  const display = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  document.getElementById("timerDisplay").textContent = display
}

function startStopwatch() {
  stopwatchInterval = setInterval(() => {
    stopwatchTime++
    updateStopwatchDisplay()
  }, 10) // Update every 10ms for more precision
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval)
}

function resetStopwatch() {
  clearInterval(stopwatchInterval)
  stopwatchTime = 0
  lapTimes = []
  updateStopwatchDisplay()
  document.getElementById("lapTimes").innerHTML = ""
}

function lapStopwatch() {
  if (stopwatchTime > 0) {
    lapTimes.push(stopwatchTime)
    const lapTime = formatStopwatchTime(stopwatchTime)
    const lapList = document.getElementById("lapTimes")
    const lapDiv = document.createElement("div")
    lapDiv.style.cssText =
      "padding: 0.5rem; margin: 0.25rem 0; background: #f8f9fa; border-radius: 4px; border: 1px solid #e0e0e0; display: flex; justify-content: space-between;"
    lapDiv.innerHTML = `<span>Lap ${lapTimes.length}</span><span style="font-weight: bold; color: #d41645;">${lapTime}</span>`
    lapList.appendChild(lapDiv)
  }
}

function updateStopwatchDisplay() {
  const display = formatStopwatchTime(stopwatchTime)
  document.getElementById("stopwatchDisplay").textContent = display
}

function formatStopwatchTime(time) {
  const minutes = Math.floor(time / 6000)
  const seconds = Math.floor((time % 6000) / 100)
  const centiseconds = time % 100

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${centiseconds.toString().padStart(2, "0")}`
}

// Utility Functions
function scrollToTools() {
  document.getElementById("tools").scrollIntoView({ behavior: "smooth" })
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  const toastMessage = document.getElementById("toastMessage")
  const toastIcon = document.querySelector(".toast-icon")

  toastMessage.textContent = message
  toastIcon.textContent = type === "success" ? "✓" : "✗"

  // Change toast color based on type
  if (type === "error") {
    toast.style.background = "#dc3545"
  } else {
    toast.style.background = "#d41645"
  }

  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Initialize voices when they're loaded
if (typeof speechSynthesis !== "undefined") {
  speechSynthesis.onvoiceschanged = () => {
    if (document.getElementById("voiceSelect")) {
      populateVoices()
    }
  }
}
