// ====== ترجمة نصوص الواجهة (Labels) ======
const textTrans = {
  en: {
    menu:"Menu", cat:"Category:", sort:"Sort by:", basket:"Your Basket",
    total:"Total:", place:"Place Order", cal:"cal", add:"Add",
    popup: {
      enter:"Enter Your Details", cancel:"Cancel", cont:"Continue",
      pay:"Payment Method", back:"Back", next:"Next",
      confirm:"Confirm Your Order", download:"📄 Download Invoice"
    }
  },
  ar: {
    menu:"القائمة", cat:"التصنيف:", sort:"الفرز حسب:", basket:"سلتك",
    total:"الإجمالي:", place:"إتمام الطلب", cal:"سعرة حرارية", add:"أضف",
    popup: {
      enter:"أدخل بياناتك", cancel:"إلغاء", cont:"متابعة",
      pay:"طريقة الدفع", back:"رجوع", next:"التالي",
      confirm:"تأكيد الطلب", download:"📄 تحميل الفاتورة"
    }
  }
};

// أسماء المنتجات بالعربية
const namesAR = {
  pizza: {"Margherita":"مارغريتا","Pepperoni":"ببروني","Hawaiian":"هاواي","Cheese Lovers Pizza":"بيتزا عشاق الجبن","BBQ Chicken":"دجاج باربكيو","Veggie":"خضار","Sweet Corn Pizza":"بيتزا الذرة الحلوة","Mushroom Delight":"بيتزا الفطر","Mexican":"مكسيكية","Cheddar Melt Pizza":"بيتزا شيدر"},
  pasta: {"Alfredo":"ألفريدو","Arrabbiata":"أرابياتا","Rose Pasta with Chicken":"باستا الورد بالدجاج","Bolognese":"بولونيز","Farfalle Pasta":"فارفيلي","Pink Sauce Pasta":"باستا الصوص الوردي","Lemon Chicken Pasta with Broccoli":"باستا دجاج بالليمون والبروكلي","Bacon & Pea Orecchiette":"أوريكياتي بالبازلاء واللحم","Crab Lemon Tagliatelle":"تاغلياتيلي بالليمون والسرطان","Stracciatella Tagliatelle":"تاغلياتيلي بالجبنة والفطر"},
  drinks: {"Water":"ماء","Apple Juice":"عصير تفاح","Cola":"كولا","Cold chocolate":"شوكولاتة باردة","Strawberry Juice":"عصير فراولة","Mixed Fruit Juice":"عصير مشكل","Pepsi Juice":"بيبسي","Cappuccino":"كابتشينو","Mango Juice":"عصير مانجو","Orange Juice":"عصير برتقال"}
};

// تحويل أرقام عربية للعرض
function toArabic(n) {
  return n.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
}

