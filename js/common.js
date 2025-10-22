/* 
========================================
🌐 Hopza — Common JavaScript (common.js)
Purpose: Shared logic for all pages, including:
- Persistent settings (language, theme, accessibility)
- Dynamic translation (header, footer, splash, etc.)
- Theme toggling (orange/blue)
- Navigation activation and slider
- Search suggestions with redirect
- Login/Register modal with form validation

Accessibility: Supports ARIA attributes and direction switching (LTR/RTL)
Note: Original code intact. Comments added for academic explanation.
========================================
*/

// ---------- Persistent Storage Management ----------
const store = {
  // Save and get language setting
  get lang() { return localStorage.getItem('lang') || 'en'; },
  set lang(v) { localStorage.setItem('lang', v); },
  // Save and get selected theme (orange/blue)
  get theme() { return localStorage.getItem('theme') || 'orange'; },
  set theme(v) { localStorage.setItem('theme', v); },
  // Save and get accessibility mode (boolean)
  get a11y() { return localStorage.getItem('a11y') === '1'; },
  set a11y(v) { localStorage.setItem('a11y', v ? '1' : '0'); }
};

// Detect current language (English by default)
let isEN = (store.lang === 'en');

// ---------- Main UI Buttons ----------
const langBtn  = document.getElementById('langBtn');
const themeBtn = document.getElementById('themeBtn');
const a11yBtn  = document.getElementById('a11yBtn');

// ---------- Accessibility Toggle ----------
if (a11yBtn) {
  a11yBtn.addEventListener('click', () => {
    const on = !document.body.classList.contains('a11y-mode');
    store.a11y = on;
    document.body.classList.toggle('a11y-mode', on);
    a11yBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

// ---------- Apply Saved Settings on Load ----------
(function applyPersistedSettings(){
  // Reset theme classes and apply saved theme
  document.body.classList.remove('theme-orange','theme-blue');
  document.body.classList.add(store.theme === 'blue' ? 'theme-blue' : 'theme-orange');

  // Update theme button color
  if (themeBtn) {
    themeBtn.style.backgroundColor = store.theme === 'blue' ? '#FFC107' : '#00BCD4';
  }

  // Enable accessibility if previously set
  if (store.a11y) document.body.classList.add('a11y-mode');

  // Set text direction (LTR/RTL)
  document.body.dir = isEN ? 'ltr' : 'rtl';

  // Translate visible elements (header, footer, etc.)
  translateHeader();

  // Set language button text
  if (langBtn) {
    langBtn.textContent = isEN ? 'AR' : 'EN';
  }

  // Update modal language if available
  if (typeof updatePopupLanguage === 'function') updatePopupLanguage(); 
})();

// ---------- Language Switch ----------
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

// ---------- Theme Switch ----------
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('theme-orange') ? 'blue' : 'orange';
    store.theme = newTheme;
    document.body.classList.toggle('theme-blue');
    document.body.classList.toggle('theme-orange');
    themeBtn.style.backgroundColor = newTheme === 'blue' ? '#FFC107' : '#00BCD4';
  });
}

// ---------- Translation Function ----------
function translateHeader(){
  // Translate navigation text
  const navTexts = document.querySelectorAll('.nav-text');
  navTexts.forEach(el => {
    el.textContent = isEN ? (el.dataset.en || el.textContent) : (el.dataset.ar || el.textContent);
  });

  // Translate logo text and tagline
  const logoTitle = document.getElementById('logoTitle') || document.getElementById('brand');
  const logoTag   = document.getElementById('logoTagline') || document.getElementById('tagline');
  if (logoTitle) logoTitle.textContent = isEN ? 'Hopza' : 'هوبزا';
  if (logoTag)   logoTag.textContent   = isEN ? 'Too Fast to Last.' : 'سريعة ما تلحقها';

  // Translate footer and search placeholder
  const footer = document.getElementById('footerText') || document.getElementById('foot');
  const searchBox = document.getElementById('searchBox');
  if (searchBox) searchBox.placeholder = isEN ? 'Search...' : 'بحث...';

  if (footer) {
    footer.innerHTML = isEN
      ? '© 2025 Hopza. All rights reserved. · <span aria-label="Accessibility Statement">♿ This website is accessibility-friendly</span>'
      : '© ٢٠٢٥ سوبر سلايس. جميع الحقوق محفوظة. · <span aria-label="إشعار الوصول">♿ هذا الموقع يدعم الوصول لذوي الإعاقة</span>';
  }

  // Update homepage welcome message and button text
  const welcome = document.getElementById('welcomeMsg');
  const orderBtn = document.getElementById('orderNowBtn');
  if (welcome && orderBtn) {
    welcome.innerHTML = isEN ? welcome.dataset.en : welcome.dataset.ar;
    orderBtn.textContent = isEN ? orderBtn.dataset.en : orderBtn.dataset.ar;
  }
}

