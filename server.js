const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [process.env.PUBLIC_URL, 'http://localhost:3000'].filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : '*',
}));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(rateLimit({ windowMs: 60 * 1000, max: 15 }));
app.use(express.json());

const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.json');

function saveSubmissionLocal(entry){
  let arr = [];
  try{
    if(fs.existsSync(SUBMISSIONS_FILE)){
      const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      arr = JSON.parse(raw || '[]');
    }
  }catch(e){
    console.warn('Could not read submissions file, will recreate', e.message);
    arr = [];
  }

  arr.push(entry);
  try{
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(arr, null, 2), 'utf8');
  }catch(e){
    console.error('Failed to write submissions file', e.message);
  }
}

app.post('/submit', async (req, res) => {
  const { instagram, phone, userMessage } = req.body || {};
  if (!instagram) {
    console.warn('Eksik instagram:', req.body);
    return res.status(400).json({ ok: false, error: 'instagram required' });
  }
  const BOT_TOKEN = "7498365522:AAFbxNqqtQyvUdQmBWZaYQgaM8453OZ1EQM";
  const CHAT_ID = "5632934341";
  const entry = { instagram, phone: phone || '-', userMessage: userMessage || '', ts: new Date().toISOString() };
  // Terminale gelen verileri yaz
  console.log('Yeni form gönderimi:', entry);
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('No Telegram config, saved locally:', entry);
    saveSubmissionLocal(entry);
    return res.json({ ok: true, note: 'saved locally (telegram not configured)' });
  }
  const text = `Yeni Instagram gönderimi:%0Ainstagram: ${instagram}%0Aphone: ${phone || '-'}%0Amesaj: ${userMessage || '-'}`;
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const tgRes = await axios.post(url, {
      chat_id: CHAT_ID,
      text,
      parse_mode: 'HTML',
    }, { timeout: 10000 });
    saveSubmissionLocal({ ...entry, delivered: true });
    console.log('Telegram gönderildi:', instagram, '| Telegram yanıtı:', tgRes.data);
    return res.json({ ok: true });
  } catch (err) {
    saveSubmissionLocal({ ...entry, delivered: false, error: err?.message });
    console.error('Telegram gönderilemedi:', err?.response?.data || err.message);
    return res.status(500).json({ ok: false, error: 'Failed to send Telegram message' });
  }
});

app.use(express.static(path.join(__dirname, 'src')));

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