// بيانات القائمة (صور، أسعار)
const menuData = {
	pizza: [
    {name:"Margherita",price:8.5,cal:800,img:"images/Margherita.jpeg"},
    {name:"Pepperoni",price:9.5,cal:950,img:"images/Pepperoni.jpeg"},
    {name:"Hawaiian",price:9.0,cal:870,img:"images/Hawaiian.jpeg"},
    {name:"Cheese Lovers Pizza",price:10.5,cal:900,img:"images/Cheese Lovers Pizza.jpeg"},
    {name:"BBQ Chicken",price:10.0,cal:1020,img:"images/BBQ Chicken.jpeg"},
    {name:"Veggie",price:8.0,cal:740,img:"images/Veggie.jpeg"},
    {name:"Sweet Corn Pizza",price:11.5,cal:990,img:"images/Sweet Corn Pizza.png"},
    {name:"Mushroom Delight",price:9.8,cal:860,img:"images/Mushroom Delight.jpeg"},
    {name:"Mexican",price:12.0,cal:1100,img:"images/Mexican.jpeg"},
    {name:"Cheddar Melt Pizza",price:13.5,cal:980,img:"images/Cheddar Melt Pizza.jpeg"}
  ],
  pasta: [
    {name:"Alfredo",price:7.5,cal:700,img:"images/Alfredo.jpeg"},
    {name:"Arrabbiata",price:7.8,cal:780,img:"images/Arrabbiata.jpeg"},
    {name:"Rose Pasta with Chicken",price:9.0,cal:920,img:"images/Rose Pasta with Chicken.png"},
    {name:"Bolognese",price:8.5,cal:850,img:"images/Bolognese.jpeg"},
    {name:"Farfalle Pasta",price:8.0,cal:780,img:"images/Farfalle Pasta.jpg"},
    {name:"Pink Sauce Pasta",price:9.2,cal:870,img:"images/Pink Sauce Pasta.jpg"},
    {name:"Lemon Chicken Pasta with Broccoli",price:10.0,cal:950,img:"images/Lemon Chicken Pasta with Broccoli.png"},
    {name:"Bacon & Pea Orecchiette",price:7.3,cal:690,img:"images/Bacon & Pea Orecchiette.jpg"},
    {name:"Crab Lemon Tagliatelle",price:11.5,cal:980,img:"images/Crab Lemon Tagliatelle.png"},
    {name:"Stracciatella Tagliatelle",price:11.0,cal:1000,img:"images/Stracciatella Tagliatelle.jpg"}
  ],
  drinks: [
    {name:"Water",price:1.0,cal:0,img:"images/Water.jpeg"},
    {name:"Apple Juice",price:2.2,cal:115,img:"images/Apple Juice.jpg"},
    {name:"Cola",price:2.5,cal:150,img:"images/Cola.jpg"},
    {name:"Cold chocolate",price:2.8,cal:250,img:"images/Cold chocolate.jpg"},
    {name:"Strawberry Juice",price:3.2,cal:130,img:"images/Strawberry Juice.jpg"},
    {name:"Mixed Fruit Juice",price:3.8,cal:140,img:"images/Mixed Fruit Juice.jpg"},
    {name:"Pepsi Juice",price:3.7,cal:150,img:"images/Pepsi Juice.jpg"},
    {name:"Cappuccino",price:2.9,cal:80,img:"images/Cappuccino.jpeg"},
    {name:"Mango Juice",price:4.0,cal:150,img:"images/Mango Juice.jpg"},
    {name:"Orange Juice",price:3.0,cal:110,img:"images/Orange Juice.jpg"}
  ]
};

let basket = [];

const grid = document.getElementById('grid');
const basketList = document.getElementById('basketList');
const totalEl = document.getElementById('total');
const categoryEl = document.getElementById('category');
const sortEl = document.getElementById('sort');

function renderMenu(){
  const cat = categoryEl.value;
  const lang = isEN ? 'en' : 'ar';
  let items = [...menuData[cat]];
  const s = sortEl.value;
  if (s === 'name') items.sort((a,b)=>a.name.localeCompare(b.name));
  if (s === 'price') items.sort((a,b)=>a.price - b.price);
  if (s === 'calories') items.sort((a,b)=>a.cal - b.cal);

  grid.innerHTML = '';
  items.forEach(it => {
    const name = isEN ? it.name : (namesAR[cat][it.name] || it.name);
    const price = isEN ? `$${it.price.toFixed(2)}` : `${toArabic(it.price.toFixed(2))} دولار`;
    const cal = isEN ? `${it.cal} ${textTrans[lang].cal}` : `${toArabic(it.cal)} ${textTrans[lang].cal}`;

    const card = document.createElement('article');
    card.className = 'item';
    card.setAttribute('role','listitem');
    card.innerHTML = `
      <img src="${it.img}" alt="${name}">
      <div class="info">
        <h3 class="title">${name}</h3>
        <div class="price">${price}</div>
        <div class="cal">${cal}</div>
        <div class="actions">
          <div class="qty"><button>-</button><span>1</span><button>+</button></div>
          <button class="add">${textTrans[lang].add}</button>
        </div>
      </div>
    `;
    const [minus, val, plus] = card.querySelectorAll('.qty *');
    minus.onclick = () => { let n = +val.textContent; if (n > 1) val.textContent = --n; };
    plus.onclick = () => { let n = +val.textContent; val.textContent = ++n; };
    card.querySelector('.add').onclick = () => addToBasket(name, it.price, +val.textContent);

    grid.appendChild(card);
  });
}

