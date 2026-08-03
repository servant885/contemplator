const translations = {
  tr: {
    brand: "Düşünmez misiniz?",
    pageTitle: "Düşünmez misiniz?",
    eyebrow: "Gördüğünün ötesine bak",
    heroTitle: "Bir fotoğraf çek.<br>Tefekkür etmeye başla.",
    heroText: "Çevrendeki herhangi bir şeyi fotoğraflandır. Yapay zekâ görüntüyü incelesin, bilimsel yönünü açıklasın ve seni yaratılış üzerine düşünmeye davet etsin.",
    cameraTitle: "Fotoğraf çek",
    cameraSubtitle: "Kamerayı aç",
    galleryTitle: "Galeriden seç",
    gallerySubtitle: "Mevcut bir fotoğraf yükle",
    privacy: "Fotoğraf yalnızca analiz için kullanılır.",
    previewEyebrow: "Seçtiğin görüntü",
    previewTitle: "Hazır olduğunda üzerinde düşün.",
    change: "Değiştir",
    analyze: "Üzerinde düşün",
    loadingTitle: "Görüntü inceleniyor…",
    loadingText: "Bilimsel ayrıntılar ve tefekkür noktaları hazırlanıyor.",
    resultEyebrow: "Tefekkür",
    newPhoto: "Yeni fotoğraf",
    observation: "Ne görüyorsun?",
    science: "Arkasındaki bilim",
    reflection: "Tefekkür",
    quran: "İlgili ayet",
    questionLabel: "Kendine sor",
    anotherImage: "Başka bir fotoğraf seç",
    errorTitle: "Analiz yapılamadı",
    errorText: "Lütfen bağlantını kontrol edip tekrar dene.",
    retry: "Tekrar dene",
    footer: "Bak. Düşün. Hatırla.",
    invalidImage: "Lütfen geçerli bir fotoğraf seç.",
    tooLarge: "Fotoğraf çok büyük. Daha küçük bir görüntü seç."
  },
  en: {
    brand: "Will You Not Reflect?",
    pageTitle: "Will You Not Reflect?",
    eyebrow: "Look beyond what you see",
    heroTitle: "Take a photo.<br>Begin to reflect.",
    heroText: "Photograph anything around you. Let AI examine it, explain the science behind it, and invite you to reflect on creation.",
    cameraTitle: "Take a photo",
    cameraSubtitle: "Open the camera",
    galleryTitle: "Choose from gallery",
    gallerySubtitle: "Upload an existing photo",
    privacy: "Your photo is used only for analysis.",
    previewEyebrow: "Your selected image",
    previewTitle: "Reflect on it when you are ready.",
    change: "Change",
    analyze: "Reflect on this",
    loadingTitle: "Examining the image…",
    loadingText: "Preparing its scientific details and points for reflection.",
    resultEyebrow: "Reflection",
    newPhoto: "New photo",
    observation: "What do you see?",
    science: "The science behind it",
    reflection: "Reflection",
    quran: "Related verse",
    questionLabel: "Ask yourself",
    anotherImage: "Choose another photo",
    errorTitle: "Analysis failed",
    errorText: "Please check your connection and try again.",
    retry: "Try again",
    footer: "Observe. Reflect. Remember.",
    invalidImage: "Please choose a valid image.",
    tooLarge: "The image is too large. Please choose a smaller one."
  },
  de: {
    brand: "Denkt ihr denn nicht nach?",
    pageTitle: "Denkt ihr denn nicht nach?",
    eyebrow: "Blicke über das Sichtbare hinaus",
    heroTitle: "Mach ein Foto.<br>Beginne nachzudenken.",
    heroText: "Fotografiere etwas aus deiner Umgebung. Die KI untersucht das Bild, erklärt die Wissenschaft dahinter und lädt dich ein, über die Schöpfung nachzudenken.",
    cameraTitle: "Foto aufnehmen",
    cameraSubtitle: "Kamera öffnen",
    galleryTitle: "Aus Galerie wählen",
    gallerySubtitle: "Vorhandenes Foto hochladen",
    privacy: "Dein Foto wird nur zur Analyse verwendet.",
    previewEyebrow: "Dein ausgewähltes Bild",
    previewTitle: "Denke darüber nach, wenn du bereit bist.",
    change: "Ändern",
    analyze: "Darüber nachdenken",
    loadingTitle: "Das Bild wird untersucht…",
    loadingText: "Wissenschaftliche Einzelheiten und Impulse werden vorbereitet.",
    resultEyebrow: "Reflexion",
    newPhoto: "Neues Foto",
    observation: "Was siehst du?",
    science: "Die Wissenschaft dahinter",
    reflection: "Reflexion",
    quran: "Passender Vers",
    questionLabel: "Frage dich selbst",
    anotherImage: "Anderes Foto wählen",
    errorTitle: "Analyse fehlgeschlagen",
    errorText: "Bitte überprüfe deine Verbindung und versuche es erneut.",
    retry: "Erneut versuchen",
    footer: "Beobachte. Denke nach. Erinnere dich.",
    invalidImage: "Bitte wähle ein gültiges Bild.",
    tooLarge: "Das Bild ist zu groß. Bitte wähle ein kleineres."
  }
};

