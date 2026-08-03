# Düşünmez misiniz?

Telefon ve masaüstü tarayıcılarında çalışan, fotoğrafı OpenAI görsel modeliyle analiz edip bilimsel açıklama ve İslami tefekkür üreten web uygulaması.

## En hızlı yayınlama: Vercel

1. Bu klasörü GitHub repository'sine yükleyin.
2. Vercel'de **Add New → Project** deyip repository'yi içe aktarın.
3. **Settings → Environment Variables** bölümüne şunu ekleyin:
   - Name: `OPENAI_API_KEY`
   - Value: OpenAI API anahtarınız
   - Environments: Production, Preview, Development
4. **Deploy** düğmesine basın.
5. Vercel size herkese açık bir HTTPS adresi verir.

## Önemli

API anahtarını `app.js`, HTML, GitHub repository veya başka istemci dosyasına yazmayın. Anahtar yalnızca Vercel environment variable olarak saklanmalıdır.

## Yerel geliştirme

```bash
npm install
npx vercel dev
```

Yerelde `.env.local` dosyasına şunu ekleyin:

```env
OPENAI_API_KEY=sk-...
```
