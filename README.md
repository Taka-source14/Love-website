# Love - Küçük Etkileşimli Açılış

Bu proje küçük bir interaktif açılış sayfası ve sunucu tarafı (Express) içerir. Kullanıcının Instagram adresi girildiğinde sunucu Telegram Bot API üzerinden bildirim gönderir.

Özet:
- Frontend: `src/index.html`, `src/styles.css`, `src/app.js`
- Backend: `server.js` — POST /submit endpoint'i Telegram'a mesaj gönderir

Gereksinimler:
- Node.js (14+ önerilir)
- Bir Telegram bot token (BotFather ile oluşturun)
- Telegram alıcı chat_id (kendi chat id'niz)

Kurulum (PowerShell):
```powershell
cd "c:\Users\Emre\Desktop\Projeler\Love"
npm install
```

Çalıştırma (örnek):
```powershell
$env:BOT_TOKEN = "<bot-token>"
$env:CHAT_ID = "<your-chat-id>"
npm start
```

NOT: `BOT_TOKEN` ve `CHAT_ID` güvenlidir; public repoya koymayın.

Telegram chat_id öğrenme yolları:
- Bot ile mesajlaştıktan sonra `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates` çağrısı yaparak en son mesajlardan chat_id'yi görebilirsiniz.

Geliştirme notları:
- İstersen TypeScript kullanarak frontend/backendi yeniden yazabilirim. Ayrıca form doğrulamayı ve rate-limit/anti-spam kontrollerini sunucuya eklemeyi öneririm.
