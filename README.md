# Love | Mini Anket Web Uygulaması

Bu proje, kullanıcıya kısa ve etkileşimli bir anket deneyimi sunan, modern ve romantik temalı bir web uygulamasıdır. Amaç, kullanıcıdan belirli bilgiler toplayıp, bu bilgileri güvenli şekilde backend'e ve Telegram'a iletmektir.

## Özellikler

- **Responsive ve Modern Tasarım:** Mobil ve masaüstü uyumlu, sade ve romantik bir arayüz.
- **Soru Akışı:** Kullanıcıya adım adım iki soru sorulur. Cevaplara göre form ekranına yönlendirilir.
- **Form Doğrulama:** Instagram kullanıcı adı zorunlu, telefon ve mesaj alanları isteğe bağlıdır. Hatalı girişlerde uyarı gösterilir.
- **Animasyonlar:** Kart geçişleri ve butonlarda yumuşak animasyonlar.
- **Toast Bildirimleri:** Başarılı veya hatalı işlemlerde ekranda kısa süreli bilgilendirme.
- **Erişilebilirlik:** Klavye ile erişim, for/id bağlantıları, aria-live toast desteği.
- **Backend Entegrasyonu:** Express.js ile güvenli backend, form verilerini hem Telegram botuna hem de terminale iletir.
- **Güvenlik:** Helmet, rate-limit, compression ve CORS ile temel güvenlik önlemleri.
- **Kullanıcı Sonrası Akış:** Form gönderildikten sonra ekranda romantik mesaj ve otomatik kapanış.

## Kullanım

1. Kullanıcıya ilk olarak "Sevgilin var mı?" sorusu sorulur. "EVET" derse site kapanır.
2. "HAYIR" derse ikinci soruya geçilir: "İlişki ister misin?"
3. Her iki cevaptan sonra kullanıcı form ekranına yönlendirilir.
4. Form gönderildiğinde bilgiler backend'e ve Telegram'a iletilir, ekranda romantik bir mesaj gösterilir ve site otomatik kapanır.

## Teknik Detaylar

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Telegram Entegrasyonu:** Bot API ile form verileri Telegram'a iletilir.
- **Ekstra:** Telefon alanı maskeleme, meta/OG/favikon, erişilebilirlik, animasyonlar, loglama.

## Kurulum

1. Proje klasöründe `npm install` komutunu çalıştırın.
2. `server.js` dosyasındaki Telegram bot token ve chat id bilgilerini doldurun.
3. `npm start` ile sunucuyu başlatın.
4. Tarayıcıda `http://localhost:3000` adresine gidin.

## Lisans

Bu proje, eğitim ve demo amaçlıdır. Herhangi bir kişisel bilgi veya özel veri içermez.