// ---------- Slider Logic ----------
const slides = document.getElementById('slides');
const dots   = document.getElementById('dots');
if (slides && dots) {
  const total = slides.children.length;
  let index = 0;

  // Generate navigation dots dynamically
  for (let i = 0; i < total; i++) {
    const b = document.createElement('button');
    b.setAttribute('role','tab');
    if (i===0) b.classList.add('active');
    b.addEventListener('click', () => { index = i; update(); });
    dots.appendChild(b);
  }

  // Function to switch slide
  function update(){
    slides.style.marginLeft = `-${index * 100}%`;
    [...dots.children].forEach((d,di)=>d.classList.toggle('active', di===index));
  }

  // Auto slide every 4 seconds
  setInterval(()=>{ index = (index+1) % total; update(); }, 4000);
}

// ---------- Active Navigation Highlight ----------
const links = document.querySelectorAll('#topNav a');
const currentPage = window.location.pathname.split("/").pop();
links.forEach(link => {
  const href = link.getAttribute('href');
  link.classList.toggle('active', href === currentPage);
});

// ---------- Search Suggestion Logic ----------
window.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchBox');
  const suggestions = document.getElementById('suggestions');
  if (!searchBox || !suggestions) return;

  // Search keywords (EN + AR)
  const keywords = [
    "Margherita","مارغريتا","Pepperoni","ببروني","Hawaiian","هاواي",
    "Cheese Lovers Pizza","بيتزا عشاق الجبن","BBQ Chicken","دجاج باربكيو",
    "Veggie","خضار","Sweet Corn Pizza","بيتزا الذرة الحلوة","Mushroom Delight","بيتزا الفطر",
    "Mexican","مكسيكية","Cheddar Melt Pizza","بيتزا شيدر",
    "Alfredo","ألفريدو","Arrabbiata","أرابياتا","Rose Pasta with Chicken","باستا الورد بالدجاج",
    "Bolognese","بولونيز","Farfalle Pasta","فارفيلي","Pink Sauce Pasta","باستا الصوص الوردي",
    "Water","ماء","Apple Juice","عصير تفاح","Cola","كولا","Cappuccino","كابتشينو"
  ];

  // Show suggestions dynamically
  searchBox.addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    suggestions.innerHTML = '';
    if (!q) return suggestions.hidden = true;

    const matched = keywords.filter(k => k.toLowerCase().includes(q)).slice(0, 5);

    matched.forEach(m => {
      const li = document.createElement('li');
      li.textContent = m;
      li.onclick = () => {
        searchBox.value = '';
        suggestions.hidden = true;
        // Redirect to order page with search term
        window.location.href = `order.html?q=${encodeURIComponent(m)}`;
      };
      suggestions.appendChild(li);
    });

    suggestions.hidden = matched.length === 0;
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!suggestions.contains(e.target) && e.target !== searchBox) {
      suggestions.hidden = true;
    }
  });
});

// ---------- Redirect + Search Highlight ----------
window.addEventListener('DOMContentLoaded', () => {
  if (typeof updatePopupLanguage === 'function') updatePopupLanguage();

  // Render menu (defined in order.js)
  renderMenu();

  // Highlight search term if passed from query
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    const searchBox = document.getElementById('searchBox');
    if (searchBox) searchBox.value = q;

    const item = [...document.querySelectorAll('.item .title')]
                  .find(el => el.textContent.includes(q));
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      item.style.border = '2px solid var(--accent-color)';
      setTimeout(() => item.style.border = '', 2000);
    }
  }
});

