// ====== UI Translations ======
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

// Arabic product names
const namesAR = {
  pizza: {"Margherita":"مارغريتا","Pepperoni":"ببروني","Hawaiian":"هاواي","Cheese Lovers Pizza":"بيتزا عشاق الجبن","BBQ Chicken":"دجاج باربكيو","Veggie":"خضار","Sweet Corn Pizza":"بيتزا الذرة الحلوة","Mushroom Delight":"بيتزا الفطر","Mexican":"مكسيكية","Cheddar Melt Pizza":"بيتزا شيدر"},
  pasta: {"Alfredo":"ألفريدو","Arrabbiata":"أرابياتا","Rose Pasta with Chicken":"باستا الورد بالدجاج","Bolognese":"بولونيز","Farfalle Pasta":"فارفيلي","Pink Sauce Pasta":"باستا الصوص الوردي","Lemon Chicken Pasta with Broccoli":"باستا دجاج بالليمون والبروكلي","Bacon & Pea Orecchiette":"أوريكياتي بالبازلاء واللحم","Crab Lemon Tagliatelle":"تاغلياتيلي بالليمون والسرطان","Stracciatella Tagliatelle":"تاغلياتيلي بالجبنة والفطر"},
  drinks: {"Water":"ماء","Apple Juice":"عصير تفاح","Cola":"كولا","Cold chocolate":"شوكولاتة باردة","Strawberry Juice":"عصير فراولة","Mixed Fruit Juice":"عصير مشكل","Pepsi Juice":"بيبسي","Cappuccino":"كابتشينو","Mango Juice":"عصير مانجو","Orange Juice":"عصير برتقال"}
};

// Arabic numerals for display
function toArabic(n){ return n.toString().replace(/\d/g,d=>"٠١٢٣٤٥٦٧٨٩"[d]); }