function addToBasket(name, price, qty = 1) {
  const f = basket.find(x => x.name === name);
  if (f) f.qty += qty;
  else basket.push({ name, price, qty });
  renderBasket();
}

function removeItem(i){
  basket.splice(i,1);
  renderBasket();
}

function renderBasket(){
  basketList.innerHTML = '';
  let total = 0;
  basket.forEach((it,i) => {
    const line = it.price * it.qty;
    total += line;
    const row = document.createElement('div');
    row.className = 'basket-item';
    row.innerHTML = `
      <span>${it.qty}× ${it.name}</span>
      <span>$${line.toFixed(2)} <button class="rm" onclick="removeItem(${i})">×</button></span>
    `;
    basketList.appendChild(row);
  });
  totalEl.textContent = total.toFixed(2);
}

categoryEl.addEventListener('change', renderMenu);
sortEl.addEventListener('change', renderMenu);

const orderPopup = document.getElementById('orderPopup');
const steps = [
  document.getElementById('step1'),
  document.getElementById('step2'),
  document.getElementById('step3')
];
const paymentMethod = document.getElementById('paymentMethod');
const cardFields = document.getElementById('cardFields');

document.getElementById('placeBtn').onclick = () => {
  if (basket.length === 0) {
    alert(isEN ? 'Please add items to your basket first!' : 'يرجى إضافة منتجات أولًا!');
    return;
  }
  updatePopupLanguage();
  resetPopup();
  orderPopup.style.display = 'flex';
  steps.forEach((s, i) => s.style.display = (i === 0) ? 'block' : 'none');
};

function closePopup() {
  orderPopup.style.display = 'none';
  document.getElementById('orderSummaryText').innerHTML = '';
  document.getElementById('afterConfirm').style.display = 'none';
  document.getElementById('confirmBtn').style.display = 'inline-block';
}

function isValidEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function nextStep(n) {
  if (n === 2) {
    // ننتقل إلى طريقة الدفع فقط
    steps.forEach((s, i) => s.style.display = (i === 1) ? 'block' : 'none');
    return;
  }

  if (n === 3) {
    // ننتقل إلى التأكيد
    steps.forEach((s, i) => s.style.display = (i === 2) ? 'block' : 'none');

    const name = document.getElementById('custName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value || (isEN ? '—' : '—');
    const pay = paymentMethod.value === 'card'
      ? (isEN ? 'Credit Card' : 'بطاقة')
      : (isEN ? 'Cash' : 'نقداً');

    let itemsHTML = '';
    let total = 0;
    basket.forEach(item => {
      const itTotal = item.price * item.qty;
      total += itTotal;
      itemsHTML += `${item.name} × ${item.qty} — $${itTotal.toFixed(2)}<br>`;
    });
    const totalText = `<b>${isEN ? 'Total:' : 'الإجمالي:'}</b> $${total.toFixed(2)}`;

    const summary = isEN
      ? `<b>Name:</b> ${name}<br><b>Phone:</b> ${phone}<br><b>Email:</b> ${email}<br><b>Address:</b> ${address}<br><b>Payment:</b> ${pay}<br><hr><b>Order Details:</b><br>${itemsHTML}${totalText}`
      : `<b>الاسم:</b> ${name}<br><b>الجوال:</b> ${phone}<br><b>البريد:</b> ${email}<br><b>العنوان:</b> ${address}<br><b>طريقة الدفع:</b> ${pay}<br><hr><b>تفاصيل الطلب:</b><br>${itemsHTML}${totalText}`;

    document.getElementById('orderSummaryText').innerHTML = summary;
    return;
  }

  // لبقية الخطوات (مثلاً الرجوع للخطوة 1)
  steps.forEach((s, i) => s.style.display = (i === n - 1) ? 'block' : 'none');
}




paymentMethod.onchange = () => {
  cardFields.style.display = (paymentMethod.value === 'card') ? 'block' : 'none';
};

function resetPopup() {
  steps.forEach(s => s.style.display = 'none');
  steps[0].style.display = 'block';
  document.getElementById('afterConfirm').style.display = 'none';
  document.getElementById('confirmBtn').style.display = 'inline-block';
}

function finishOrder() {
  const name = document.getElementById('custName').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value || (isEN ? '—' : '—');
  const pay = paymentMethod.value === 'card'
    ? (isEN ? 'Credit Card' : 'بطاقة')
    : (isEN ? 'Cash' : 'نقداً');

  let itemsHTML = '';
  let total = 0;
  basket.forEach(item => {
    const itTotal = item.price * item.qty;
    total += itTotal;
    itemsHTML += `${item.name} × ${item.qty} — $${itTotal.toFixed(2)}<br>`;
  });
  const totalText = `<b>${isEN ? 'Total:' : 'الإجمالي:'}</b> $${total.toFixed(2)}`;

  const summary = isEN
    ? `<b>Name:</b> ${name}<br><b>Phone:</b> ${phone}<br><b>Email:</b> ${email}<br><b>Address:</b> ${address}<br><b>Payment:</b> ${pay}<br><hr><b>Order Details:</b><br>${itemsHTML}${totalText}`
    : `<b>الاسم:</b> ${name}<br><b>الجوال:</b> ${phone}<br><b>البريد:</b> ${email}<br><b>العنوان:</b> ${address}<br><b>طريقة الدفع:</b> ${pay}<br><hr><b>تفاصيل الطلب:</b><br>${itemsHTML}${totalText}`;

  document.getElementById('orderSummaryText').innerHTML = summary;

  // حفظ الفاتورة في ملف وتحميلها فورًا
  const langDir = isEN ? 'ltr' : 'rtl';
  const title = isEN ? 'Super Slice - Invoice' : 'سوبر سلايس - الفاتورة';
  const logoTxt = isEN ? '🍕 Super Slice' : '🍕 سوبر سلايس';

  const html = `
  <html dir="${langDir}">
  <head><meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f9f9f9; color: #000; padding: 40px; }
    .invoice { background: #fff; padding: 25px; border-radius: 10px; max-width: 550px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .logo { text-align:center; font-size:22px; color:#333; margin-bottom:8px; font-weight:bold; }
    hr { border:0; border-top:1px solid #ccc; margin:15px 0; }
    .footer { text-align:center; margin-top:20px; color:#777; font-size:13px; }
  </style>
  </head>
  <body>
    <div class="invoice">
      <div class="logo">${logoTxt}</div>
      <h2>${title}</h2>
      <hr>
      ${summary}
      <div class="footer">${isEN ? "Thank you for your order!" : "شكرًا لتسوقك معنا!"}</div>
    </div>
  </body>
  </html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = isEN
    ? `${name || 'Customer'} - SuperSlice Invoice.html`
    : `${name || 'عميل'} - فاتورة بيتزا سوبر سلايس.html`;
  link.click();
  URL.revokeObjectURL(link.href);

  // تفريغ السلة وإعادة العرض
  basket = [];
  renderBasket();

  // إغلاق الديالوق بعد ثوانٍ بسيطة
  setTimeout(closePopup, 300);
}


function downloadInvoiceHTML() {
  const summary = document.getElementById('orderSummaryText').innerHTML;
  const name = document.getElementById('custName').value || (isEN ? 'Customer' : 'عميل');
  const langDir = isEN ? 'ltr' : 'rtl';
  const title = isEN ? 'Super Slice - Invoice' : 'سوبر سلايس - الفاتورة';
  const logoTxt = isEN ? '🍕 Super Slice' : '🍕 سوبر سلايس';

  const html = `
  <html dir="${langDir}">
  <head><meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f9f9f9; color: #000; padding: 40px; }
    .invoice { background: #fff; padding: 25px; border-radius: 10px; max-width: 550px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .logo { text-align:center; font-size:22px; color:#333; margin-bottom:8px; font-weight:bold; }
    hr { border:0; border-top:1px solid #ccc; margin:15px 0; }
    .footer { text-align:center; margin-top:20px; color:#777; font-size:13px; }
  </style>
  </head>
  <body>
    <div class="invoice">
      <div class="logo">${logoTxt}</div>
      <h2>${title}</h2>
      <hr>
      ${summary}
      <div class="footer">${isEN ? "Thank you for your order!" : "شكرًا لتسوقك معنا!"}</div>
    </div>
  </body>
  </html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = isEN
    ? `${name} - SuperSlice Invoice.html`
    : `${name} - فاتورة بيتزا سوبر سلايس.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function updatePopupLanguage() {
  const t = isEN ? textTrans.en.popup : textTrans.ar.popup;
  document.getElementById('enterDetails').innerText = t.enter;
  document.getElementById('cancelBtn').innerText = t.cancel;
  document.getElementById('continueBtn').innerText = t.cont;
  document.getElementById('paymentTitle').innerText = t.pay;
  document.getElementById('backBtn').innerText = t.back;
  document.getElementById('nextBtn').innerText = t.next;
  document.getElementById('confirmTitle').innerText = t.confirm;
  document.getElementById('backConfirmBtn').innerText = t.back;
  document.querySelector('#afterConfirm .next span').innerText = isEN ? 'Download Invoice' : 'تحميل الفاتورة';

  document.getElementById('menuTitle').innerText = isEN ? textTrans.en.menu : textTrans.ar.menu;
  document.getElementById('catLabel').innerText  = isEN ? textTrans.en.cat : textTrans.ar.cat;
  document.getElementById('sortLabel').innerText = isEN ? textTrans.en.sort : textTrans.ar.sort;
  document.getElementById('basketTitle').innerText = isEN ? textTrans.en.basket : textTrans.ar.basket;
  document.getElementById('totalLabel').innerText = isEN ? textTrans.en.total : textTrans.ar.total;
  document.getElementById('placeBtn').innerText = isEN ? textTrans.en.place : textTrans.ar.place;

  // ✅ تحديث أسماء القوائم (Category & Sort options)
  document.querySelectorAll('#category option').forEach(opt => {
    opt.textContent = isEN ? opt.dataset.en : opt.dataset.ar;
  });
  document.querySelectorAll('#sort option').forEach(opt => {
    opt.textContent = isEN ? opt.dataset.en : opt.dataset.ar;
  });

  // ✅ إجبار تحديث النص الظاهر
  const category = document.getElementById('category');
  const sort = document.getElementById('sort');
  if (category) category.selectedIndex = category.selectedIndex;
  if (sort) sort.selectedIndex = sort.selectedIndex;

  // ✅ بعد ترجمة كل شيء، نعيد رسم القائمة
  renderMenu();
}

  // ✅ إجبار إعادة تعيين النص داخل select نفسه
  const category = document.getElementById('category');
  const sort = document.getElementById('sort');
  if (category) category.selectedIndex = category.selectedIndex; // تعيد عرض النص حسب اللغة
  if (sort) sort.selectedIndex = sort.selectedIndex;



  // ✅ تحديث أسماء القوائم (Category & Sort options)
  document.querySelectorAll('#category option').forEach(opt => {
    opt.textContent = isEN ? opt.dataset.en : opt.dataset.ar;
  });
  document.querySelectorAll('#sort option').forEach(opt => {
    opt.textContent = isEN ? opt.dataset.en : opt.dataset.ar;
  });



// ==== تأكد من الترجمة بعد تحميل الصفحة أو عند تغيير اللغة من صفحة أخرى ====
window.addEventListener('DOMContentLoaded', () => {
  if (typeof updatePopupLanguage === 'function') updatePopupLanguage();
});

window.addEventListener('lang:changed', () => {
  if (typeof updatePopupLanguage === 'function') updatePopupLanguage();
});

renderMenu();





