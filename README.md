# Fusion Starter - Modern Web Uygulaması ve Yönetim Paneli

Bu proje, modern bir React ön yüzü, Express arka ucu ve kapsamlı bir Yönetim Paneli içeren tam donanımlı bir web uygulamasıdır.

## 🚀 Özellikler

*   **Modern Arayüz:** Slate/Mavi renk paleti, yapışkan (sticky) header ve bulanık arka plan efektleri.
*   **Yönetim Paneli (`/admin`):**
    *   Dashboard (Özet İstatistikler)
    *   İçerik Yönetimi (Blog, Projeler, Etkinlikler)
    *   Kullanıcı ve Mesaj Yönetimi
    *   Güvenli Giriş Sistemi
*   **Teknoloji Yığını:** React, TypeScript, Vite, Tailwind CSS, Express, Radix UI.

## 🛠️ Kurulum (Installation)

Projeyi çalıştırmadan önce Node.js'in yüklü olduğundan emin olun.

**ÖNEMLİ:** Tüm komutları projenin **ana dizininde** (root folder) çalıştırdığınızdan emin olun. `package.json` dosyasının olduğu yerde olmalısınız.

```bash
# Bağımlılıkları yükle
npm install
```

### ⚠️ "ENOENT: package.json" Hatası Alıyorsanız
Bu hata, komut satırının (terminal) yanlış klasörde açık olduğunu gösterir.
1. Terminalde `ls` (Mac/Linux) veya `dir` (Windows) yazın.
2. Listede `package.json` dosyasını görmüyorsanız yanlış yerdesiniz.
3. `cd proje-klasor-adi` yazarak doğru klasöre girin.

## 💻 Geliştirme Modu (Development)

Hem ön yüzü (client) hem de arka ucu (server) aynı anda çalıştırmak için:

```bash
npm run dev
```
Tarayıcıda `http://localhost:8080` (veya terminalde belirtilen port) adresine gidin.

## 🏗️ Derleme (Build)

Projeyi canlı ortam (production) için derlemek isterseniz:

```bash
npm run build
```
Bu komut `dist/` klasörü altında hem `spa` (istemci) hem de `server` (sunucu) dosyalarını oluşturur.

## 📂 Proje Yapısı

*   `client/` - Ön yüz (React) kodları
    *   `pages/admin/` - Yönetim paneli sayfaları
    *   `components/` - UI bileşenleri
    *   `App.tsx` - Ana uygulama ve yönlendirmeler
*   `server/` - Arka uç (Express) kodları
    *   `routes/admin2.ts` - Yönetim paneli API rotaları
*   `vite.config.ts` - Vite yapılandırması

## 🔑 Yönetim Paneli Erişimi

Tarayıcınızda `/admin` rotasına giderek panele erişebilirsiniz.
Varsayılan demo girişi için kodları inceleyebilirsiniz (`server/routes/admin2.ts`).