// Menu data (images via links)
const menuData = {
  pizza: [
    {name:"Margherita",price:8.5,cal:800,img:"https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg"},
    {name:"Pepperoni",price:9.5,cal:950,img:"https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg"},
    {name:"Hawaiian",price:9.0,cal:870,img:"https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg"},
    {name:"Cheese Lovers Pizza",price:10.5,cal:900,img:"https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg"},
    {name:"BBQ Chicken",price:10.0,cal:1020,img:"https://images.pexels.com/photos/774487/pexels-photo-774487.jpeg"},
    {name:"Veggie",price:8.0,cal:740,img:"https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg"},
    {name:"Sweet Corn Pizza",price:11.5,cal:990,img:"https://dietitiandebbie.com/wp-content/uploads/2025/05/sweet-corn-pizza-6-1-1065x1536.jpg"},
    {name:"Mushroom Delight",price:9.8,cal:860,img:"https://images.pexels.com/photos/5908229/pexels-photo-5908229.jpeg"},
    {name:"Mexican",price:12.0,cal:1100,img:"https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg"},
    {name:"Cheddar Melt Pizza",price:13.5,cal:980,img:"https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg"}
  ],
  pasta: [
    {name:"Alfredo",price:7.5,cal:700,img:"https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"},
    {name:"Arrabbiata",price:7.8,cal:780,img:"https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg"},
    {name:"Rose Pasta with Chicken",price:9.0,cal:920,img:"https://www.platingpixels.com/wp-content/uploads/2025/08/Rose-Pasta-with-Chicken-recipe-3.webp"},
    {name:"Bolognese",price:8.5,cal:850,img:"https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg"},
    {name:"Farfalle Pasta",price:8.0,cal:780,img:"https://mccormick.widen.net/content/73nsorkvek/jpeg/italian_herb_pesto_farfalle_pasta02_2000x1125-copy.jpeg"},
    {name:"Pink Sauce Pasta",price:9.2,cal:870,img:"https://pixelsandplates.com/wp-content/uploads/2021//09/pink-sauce-pasta-final-3.jpg"},
    {name:"Lemon Chicken Pasta with Broccoli",price:10.0,cal:950,img:"https://www.platingpixels.com/wp-content/uploads/2016/04/Lightened-Up-Lemon-Broccoli-Chicken-Pasta-recipe-2.webp"},
    {name:"Bacon & Pea Orecchiette",price:7.3,cal:690,img:"https://noplatelikehome.com/wp-content/uploads/IMG_4767-scaled.jpg"},
    {name:"Crab Lemon Tagliatelle",price:11.5,cal:980,img:"https://www.appetitemag.co.uk/wp-content/uploads/2013/08/TAGLIATELLE.jpg.webp"},
    {name:"Stracciatella Tagliatelle",price:11.0,cal:1000,img:"https://smilingcook.eu/wp-content/uploads/Pasta-Champignons-Straciatella.jpg"}
  ],
  drinks: [
    {name:"Water",price:1.0,cal:0,img:"https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg"},
    {name:"Apple Juice",price:2.2,cal:115,img:"https://plus.unsplash.com/premium_photo-1663089590359-6ec775dd518e?w=600"},
    {name:"Cola",price:2.5,cal:150,img:"https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?q=80"},
    {name:"Cold chocolate",price:2.8,cal:250,img:"https://images.unsplash.com/photo-1626200949108-510618c118c3?q=80"},
    {name:"Strawberry Juice",price:3.2,cal:130,img:"https://images.unsplash.com/photo-1543264228-460e284028a7?q=80"},
    {name:"Mixed Fruit Juice",price:3.8,cal:140,img:"https://images.unsplash.com/photo-1617535394182-641e70651cd8?q=80"},
    {name:"Pepsi Juice",price:3.7,cal:150,img:"https://images.unsplash.com/photo-1629203851288-7ececa5f05c4?q=80"},
    {name:"Cappuccino",price:2.9,cal:80,img:"https://images.pexels.com/photos/302901/pexels-photo-302901.jpeg"},
    {name:"Mango Juice",price:4.0,cal:150,img:"https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?q=80"},
    {name:"Orange Juice",price:3.0,cal:110,img:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80"}
  ]
};

// Basket state
let basket = [];

// مراجع DOM
// DOM refs
const grid        = document.getElementById('grid');
const basketList  = document.getElementById('basketList');
const totalEl     = document.getElementById('total');
const categoryEl  = document.getElementById('category');
const sortEl      = document.getElementById('sort');

// Render menu grid
function renderMenu(){
  const cat  = categoryEl.value;
  const lang = isEN ? 'en' : 'ar';
  let items  = [...menuData[cat]];
  const s    = sortEl.value;

  if (s==='name')     items.sort((a,b)=>a.name.localeCompare(b.name));
  if (s==='price')    items.sort((a,b)=>a.price-b.price);
  if (s==='calories') items.sort((a,b)=>a.cal-b.cal);

  grid.innerHTML = '';
  items.forEach(it=>{
    const name = isEN ? it.name : (namesAR[cat][it.name] || it.name);
    const price= isEN ? `$${it.price.toFixed(2)}` : `${toArabic(it.price.toFixed(2))} دولار`;
    const cal  = isEN ? `${it.cal} ${textTrans[lang].cal}` : `${toArabic(it.cal)} ${textTrans[lang].cal}`;

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
          <div class="qty"><button aria-label="Decrease">-</button><span>1</span><button aria-label="Increase">+</button></div>
          <button class="add">${textTrans[lang].add}</button>
        </div>
      </div>
    `;
    const [minus,val,plus] = card.querySelectorAll('.qty *');
    minus.onclick = ()=>{ let n=+val.textContent; if(n>1) val.textContent=--n; };
    plus.onclick  = ()=>{ let n=+val.textContent; val.textContent=++n; };
    card.querySelector('.add').onclick = ()=> addToBasket(name, it.price, +val.textContent);

    grid.appendChild(card);
  });
}

function addToBasket(name, price, qty=1){
  const f = basket.find(x=>x.name===name);
  if (f) f.qty += qty;
  else   basket.push({name, price, qty});
  renderBasket();
}

function removeItem(i){
  basket.splice(i,1);
  renderBasket();
}

function renderBasket(){
  basketList.innerHTML = '';
  let total = 0;
  basket.forEach((it,i)=>{
    const line = it.price * it.qty;
    total += line;
    const row = document.createElement('div');
    row.className = 'basket-item';
    row.innerHTML = `
      <span>${it.qty}× ${it.name}</span>
      <span>$${line.toFixed(2)} <button class="rm" aria-label="Remove" onclick="removeItem(${i})">×</button></span>
    `;
    basketList.appendChild(row);
  });
  totalEl.textContent = total.toFixed(2);
}

categoryEl.addEventListener('change', renderMenu);
sortEl.addEventListener('change', renderMenu);

const orderPopup   = document.getElementById('orderPopup');
const steps        = [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3')];
const paymentMethod= document.getElementById('paymentMethod');
const cardFields   = document.getElementById('cardFields');

document.getElementById('placeBtn').onclick = () => {
  if (basket.length === 0) {
    alert(isEN ? 'Please add items to your basket first!' : 'يرجى إضافة منتجات إلى السلة أولاً!');
    return;
  }
  updatePopupLanguage();
  resetPopup();
  orderPopup.style.display = 'flex';
  steps.forEach((s, i) => s.style.display = i === 0 ? 'block' : 'none');
};

function closePopup() {
  orderPopup.style.display = 'none';
  document.getElementById('orderSummaryText').innerHTML = '';
  document.getElementById('afterConfirm').style.display = 'none';
  document.getElementById('confirmBtn').style.display = 'inline-block';
}

function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function nextStep(n){
  if (n === 2) {
    const name  = document.getElementById('custName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name)             { alert(isEN?'Please enter your full name':'الرجاء إدخال الاسم الكامل'); return; }
    if (!/^\d+$/.test(phone)){ alert(isEN?'Please enter a valid phone number':'الرجاء إدخال رقم جوال صحيح'); return; }
    if (!isValidEmail(email)){ alert(isEN?'Please enter a valid email address':'الرجاء إدخال بريد إلكتروني صحيح'); return; }
  }
  steps.forEach((s, i) => s.style.display = (i === n-1) ? 'block' : 'none');
}

paymentMethod.onchange = () => {
  cardFields.style.display = paymentMethod.value === 'card' ? 'block' : 'none';
};

function resetPopup() {
  steps.forEach(s => s.style.display = 'none');
  steps[0].style.display = 'block';
  document.getElementById('afterConfirm').style.display = 'none';
  document.getElementById('confirmBtn').style.display = 'inline-block';
}

function finishOrder(){
  const name    = document.getElementById('custName').value;
  const phone   = document.getElementById('phone').value;
  const email   = document.getElementById('email').value;
  const address = document.getElementById('address').value || (isEN?'—':'—');
  const pay     = paymentMethod.value === 'card' ? (isEN?'Credit Card':'بطاقة') : (isEN?'Cash':'نقداً');

  let itemsHTML = '';
  let total = 0;
  basket.forEach(item=>{
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    itemsHTML += `${item.name} × ${item.qty} — $${itemTotal.toFixed(2)}<br>`;
  });
  const totalText = `<b>${isEN ? 'Total:' : 'الإجمالي:'}</b> $${total.toFixed(2)}`;

  const summary = isEN
    ? `<b>Name:</b> ${name}<br><b>Phone:</b> ${phone}<br><b>Email:</b> ${email}<br><b>Address:</b> ${address}<br><b>Payment:</b> ${pay}<br><hr><b>Order Details:</b><br>${itemsHTML}${totalText}<br><br>✅ Your order is confirmed!`
    : `<b>الاسم:</b> ${name}<br><b>الجوال:</b> ${phone}<br><b>البريد:</b> ${email}<br><b>العنوان:</b> ${address}<br><b>طريقة الدفع:</b> ${pay}<br><hr><b>تفاصيل الطلب:</b><br>${itemsHTML}${totalText}<br><br>✅ تم تأكيد طلبك بنجاح!`;

  document.getElementById('orderSummaryText').innerHTML = summary;
  document.getElementById('confirmBtn').style.display = 'none';
  document.getElementById('afterConfirm').style.display = 'block';
}

function downloadInvoiceHTML(){
  const summary = document.getElementById('orderSummaryText').innerHTML;
  const name    = document.getElementById('custName').value || (isEN ? 'Customer' : 'عميل');
  const langDir = isEN ? 'ltr' : 'rtl';
  const title   = isEN ? 'Super Slice - Invoice' : 'سوبر سلايس - الفاتورة';
  const logoTxt = isEN ? '🍕 Super Slice' : '🍕 سوبر سلايس';

  const html = `
  <html dir="${langDir}">
  <head><meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f9f9f9; color: #000; padding: 40px; }
    .invoice { background: #fff; padding: 25px; border-radius: 10px; max-width: 550px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .logo { text-align:center; font-size:22px; color:#333; margin-bottom:8px; font-weight:bold; }
    h2 { text-align:center; color:#444; margin-bottom:15px; }
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

function updatePopupLanguage(){
  const t = isEN ? textTrans.en.popup : textTrans.ar.popup;
  document.getElementById('enterDetails').innerText = t.enter;
  document.getElementById('cancelBtn').innerText   = t.cancel;
  document.getElementById('continueBtn').innerText = t.cont;
  document.getElementById('paymentTitle').innerText= t.pay;
  document.getElementById('backBtn').innerText     = t.back;
  document.getElementById('nextBtn').innerText     = t.next;
  document.getElementById('confirmTitle').innerText= t.confirm;
  document.getElementById('backConfirmBtn').innerText = t.back;
  document.querySelector('#afterConfirm .next span').innerText = isEN ? 'Download Invoice' : 'تحميل الفاتورة';

  document.getElementById('menuTitle').innerText  = isEN ? textTrans.en.menu  : textTrans.ar.menu;
  document.getElementById('catLabel').innerText   = isEN ? textTrans.en.cat   : textTrans.ar.cat;
  document.getElementById('sortLabel').innerText  = isEN ? textTrans.en.sort  : textTrans.ar.sort;
  document.getElementById('basketTitle').innerText= isEN ? textTrans.en.basket: textTrans.ar.basket;
  document.getElementById('totalLabel').innerText = isEN ? textTrans.en.total : textTrans.ar.total;
  document.getElementById('placeBtn').innerText   = isEN ? textTrans.en.place : textTrans.ar.place;

  renderMenu();
}

// تهيئة أولية
renderMenu();
