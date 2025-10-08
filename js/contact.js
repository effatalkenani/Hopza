(function(){
  window.updateContactLang = function(){
    const isEN = document.body.dir === 'ltr'; // ← هذا هو التعديل الجديد

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
	// تحديث العناصر التي تحمل class="label"
document.querySelectorAll('.label').forEach(el => {
  const en = el.dataset.en;
  const ar = el.dataset.ar;
  if (en && ar) {
    el.textContent = isEN ? en : ar;
  }
});

    if(replyHint) replyHint.textContent = isEN ? 'We reply within 1-2 business days.' : 'نرد عادة خلال ١-٢ يوم عمل.';

    // اتجاه الصفحة
    document.body.dir = isEN ? 'ltr' : 'rtl';

    const container = document.querySelector('.contact-container');
    if(container) container.style.flexDirection = isEN ? 'row' : 'row-reverse';

    const phoneGroup = document.querySelector('.phone-group');
    if(phoneGroup) phoneGroup.style.flexDirection = isEN ? 'row' : 'row-reverse';

   
  };

  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      form.querySelectorAll('input, textarea').forEach(el => el.value = '');
      const isEN = document.body.dir === 'ltr';
      alert(isEN ? 'Your message has been sent!' : 'تم إرسال رسالتك بنجاح!');
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