// ---------- Login / Register Modal Logic ----------
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('authModal');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const closeBtn = modal.querySelector('.close-btn');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');

  // Open login modal
  loginBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  });

  // Open register modal
  registerBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    clearAuthErrors();
    clearAuthInputs();
  });

  // Toggle between forms
  showRegister.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    clearAuthErrors();
    clearAuthInputs();
  });
  showLogin.addEventListener('click', () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    clearAuthErrors();
    clearAuthInputs();
  });

  // ---------- Login Validation ----------
  document.getElementById('loginSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    clearAuthErrors();
    let valid = true;
    const username = document.getElementById('loginUsername');
    const password = document.getElementById('loginPassword');

    if (!username.value.trim()) {
      showError(username, isEN ? "Please enter username/email." : "الرجاء إدخال اسم المستخدم أو البريد.");
      valid = false;
    }
    if (!password.value.trim()) {
      showError(password, isEN ? "Please enter password." : "الرجاء إدخال كلمة المرور.");
      valid = false;
    }

    if (valid) {
      alert(isEN ? "Logged in!" : "تم تسجيل الدخول!");
      modal.classList.add('hidden');
      clearAuthInputs();
    }
  });

  // ---------- Register Validation ----------
  document.getElementById('registerSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    clearAuthErrors();
    let valid = true;

    const username = document.getElementById('regUsername');
    const email = document.getElementById('regEmail');
    const password = document.getElementById('regPassword');
    const conf = document.getElementById('regConfirmPassword');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Username
    if (!username.value.trim()) {
      showError(username, isEN ? "Please enter username." : "الرجاء إدخال اسم المستخدم.");
      valid = false;
    }

    // Email
    if (!email.value.trim()) {
      showError(email, isEN ? "Please enter email." : "الرجاء إدخال البريد الإلكتروني.");
      valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      showError(email, isEN ? "Please enter a valid email." : "الرجاء إدخال بريد إلكتروني صحيح.");
      valid = false;
    }

    // Password
    if (!password.value.trim()) {
      showError(password, isEN ? "Please enter password." : "الرجاء إدخال كلمة المرور.");
      valid = false;
    }

    // Confirm Password
    if (!conf.value.trim()) {
      showError(conf, isEN ? "Please confirm password." : "الرجاء تأكيد كلمة المرور.");
      valid = false;
    } else if (password.value.trim() && password.value !== conf.value) {
      showError(conf, isEN ? "Passwords do not match." : "كلمتا المرور غير متطابقتين.");
      valid = false;
    }

    if (valid) {
      alert(isEN ? "Account created!" : "تم إنشاء الحساب!");
      modal.classList.add('hidden');
      clearAuthInputs();
    }
  });

  // ---------- Helper Functions ----------
  function showError(inputEl, msg) {
    inputEl.classList.add('error');
    const errEl = document.getElementById(inputEl.id + "Err");
    if (errEl) errEl.textContent = msg;
  }

  function clearAuthErrors() {
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  }

  function clearAuthInputs() {
    modal.querySelectorAll('input').forEach(i => i.value = '');
  }
});

// ---------- Update Popup Language ----------
function updatePopupLanguage() {
  const loginTitle = document.getElementById('loginTitle');
  const registerTitle = document.getElementById('registerTitle');
  const showLogin = document.getElementById('showLogin');
  const showRegister = document.getElementById('showRegister');

  if (loginTitle) loginTitle.textContent = isEN ? 'Login' : 'تسجيل الدخول';
  if (registerTitle) registerTitle.textContent = isEN ? 'Register' : 'إنشاء حساب';
  if (showLogin) showLogin.textContent = isEN ? 'Already have account? Login' : 'عندك حساب؟ تسجيل الدخول';
  if (showRegister) showRegister.textContent = isEN ? "Don't have account? Register" : 'ما عندك حساب؟ سجل الآن';

  const loginBtn = document.getElementById('loginSubmit');
  const registerBtn = document.getElementById('registerSubmit');
  if (loginBtn) loginBtn.textContent = isEN ? 'Login' : 'تسجيل الدخول';
  if (registerBtn) registerBtn.textContent = isEN ? 'Register' : 'إنشاء حساب';

  // Update placeholders dynamically
  const placeholders = {
    loginUsername: isEN ? 'Username or Email' : 'اسم المستخدم أو البريد الإلكتروني',
    loginPassword: isEN ? 'Password' : 'كلمة المرور',
    regUsername: isEN ? 'Username' : 'اسم المستخدم',
    regEmail: isEN ? 'Email' : 'البريد الإلكتروني',
    regPassword: isEN ? 'Password' : 'كلمة المرور',
    regConfirmPassword: isEN ? 'Confirm Password' : 'تأكيد كلمة المرور'
  };

  Object.entries(placeholders).forEach(([id, text]) => {
    const input = document.getElementById(id);
    if (input) input.placeholder = text;
  });
}
