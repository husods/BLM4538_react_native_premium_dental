# PREMIUM DENTAL – React Native Uygulaması

Bu proje, bir diş kliniği için geliştirilmiş bir mobil uygulamadır. Kullanıcılar randevu alabilir, geçmiş randevularını görebilir, kişisel bilgilerini düzenleyebilir ve klinik hakkında bilgi edinebilir. Uygulama Expo (React Native) ile geliştirilmiş ve Firebase altyapısı kullanılmıştır.

---

## 📥 APK İNDİRME

👉 **[Uygulamayı Android Cihazınıza İndirin (APK)](https://expo.dev/accounts/husomir/projects/premium-dental/builds/75dd1c44-c65e-4b35-b181-efe974f9cf6f)**

---

## 🚀 Özellikler

- E-posta ve şifre ile kullanıcı kaydı/girişi
- Takvim üzerinden randevu alma
- Yaklaşan ve geçmiş randevular listesi
- Profil bilgilerini güncelleme (ad, soyad, cinsiyet, yaş)
- Doktor ve iletişim bilgileri
- Firebase Firestore ile veri saklama
- Modern ve sade arayüz

---

## 📁 Proje Yapısı ve Açıklamaları

| Yol | Açıklama |
|-----|----------|
| `/app` | Tüm uygulama ekranları burada yer alır (login, register, home, menu vb.) |
| `/assets` | Uygulamada kullanılan görseller (logo vb.) |
| `/components` | Tekrar kullanılabilir bileşenler (örneğin butonlar, kartlar) |
| `/constants` | Renkler, stil sabitleri ve metin sabitleri burada tanımlanır |
| `/firebase` | Firebase bağlantı ve yapılandırma dosyaları (firebaseConfig.ts) |
| `/hooks` | Özel olarak tanımlanmış custom React hook’ları |
| `.gitignore` | Git’e eklenmemesi gereken dosya ve klasörlerin listesi |
| `app.json` | Expo uygulama yapılandırma dosyası (isim, ikon, splash vs.) |
| `index.ts` | Uygulamanın giriş noktası |
| `metro.config.js` | Metro bundler yapılandırması |
| `package.json` | Projede kullanılan bağımlılıklar ve scriptler |
| `tsconfig.json` | TypeScript yapılandırması |

---

## 🛠️ Kurulum

```bash
npm install
npx expo start
