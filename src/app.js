document.addEventListener('DOMContentLoaded', () => {
  // Frontend logic for interactions
  const q1Yes = document.getElementById('q1-yes');
  const q1No = document.getElementById('q1-no');
  const q2Yes = document.getElementById('q2-yes');
  const q2No = document.getElementById('q2-no');
  const view1 = document.getElementById('view-1');
  const view2 = document.getElementById('view-2');
  const slideRight = document.getElementById('slide-right');
  const slideLeft = document.getElementById('slide-left');
  const form = document.getElementById('contact-form');
  const phoneInput = document.getElementById('phone');

  function goToQ2() {
    view1.classList.add('hidden');
    view2.classList.remove('hidden');
  }

  q1Yes.addEventListener('click', () => {
    alert('Madem sevgilin var, o zaman bu sayfa kapanıyor.');
    // Sadece pencereyi kapat, about:blank yok
    setTimeout(() => {
      window.close();
      setTimeout(() => {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:1.3rem;text-align:center;">Sayfa kapatılamadı, lütfen sekmeyi kapatın.</div>';
      }, 800);
    }, 500); // 0.5 saniye bekletildi
  });

  q1No.addEventListener('click', () => {
    goToQ2();
  });

  q2Yes.addEventListener('click', () => {
    slideRight.classList.remove('hidden');
    setTimeout(() => slideRight.classList.add('show'), 20);
  });

  q2No.addEventListener('click', () => {
    slideLeft.classList.remove('hidden');
    setTimeout(() => slideLeft.classList.add('show'), 20);
    setTimeout(() => {
      slideRight.classList.remove('hidden');
      setTimeout(() => slideRight.classList.add('show'), 20);
    }, 700); // 2sn yerine 0.7sn
  });

  function showToast(msg, isError) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.background = isError ? '#c00' : '#222';
    toast.style.display = 'block';
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { toast.style.display = 'none'; }, 400);
    }, 2000);
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const instagram = document.getElementById('instagram').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const userMessage = document.getElementById('user-message') ? document.getElementById('user-message').value.trim() : '';
    if (!instagram) {
      showToast('Instagram kullanıcı adı zorunlu.', true);
      return;
    }
    // Mesajı hemen gösterme, bunun yerine submit başarılıysa ortada romantik mesaj gösterilecek
    try {
      const res = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instagram, phone, userMessage })
      });
      const data = await res.json();
      if (data.ok) {
        // Ekranın tam ortasında romantik mesajı göster
        document.body.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:center;height:100vh;width:100vw;background:var(--bg1);">
            <div style="background:rgba(255,255,255,0.92);padding:48px 32px;border-radius:24px;box-shadow:0 8px 32px rgba(0,0,0,0.10);text-align:center;max-width:90vw;">
              <h1 style="font-size:2.2rem;font-weight:700;margin-bottom:18px;color:#ff4d7e;letter-spacing:-0.02em;">Gönderildi!</h1>
              <div style="font-size:1.3rem;color:#222;">En Kısa Zamanda Görüşmek Üzere <span style='color:#ff4d7e;font-size:2rem;'>&#10084;&#65039;</span></div>
            </div>
          </div>
        `;
        // Sadece pencereyi kapat, about:blank yok
        setTimeout(() => {
          window.close();
          setTimeout(() => {
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:1.3rem;text-align:center;">Sayfa kapatılamadı, lütfen sekmeyi kapatın.</div>';
          }, 800);
        }, 3000); // 4 saniye bekletildi
      } else {
        showToast('Sunucu hatası: ' + (data.error || 'bilinmeyen hata'), true);
      }
    } catch (err) {
      showToast('Ağ hatası', true);
    }
  });

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = phoneInput.value.replace(/\D/g, '').slice(0, 11);
      let formatted = '';
      if (val.length > 0) formatted = val.slice(0, 4);
      if (val.length > 4) formatted += ' ' + val.slice(4, 7);
      if (val.length > 7) formatted += ' ' + val.slice(7, 9);
      if (val.length > 9) formatted += ' ' + val.slice(9, 11);
      phoneInput.value = formatted;
    });
  }
});
