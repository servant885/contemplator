const $ = (id) => document.getElementById(id);

const strings = {
  tr: {
    title: "Düşünmez misiniz?",
    eyebrow: "TEFEKKÜR ARACI",
    subtitle: "Bir fotoğraf çek. Gördüğünün ardındaki düzeni düşün.",
    pickLabel: "Bir fotoğraf ekle",
    pickHint: "Kameradan çek veya galeriden seç",
    camera: "Kamerayı aç",
    gallery: "Galeriden seç",
    cameraHelp: "Kamera siyah görünürse sayfayı Safari veya Chrome'da açıp kamera izni ver. Galeriden seçim her zaman kullanılabilir.",
    analyze: "Üzerinde düşün",
    privacy: "Fotoğraf yalnızca analiz için güvenli sunucuya gönderilir.",
    loading: "Fotoğraf inceleniyor…",
    science: "Bilim",
    reflection: "Tefekkür",
    quran: "Kur’an’dan bir işaret",
    seen: "GÖRDÜĞÜN",
    again: "Başka bir fotoğraf seç",
    error: "Analiz yapılamadı. Lütfen tekrar dene.",
    fileError: "Bu fotoğraf açılamadı. Lütfen başka bir fotoğraf dene."
  },
  en: {
    title: "Will You Not Reflect?",
    eyebrow: "A TOOL FOR REFLECTION",
    subtitle: "Take a photo. Reflect on the order behind what you see.",
    pickLabel: "Add a photo",
    pickHint: "Take one with the camera or choose from your gallery",
    camera: "Open camera",
    gallery: "Choose from gallery",
    cameraHelp: "If the camera appears black, open this page in Safari or Chrome and allow camera access. Gallery upload will still work.",
    analyze: "Reflect on it",
    privacy: "The photo is sent securely only for analysis.",
    loading: "Examining the image…",
    science: "Science",
    reflection: "Reflection",
    quran: "A sign from the Qur’an",
    seen: "WHAT YOU SEE",
    again: "Choose another photo",
    error: "The analysis failed. Please try again.",
    fileError: "This photo could not be opened. Please try another one."
  },
  de: {
    title: "Denkt ihr denn nicht nach?",
    eyebrow: "WERKZEUG ZUR BESINNUNG",
    subtitle: "Mach ein Foto. Denke über die Ordnung hinter dem Sichtbaren nach.",
    pickLabel: "Ein Foto hinzufügen",
    pickHint: "Mit der Kamera aufnehmen oder aus der Galerie auswählen",
    camera: "Kamera öffnen",
    gallery: "Aus Galerie wählen",
    cameraHelp: "Wenn die Kamera schwarz bleibt, öffne die Seite in Safari oder Chrome und erlaube den Kamerazugriff. Die Galerie funktioniert weiterhin.",
    analyze: "Darüber nachdenken",
    privacy: "Das Foto wird nur zur Analyse sicher übertragen.",
    loading: "Das Bild wird untersucht…",
    science: "Wissenschaft",
    reflection: "Besinnung",
    quran: "Ein Zeichen aus dem Qur’an",
    seen: "WAS DU SIEHST",
    again: "Anderes Foto auswählen",
    error: "Die Analyse ist fehlgeschlagen. Bitte versuche es erneut.",
    fileError: "Dieses Foto konnte nicht geöffnet werden. Bitte versuche ein anderes."
  }
};

let imageData = "";

function currentStrings() {
  return strings[$("language").value];
}

function applyLanguage() {
  const s = currentStrings();
  document.documentElement.lang = $("language").value;
  document.title = s.title;
  $("appTitle").textContent = s.title;
  $("eyebrow").textContent = s.eyebrow;
  $("subtitle").textContent = s.subtitle;
  $("pickLabel").textContent = s.pickLabel;
  $("pickHint").textContent = s.pickHint;
  $("cameraBtn").textContent = s.camera;
  $("galleryBtn").textContent = s.gallery;
  $("cameraHelp").textContent = s.cameraHelp;
  $("analyzeBtn").textContent = s.analyze;
  $("privacy").textContent = s.privacy;
  $("scienceLabel").textContent = s.science;
  $("reflectionLabel").textContent = s.reflection;
  $("quranLabel").textContent = s.quran;
  $("resultLabel").textContent = s.seen;
  $("againBtn").textContent = s.again;
}

$("language").addEventListener("change", applyLanguage);

$("cameraBtn").addEventListener("click", () => {
  $("cameraHelp").hidden = false;
  $("cameraInput").value = "";
  $("cameraInput").click();
});

$("galleryBtn").addEventListener("click", () => {
  $("galleryInput").value = "";
  $("galleryInput").click();
});

$("cameraInput").addEventListener("change", handleImageSelection);
$("galleryInput").addEventListener("change", handleImageSelection);

async function handleImageSelection(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const s = currentStrings();
  $("status").hidden = false;
  $("status").textContent = s.loading;

  try {
    imageData = await resizeImage(file);
    $("preview").src = imageData;
    $("preview").hidden = false;
    $("analyzeBtn").disabled = false;
    $("result").hidden = true;
    $("status").hidden = true;
  } catch (error) {
    console.error(error);
    imageData = "";
    $("preview").hidden = true;
    $("analyzeBtn").disabled = true;
    $("status").textContent = s.fileError;
  }
}

$("analyzeBtn").addEventListener("click", async () => {
  const s = currentStrings();
  $("status").hidden = false;
  $("status").textContent = s.loading;
  $("analyzeBtn").disabled = true;
  $("result").hidden = true;

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageData, language: $("language").value })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Request failed");

    render(data);
    $("status").hidden = true;
  } catch (error) {
    console.error(error);
    $("status").textContent = s.error;
  } finally {
    $("analyzeBtn").disabled = false;
  }
});

$("againBtn").addEventListener("click", () => $("galleryBtn").click());

function render(data) {
  $("title").textContent = data.title;
  $("observation").textContent = data.observation;
  $("science").textContent = data.science;
  $("reflection").textContent = data.reflection;
  $("question").textContent = data.question;

  if (data.quran_reference || data.quran_text) {
    $("quranText").textContent = data.quran_text || "";
    $("quranReference").textContent = data.quran_reference || "";
    $("quranCard").hidden = false;
  } else {
    $("quranCard").hidden = true;
  }

  $("result").hidden = false;
  $("result").scrollIntoView({ behavior: "smooth", block: "start" });
}

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Unsupported file type"));
      return;
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const max = 1400;
        let width = img.width;
        let height = img.height;

        if (Math.max(width, height) > max) {
          const scale = max / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

applyLanguage();
