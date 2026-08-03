# Hikmet v1

## Kurulum
ZIP içindeki tüm dosyaları GitHub repository köküne yükleyin. `api` klasörünü koruyun.

Vercel Environment Variables:
- `GEMINI_API_KEY` — zorunlu

Vercel otomatik deploy eder.

## Modüller
- Fotoğraftan tefekkür
- Üç dilde öğrenme kütüphanesi
- Dinî soru-cevap sohbeti
- İslam'ı keşfet / engeller sohbeti
- Konuma göre yaklaşık namaz vakitleri
- Karanlık mod ve PWA

## Kaynak notu
Quran.com'un güncel Content API'si uygulama kimlik bilgileri ister. Sunnah.com API'si de ayrı API anahtarı ister.
Bu ilk sürüm, yalnızca `GEMINI_API_KEY` ile hemen çalışabilmesi için seçilmiş ayet ve sahih hadisleri kaynak bağlantılarıyla yerel olarak sunar.
İleriki sürümde Quran Foundation ve Sunnah.com anahtarları alındığında canlı arama eklenebilir.

Namaz vakitleri AlAdhan üzerinden yaklaşık olarak gelir; yerel cami takvimi esas alınmalıdır.
