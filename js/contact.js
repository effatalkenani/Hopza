/* 
========================================
📞 Hopza — Contact Page Script (contact.js)
Purpose:
Handles multilingual translation (English/Arabic) and form validation
for the Contact Us page, ensuring accessibility and correct input handling.

Includes:
- Dynamic language switching via updateContactLang()
- Bidirectional layout flipping (LTR/RTL)
- Field validation (name, phone, email, address, message)
- User feedback through alert and inline error messages

Accessibility: Ensures logical tab order, readable placeholders,
and visual direction adjustment based on selected language.

Note: Original code preserved; comments added for documentation.
========================================
*/

(function(){

  // ---------- Dynamic Language Function ----------
  window.updateContactLang = function(){
    const isEN = document.body.dir === 'ltr'; // detect current page direction

    // English and Arabic dictionaries for translation
    const EN = {
      title: 'Contact Us',
      intro: 'We’d love to hear from you. Reach us anytime!',
      send: 'Send',
      name: 'Full Name',
      phone: 'Phone Number',
      addr: 'Address',
      email: 'Email',
      msg: 'Type your message...'
    };
    const AR = {
      title: 'اتصل بنا',
      intro: 'يسعدنا تواصلك معنا في أي وقت!',
      send: 'إرسال',
      name: 'الاسم الكامل',
      phone: 'رقم الجوال',
      addr: 'العنوان',
      email: 'البريد الإلكتروني',
      msg: 'اكتب رسالتك...'
    };

    const T = isEN ? EN : AR; // choose translation set

    // Apply text content and placeholders
    const title = document.getElementById('contactTitle'); if(title) title.textContent = T.title;
    const intro = document.getElementById('contactIntro'); if(intro) intro.textContent = T.intro;
    const formTitle = document.getElementById('formTitle'); if(formTitle) formTitle.textContent = isEN ? 'Send Message' : 'إرسال رسالة';
    const send = document.getElementById('sendBtn'); if(send) send.textContent = T.send;

    // Update placeholders for all form fields
    const name = document.getElementById('name'); if(name) name.placeholder = T.name;
    const phone = document.getElementById('phone'); if(phone) phone.placeholder = T.phone;
    const addr = document.getElementById('address'); if(addr) addr.placeholder = T.addr;
    const email = document.getElementById('email'); if(email) email.placeholder = T.email;
    const msg = document.getElementById('message'); if(msg) msg.placeholder = T.msg;

    // Update reply note text
    const replyHint = document.getElementById('replyHint');
    document.querySelectorAll('.label').forEach(el => {
      const en = el.dataset.en;
      const ar = el.dataset.ar;
      if (en && ar) el.textContent = isEN ? en : ar;
    });
    if(replyHint) replyHint.textContent = isEN ? 'We reply within 1-2 business days.' : 'نرد عادة خلال ١-٢ يوم عمل.';

    // Adjust text direction
    document.body.dir = isEN ? 'ltr' : 'rtl';

    // Flip container and phone input alignment for RTL layout
    const container = document.querySelector('.contact-container');
    if(container) container.style.flexDirection = isEN ? 'row' : 'row-reverse';

    const phoneGroup = document.querySelector('.phone-group');
    if(phoneGroup) phoneGroup.style.flexDirection = isEN ? 'row' : 'row-reverse';
  };

  // ---------- Form Validation ----------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // prevent page reload

      // Clear previous validation errors
      form.querySelectorAll('.field-error').forEach(el => el.remove());
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

      const isEN = document.body.dir === 'ltr'; // current language
      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      const email = document.getElementById('email');
      const address = document.getElementById('address');
      const message = document.getElementById('message');

      // Validation patterns
      const phonePattern = /^[0-9\u0660-\u0669]+$/; // accepts Arabic or English digits
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let valid = true; // global validity tracker

      // Inline error generator
      function showError(input, msg) {
        input.classList.add('error');
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = msg;
        input.insertAdjacentElement('afterend', error);
        valid = false;
      }

      // Field-by-field validation with language-based messages
      if (!name.value.trim()) showError(name, isEN ? "Please enter your full name." : "الرجاء إدخال الاسم الكامل.");
      if (!phone.value.trim()) {
        showError(phone, isEN ? "Please enter your phone number." : "الرجاء إدخال رقم الجوال.");
     } else if (!phonePattern.test(phone.value.trim())) {
  showError(phone, isEN ? "Please enter digits only." : "الرجاء إدخال أرقام فقط.");
}

      if (!address.value.trim()) showError(address, isEN ? "Please enter your address." : "الرجاء إدخال العنوان.");
      if (!email.value.trim()) {
        showError(email, isEN ? "Please enter your email." : "الرجاء إدخال بريد إلكتروني.");
      } else if (!emailPattern.test(email.value.trim())) {
        showError(email, isEN ? "Invalid email format." : "صيغة البريد الإلكتروني غير صحيحة.");
      }
      if (!message.value.trim()) showError(message, isEN ? "Please write a message." : "الرجاء كتابة الرسالة.");

      // Success feedback
      if (valid) {
        alert(isEN ? "Your message has been sent!" : "تم إرسال رسالتك بنجاح!");
        form.reset();
      }
    });
  }

  // ---------- Layout Reset ----------
  const root = document.querySelector('.contact-container');
  if(root){
    root.style.transform = 'none';
    root.style.zoom = 'normal';
  }

  // ---------- Event Listeners ----------
  // Reapply translation on load
  window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.updateContactLang === 'function') window.updateContactLang();
  });

  // Reapply translation if language toggled globally
  window.addEventListener('lang:changed', () => {
    if (typeof window.updateContactLang === 'function') window.updateContactLang();
  });

})();