const elements = {
  language: document.getElementById("languageSelect"),
  hero: document.getElementById("heroSection"),
  preview: document.getElementById("previewSection"),
  loading: document.getElementById("loadingSection"),
  result: document.getElementById("resultSection"),
  error: document.getElementById("errorSection"),
  cameraInput: document.getElementById("cameraInput"),
  galleryInput: document.getElementById("galleryInput"),
  previewImage: document.getElementById("previewImage"),
  resultImage: document.getElementById("resultImage"),
  analyzeButton: document.getElementById("analyzeButton")
};

let selectedImage = "";
let currentLanguage = localStorage.getItem("language") || "tr";

function setText(id, value, html = false) {
  const element = document.getElementById(id);
  if (!element) return;
  if (html) element.innerHTML = value;
  else element.textContent = value;
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "tr";
  localStorage.setItem("language", currentLanguage);
  elements.language.value = currentLanguage;
  document.documentElement.lang = currentLanguage;

  const t = translations[currentLanguage];
  document.title = t.pageTitle;

  setText("brandName", t.brand);
  setText("eyebrow", t.eyebrow);
  setText("heroTitle", t.heroTitle, true);
  setText("heroText", t.heroText);
  setText("cameraTitle", t.cameraTitle);
  setText("cameraSubtitle", t.cameraSubtitle);
  setText("galleryTitle", t.galleryTitle);
  setText("gallerySubtitle", t.gallerySubtitle);
  setText("privacyNote", t.privacy);
  setText("previewEyebrow", t.previewEyebrow);
  setText("previewTitle", t.previewTitle);
  setText("changeImageButton", t.change);
  setText("analyzeButtonText", t.analyze);
  setText("loadingTitle", t.loadingTitle);
  setText("loadingText", t.loadingText);
  setText("resultEyebrow", t.resultEyebrow);
  setText("newReflectionButton", t.newPhoto);
  setText("observationHeading", t.observation);
  setText("scienceHeading", t.science);
  setText("reflectionHeading", t.reflection);
  setText("quranHeading", t.quran);
  setText("questionLabel", t.questionLabel);
  setText("anotherImageText", t.anotherImage);
  setText("errorTitle", t.errorTitle);
  setText("errorText", t.errorText);
  setText("retryButton", t.retry);
  setText("footerText", t.footer);
}

function showSection(section) {
  [elements.hero, elements.preview, elements.loading, elements.result, elements.error]
    .forEach(item => item.classList.add("hidden"));
  section.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetApp() {
  selectedImage = "";
  elements.cameraInput.value = "";
  elements.galleryInput.value = "";
  showSection(elements.hero);
}

async function prepareImage(file) {
  const t = translations[currentLanguage];

  if (!file || !file.type.startsWith("image/")) {
    throw new Error(t.invalidImage);
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error(t.tooLarge);
  }

  const imageUrl = URL.createObjectURL(file);
  const image = await loadImage(imageUrl);

  const maxDimension = 1600;
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, width, height);

  URL.revokeObjectURL(imageUrl);
  return canvas.toDataURL("image/jpeg", 0.84);
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image could not be loaded"));
    image.src = url;
  });
}

async function handleFile(file) {
  try {
    selectedImage = await prepareImage(file);
    elements.previewImage.src = selectedImage;
    showSection(elements.preview);
  } catch (error) {
    showError(error.message);
  }
}

function showError(message) {
  setText("errorText", message || translations[currentLanguage].errorText);
  showSection(elements.error);
}

function renderResult(data) {
  elements.resultImage.src = selectedImage;
  setText("resultTitle", data.title || translations[currentLanguage].reflection);
  setText("observationText", data.observation || "");
  setText("scienceText", data.science || "");
  setText("reflectionText", data.reflection || "");
  setText("questionText", data.question || "");

  const quranCard = document.getElementById("quranCard");
  const hasQuran = Boolean(data.quran_text && data.quran_reference);

  quranCard.classList.toggle("hidden", !hasQuran);

  if (hasQuran) {
    setText("quranText", data.quran_text);
    setText("quranReference", data.quran_reference);
  }

  showSection(elements.result);
}

async function analyzeImage() {
  if (!selectedImage) return;

  showSection(elements.loading);

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: selectedImage,
        language: currentLanguage
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || translations[currentLanguage].errorText);
    }

    renderResult(data);
  } catch (error) {
    showError(error.message);
  }
}

document.getElementById("cameraButton").addEventListener("click", () => {
  elements.cameraInput.click();
});

document.getElementById("galleryButton").addEventListener("click", () => {
  elements.galleryInput.click();
});

elements.cameraInput.addEventListener("change", event => {
  handleFile(event.target.files?.[0]);
});

elements.galleryInput.addEventListener("change", event => {
  handleFile(event.target.files?.[0]);
});

elements.language.addEventListener("change", event => {
  applyLanguage(event.target.value);
});

elements.analyzeButton.addEventListener("click", analyzeImage);
document.getElementById("changeImageButton").addEventListener("click", () => elements.galleryInput.click());
document.getElementById("newReflectionButton").addEventListener("click", resetApp);
document.getElementById("anotherImageButton").addEventListener("click", resetApp);
document.getElementById("retryButton").addEventListener("click", () => {
  if (selectedImage) analyzeImage();
  else resetApp();
});

applyLanguage(currentLanguage);
