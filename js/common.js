const store = {
  get lang() { return localStorage.getItem('lang') || 'en'; },
  set lang(v) { localStorage.setItem('lang', v); },
  get theme() { return localStorage.getItem('theme') || 'orange'; },
  set theme(v) { localStorage.setItem('theme', v); },
  get a11y() { return localStorage.getItem('a11y') === '1'; },
  set a11y(v) { localStorage.setItem('a11y', v ? '1' : '0'); }
};

let isEN = (store.lang === 'en');

const langBtn  = document.getElementById('langBtn');
const themeBtn = document.getElementById('themeBtn');
const a11yBtn  = document.getElementById('a11yBtn');

if (a11yBtn) {
  a11yBtn.addEventListener('click', () => {
    const on = !document.body.classList.contains('a11y-mode');
    store.a11y = on;
    document.body.classList.toggle('a11y-mode', on);
    a11yBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

(function applyPersistedSettings(){
  document.body.classList.remove('theme-orange','theme-blue');
  document.body.classList.add(store.theme === 'blue' ? 'theme-blue' : 'theme-orange');

  if (themeBtn) {
    themeBtn.style.backgroundColor = store.theme === 'blue' ? '#FFC107' : '#00BCD4';
  }

  if (store.a11y) document.body.classList.add('a11y-mode');

  document.body.dir = isEN ? 'ltr' : 'rtl';

  translateHeader();

  if (langBtn) {
    langBtn.textContent = isEN ? 'AR' : 'EN';
  }
})();

if (langBtn) {
  langBtn.addEventListener('click', () => {
    isEN = !isEN;
    store.lang = isEN ? 'en' : 'ar';
    document.body.dir = isEN ? 'ltr' : 'rtl';
    langBtn.textContent = isEN ? 'AR' : 'EN';
    translateHeader();

    if (typeof updatePopupLanguage === 'function') updatePopupLanguage();
    if (typeof updateContactLang === 'function') updateContactLang();
  });
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('theme-orange') ? 'blue' : 'orange';
    store.theme = newTheme;
    document.body.classList.toggle('theme-blue');
    document.body.classList.toggle('theme-orange');
    themeBtn.style.backgroundColor = newTheme === 'blue' ? '#FFC107' : '#00BCD4';
  });
}

function translateHeader(){
  const navTexts = document.querySelectorAll('.nav-text');
  navTexts.forEach(el => {
    el.textContent = isEN ? (el.dataset.en || el.textContent) : (el.dataset.ar || el.textContent);
  });

  const logoTitle = document.getElementById('logoTitle') || document.getElementById('brand');
  const logoTag   = document.getElementById('logoTagline') || document.getElementById('tagline');
  if (logoTitle) logoTitle.textContent = isEN ? 'SUPER SLICE' : 'سوبر سلايس';
  if (logoTag)   logoTag.textContent   = isEN ? 'One Slice, Endless Flavor' : 'شريحة واحدة، نكهة لا تنتهي';

  const footer = document.getElementById('footerText') || document.getElementById('foot');
  const searchBox = document.getElementById('searchBox');
if (searchBox) {
  searchBox.placeholder = isEN ? 'Search...' : 'بحث...';
}

  if (footer) {
    footer.innerHTML = isEN
      ? '© 2025 Super Slice. All rights reserved. · <span aria-label="Accessibility Statement">♿ This website is accessibility-friendly</span>'
      : '© ٢٠٢٥ سوبر سلايس. جميع الحقوق محفوظة. · <span aria-label="إشعار الوصول">♿ هذا الموقع يدعم الوصول لذوي الإعاقة</span>';
  }
  
  // ✅ تحديث رسالة الترحيب وزر "اطلب الآن"
const welcome = document.getElementById('welcomeMsg');
const orderBtn = document.getElementById('orderNowBtn');
if (welcome && orderBtn) {
  welcome.innerHTML = isEN ? welcome.dataset.en : welcome.dataset.ar;
  orderBtn.textContent = isEN ? orderBtn.dataset.en : orderBtn.dataset.ar;
}

}

// Slider
const slides = document.getElementById('slides');
const dots   = document.getElementById('dots');
if (slides && dots) {
  const total = slides.children.length;
  let index = 0;

  for (let i = 0; i < total; i++) {
    const b = document.createElement('button');
    b.setAttribute('role','tab');
    if (i===0) b.classList.add('active');
    b.addEventListener('click', () => { index = i; update(); });
    dots.appendChild(b);
  }

  function update(){
  slides.style.marginLeft = `-${index * 100}%`; // دايمًا يسار
  [...dots.children].forEach((d,di)=>d.classList.toggle('active', di===index));
}


  setInterval(()=>{ index = (index+1) % total; update(); }, 4000);
}
