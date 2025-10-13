(function(){
  window.updateContactLang = function(){
    const isEN = document.body.dir === 'ltr';

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

    const T = isEN ? EN : AR;

    const title = document.getElementById('contactTitle'); if(title) title.textContent = T.title;
    const intro = document.getElementById('contactIntro'); if(intro) intro.textContent = T.intro;
    const formTitle = document.getElementById('formTitle'); if(formTitle) formTitle.textContent = isEN ? 'Send Message' : 'إرسال رسالة';
    const send = document.getElementById('sendBtn'); if(send) send.textContent = T.send;

    const name = document.getElementById('name'); if(name) name.placeholder = T.name;
    const phone = document.getElementById('phone'); if(phone) phone.placeholder = T.phone;
    const addr = document.getElementById('address'); if(addr) addr.placeholder = T.addr;
    const email = document.getElementById('email'); if(email) email.placeholder = T.email;
    const msg = document.getElementById('message'); if(msg) msg.placeholder = T.msg;

    const replyHint = document.getElementById('replyHint');
    document.querySelectorAll('.label').forEach(el => {
      const en = el.dataset.en;
      const ar = el.dataset.ar;
      if (en && ar) el.textContent = isEN ? en : ar;
    });

    if(replyHint) replyHint.textContent = isEN ? 'We reply within 1-2 business days.' : 'نرد عادة خلال ١-٢ يوم عمل.';

    document.body.dir = isEN ? 'ltr' : 'rtl';

    const container = document.querySelector('.contact-container');
    if(container) container.style.flexDirection = isEN ? 'row' : 'row-reverse';

    const phoneGroup = document.querySelector('.phone-group');
    if(phoneGroup) phoneGroup.style.flexDirection = isEN ? 'row' : 'row-reverse';
  };

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // clear previous errors
      form.querySelectorAll('.field-error').forEach(el => el.remove());
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

      const isEN = document.body.dir === 'ltr';

      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      const email = document.getElementById('email');
      const address = document.getElementById('address');
      const message = document.getElementById('message');

      const phonePattern = /^[0-9\u0660-\u0669]{10}$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let valid = true;

      function showError(input, msg) {
        input.classList.add('error');
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = msg;
        input.insertAdjacentElement('afterend', error);
        valid = false;
      }

      if (!name.value.trim()) showError(name, isEN ? "Please enter your full name." : "الرجاء إدخال الاسم الكامل.");
      if (!phone.value.trim()) {
        showError(phone, isEN ? "Please enter your phone number." : "الرجاء إدخال رقم الجوال.");
      } else if (!phonePattern.test(phone.value.trim())) {
        showError(phone, isEN ? "Phone number must be 10 digits." : "رقم الجوال يجب أن يتكون من 10 أرقام.");
      }

      if (!address.value.trim()) showError(address, isEN ? "Please enter your address." : "الرجاء إدخال العنوان.");

      if (!email.value.trim()) {
        showError(email, isEN ? "Please enter your email." : "الرجاء إدخال بريد إلكتروني.");
      } else if (!emailPattern.test(email.value.trim())) {
        showError(email, isEN ? "Invalid email format." : "صيغة البريد الإلكتروني غير صحيحة.");
      }

      if (!message.value.trim()) showError(message, isEN ? "Please write a message." : "الرجاء كتابة الرسالة.");

      if (valid) {
        alert(isEN ? "Your message has been sent!" : "تم إرسال رسالتك بنجاح!");
        form.reset();
      }
    });
  }

  const root = document.querySelector('.contact-container');
  if(root){
    root.style.transform = 'none';
    root.style.zoom = 'normal';
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.updateContactLang === 'function') window.updateContactLang();
  });

  window.addEventListener('lang:changed', () => {
    if (typeof window.updateContactLang === 'function') window.updateContactLang();
  });
})();
