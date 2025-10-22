
/* ============================================================
🍕 Hopza — Order Page JavaScript (order.js)
Purpose: Handles all interactive behavior for the Order page.
Includes:
- Bilingual interface (English / Arabic) text labels
- Menu rendering and sorting
- Basket (cart) operations: add, remove, update
- Popup multi-step ordering (details → payment → confirmation)
- Input validation for name, phone, email
- Dynamic language switching
- Invoice generation and download as HTML
- Search suggestion system
Note: Original logic preserved — documentation comments only.
============================================================ */

// ====== Interface Text Translation (Labels) ======
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

// ====== Arabic Product Names Mapping ======
const namesAR = {
  pizza: {"Margherita":"مارغريتا","Pepperoni":"ببروني","Hawaiian":"هاواي","Cheese Lovers Pizza":"بيتزا عشاق الجبن","BBQ Chicken":"دجاج باربكيو","Veggie":"خضار","Sweet Corn Pizza":"بيتزا الذرة الحلوة","Mushroom Delight":"بيتزا الفطر","Mexican":"مكسيكية","Cheddar Melt Pizza":"بيتزا شيدر","Normal Mushrooms pizza":"مشروم بيتزا عادية"},
  pasta: {"Alfredo":"ألفريدو","Arrabbiata":"أرابياتا","Rose Pasta with Chicken":"باستا الورد بالدجاج","Bolognese":"بولونيز","Farfalle Pasta":"فارفيلي","Pink Sauce Pasta":"باستا الصوص الوردي","Lemon Chicken Pasta with Broccoli":"باستا دجاج بالليمون والبروكلي","Bacon & Pea Orecchiette":"أوريكياتي بالبازلاء واللحم","Crab Lemon Tagliatelle":"تاغلياتيلي بالليمون والسرطان","Stracciatella Tagliatelle":"تاغلياتيلي بالجبنة والفطر","Spaghetti alla Puttanesca":"سباغيتي بوتانيسكا"},
  drinks: {"Water":"ماء","Apple Juice":"عصير تفاح","Cola":"كولا","Cold chocolate":"شوكولاتة باردة","Strawberry Juice":"عصير فراولة","Mixed Fruit Juice":"عصير مشكل","Pepsi Juice":"بيبسي","Cappuccino":"كابتشينو","Mango Juice":"عصير مانجو","Orange Juice":"عصير برتقال","Cantaloupe Juice":"عصير شمام"}
};

// ====== Convert Numbers to Arabic Digits for Display ======
function toArabic(n) {
  return n.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
}

// ====== Menu Data (Items with Images, Prices, Calories) ======
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
    {name:"Normal Mushrooms pizza",price:12.5,cal:980,img:"images/mushrooms pizza.png"},
    {name:"Cheddar Melt Pizza",price:13.5,cal:980,img:"images/Cheddar Melt Pizza.jpeg"}
  ],
  pasta: [
    {name:"Alfredo",price:7.5,cal:700,img:"images/Alfredo.jpeg"},
	{name:"Spaghetti alla Puttanesca",price:11.0,cal:1000,img:"images/Spaghetti alla Puttanesca.png"},
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
    {name:"Orange Juice",price:3.0,cal:110,img:"images/Orange Juice.jpg"},
    {name:"Cantaloupe Juice",price:3.0,cal:110,img:"images/Cantaloupe.jpg"}
  ]
};
// ====== Initialize basket and essential DOM references ======
let basket = [];

const grid = document.getElementById('grid');
const basketList = document.getElementById('basketList');
const totalEl = document.getElementById('total');
const categoryEl = document.getElementById('category');
const sortEl = document.getElementById('sort');

// ====== Render the menu dynamically based on selected category and language ======
function renderMenu(){
  const cat = categoryEl.value;
  const lang = isEN ? 'en' : 'ar';
  let items = [...menuData[cat]];

  // Sort items by user selection
  const s = sortEl.value;
  if (s === 'name') items.sort((a,b)=>a.name.localeCompare(b.name));
  if (s === 'price') items.sort((a,b)=>a.price - b.price);
  if (s === 'calories') items.sort((a,b)=>a.cal - b.cal);

  grid.innerHTML = '';

  // Create item cards
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

    // Quantity control buttons
    const [minus, val, plus] = card.querySelectorAll('.qty *');
    minus.onclick = () => { let n = +val.textContent; if (n > 1) val.textContent = --n; };
    plus.onclick = () => { let n = +val.textContent; val.textContent = ++n; };

    // Add item to basket
    card.querySelector('.add').onclick = () => addToBasket(name, it.price, +val.textContent);
    grid.appendChild(card);
  });
}

// ====== Add selected item to basket ======
function addToBasket(name, price, qty = 1) {
  const f = basket.find(x => x.name === name);
  if (f) f.qty += qty;
  else basket.push({ name, price, qty });
  renderBasket();
}

// ====== Remove item from basket by index ======
function removeItem(i){
  basket.splice(i,1);
  renderBasket();
}

// ====== Render basket content and calculate total ======
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

// ====== Event listeners for filters ======
categoryEl.addEventListener('change', renderMenu);
sortEl.addEventListener('change', renderMenu);

// ====== Popup & Ordering Step Management ======
const orderPopup = document.getElementById('orderPopup');
const steps = [
  document.getElementById('step1'),
  document.getElementById('step2'),
  document.getElementById('step3')
];
const paymentMethod = document.getElementById('paymentMethod');
const cardFields = document.getElementById('cardFields');

// ====== Open popup when placing order ======
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

// ====== Close popup and reset content ======
function closePopup() {
  orderPopup.style.display = 'none';
  document.getElementById('orderSummaryText').innerHTML = '';
  document.getElementById('afterConfirm').style.display = 'none';
  document.getElementById('confirmBtn').style.display = 'inline-block';
}

// ====== Email validation helper ======
function isValidEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

// ====== Step navigation for popup wizard ======
function nextStep(n) {
  if (n === 2) {
    // Move to payment step
    steps.forEach((s, i) => s.style.display = (i === 1) ? 'block' : 'none');
    return;
  }

  if (n === 3) {
    // Move to confirmation step
    steps.forEach((s, i) => s.style.display = (i === 2) ? 'block' : 'none');

    const name = document.getElementById('custName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value || (isEN ? '—' : '—');
    const pay = paymentMethod.value === 'card'
      ? (isEN ? 'Credit Card' : 'بطاقة')
      : (isEN ? 'Cash' : 'نقداً');

    // Generate summary text dynamically
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

  // Go back to previous steps if needed
  steps.forEach((s, i) => s.style.display = (i === n - 1) ? 'block' : 'none');
}

// ====== Toggle card payment field visibility ======
paymentMethod.onchange = () => {
  cardFields.style.display = (paymentMethod.value === 'card') ? 'block' : 'none';
};

// ====== Reset popup to its initial state ======
function resetPopup() {
  steps.forEach(s => s.style.display = 'none');
  steps[0].style.display = 'block';
  document.getElementById('afterConfirm').style.display = 'none';
  document.getElementById('confirmBtn').style.display = 'inline-block';
}

// ====== Finalize Order and Generate Invoice ======
function finishOrder() {
  // Retrieve user input values from form fields
  const name = document.getElementById('custName').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value || (isEN ? '—' : '—');

  // Determine payment method based on user selection
  const pay = paymentMethod.value === 'card'
    ? (isEN ? 'Credit Card' : 'بطاقة')
    : (isEN ? 'Cash' : 'نقداً');

  // Build HTML for each item in the basket
  let itemsHTML = '';
  let total = 0;
  basket.forEach(item => {
    const itTotal = item.price * item.qty; // Calculate item subtotal
    total += itTotal; // Add to total
    itemsHTML += `${item.name} × ${item.qty} — $${itTotal.toFixed(2)}<br>`; // Append to invoice content
  });

  // Add total amount summary
  const totalText = `<b>${isEN ? 'Total:' : 'الإجمالي:'}</b> $${total.toFixed(2)}`;

  // Generate summary block in correct language
  const summary = isEN
    ? `<b>Name:</b> ${name}<br><b>Phone:</b> ${phone}<br><b>Email:</b> ${email}<br><b>Address:</b> ${address}<br><b>Payment:</b> ${pay}<br><hr><b>Order Details:</b><br>${itemsHTML}${totalText}`
    : `<b>الاسم:</b> ${name}<br><b>الجوال:</b> ${phone}<br><b>البريد:</b> ${email}<br><b>العنوان:</b> ${address}<br><b>طريقة الدفع:</b> ${pay}<br><hr><b>تفاصيل الطلب:</b><br>${itemsHTML}${totalText}`;

  // Display order summary on the popup
  document.getElementById('orderSummaryText').innerHTML = summary;

  // ====== Generate downloadable invoice file ======
  const langDir = isEN ? 'ltr' : 'rtl'; // Set text direction
  const title = isEN ? 'Hopza - Invoice' : 'هوبزا - الفاتورة';
  const logoTxt = isEN ? '🍕 Hopza' : '🍕هوبزا ';

  // Build the invoice HTML template
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

  // ====== Convert HTML to downloadable file ======
  const blob = new Blob([html], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = isEN
    ? `${name || 'Customer'} - Hopza Invoice.html`
    : `${name || 'عميل'} - فاتورة بيتزا هوبزا.html`;
  link.click(); // Trigger file download
  URL.revokeObjectURL(link.href); // Clean up object URL

  // ====== Reset basket and UI after completion ======
  basket = []; // Clear all items
  renderBasket(); // Refresh basket view

  // Auto-close the order popup after a short delay
  setTimeout(closePopup, 300);
}


// ====== Generate and Download Invoice File (HTML format) ======
function downloadInvoiceHTML() {
  // Retrieve current order summary and customer info
  const summary = document.getElementById('orderSummaryText').innerHTML;
  const name = document.getElementById('custName').value || (isEN ? 'Customer' : 'عميل');
  const langDir = isEN ? 'ltr' : 'rtl';
  const title = isEN ? 'Hopza - Invoice' : 'هوبزا - الفاتورة';
  const logoTxt = isEN ? '🍕 Hopza' : '🍕 هوبزا';

  // Build the invoice HTML document
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

  // Convert invoice to downloadable HTML file
  const blob = new Blob([html], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = isEN
    ? `${name} - Hopza Invoice.html`
    : `${name} - فاتورة بيتزا هويزا.html`;
  link.click(); // Trigger download
  URL.revokeObjectURL(link.href); // Free up memory
}

// ====== Update All Popup Texts and UI Elements Based on Language ======
function updatePopupLanguage() {
  const t = isEN ? textTrans.en.popup : textTrans.ar.popup;

  // Update popup step labels and buttons
  document.getElementById('enterDetails').innerText = t.enter;
  document.getElementById('cancelBtn').innerText = t.cancel;
  document.getElementById('continueBtn').innerText = t.cont;
  document.getElementById('paymentTitle').innerText = t.pay;
  document.getElementById('backBtn').innerText = t.back;
  document.getElementById('nextBtn').innerText = t.next;
  document.getElementById('confirmTitle').innerText = t.confirm;
  document.getElementById('backConfirmBtn').innerText = t.back;
  document.querySelector('#afterConfirm .next span').innerText = isEN ? 'Download Invoice' : 'تحميل الفاتورة';

  // Update main menu labels
  document.getElementById('menuTitle').innerText = isEN ? textTrans.en.menu : textTrans.ar.menu;
  document.getElementById('catLabel').innerText  = isEN ? textTrans.en.cat : textTrans.ar.cat;
  document.getElementById('sortLabel').innerText = isEN ? textTrans.en.sort : textTrans.ar.sort;
  document.getElementById('basketTitle').innerText = isEN ? textTrans.en.basket : textTrans.ar.basket;
  document.getElementById('totalLabel').innerText = isEN ? textTrans.en.total : textTrans.ar.total;
  document.getElementById('placeBtn').innerText = isEN ? textTrans.en.place : textTrans.ar.place;

  // Update <select> option labels for Category & Sort menus
  document.querySelectorAll('#category option').forEach(opt => {
    opt.textContent = isEN ? opt.dataset.en : opt.dataset.ar;
  });
  document.querySelectorAll('#sort option').forEach(opt => {
    opt.textContent = isEN ? opt.dataset.en : opt.dataset.ar;
  });

  // Force visual refresh of the <select> elements
  const category = document.getElementById('category');
  const sort = document.getElementById('sort');
  if (category) category.selectedIndex = category.selectedIndex;
  if (sort) sort.selectedIndex = sort.selectedIndex;

  // Re-render the menu after updating all texts
  renderMenu();
}

// ====== Force Select Elements to Re-render Text Labels ======
const category = document.getElementById('category');
const sort = document.getElementById('sort');
if (category) category.selectedIndex = category.selectedIndex; // Refresh text direction/language
if (sort) sort.selectedIndex = sort.selectedIndex;

// ====== Update Category and Sort Labels Again for Consistency ======
document.querySelectorAll('#category option').forEach(opt => {
  opt.textContent = isEN ? opt.dataset.en : opt.dataset.ar;
});
document.querySelectorAll('#sort option').forEach(opt => {
  opt.textContent = isEN ? opt.dataset.en : opt.dataset.ar;
});

// ====== Initialize Menu Rendering and Search Functionality ======
window.addEventListener('DOMContentLoaded', () => {
  renderMenu(); // Ensure menu is rendered when the page loads

  // 🔍 Search bar setup (runs only after DOM is loaded)
  const searchBox = document.getElementById('searchBox');
  const suggestions = document.getElementById('suggestions');

  // Collect all product names (English + Arabic) into a searchable list
  const keywords = [];
  Object.keys(menuData).forEach(cat => {
    menuData[cat].forEach(item => {
      const en = item.name;
      const ar = namesAR[cat]?.[en] || en;
      keywords.push(en, ar);
    });
  });

  // Live search logic: triggered on user input
  searchBox.addEventListener('input', function () {
    const q = this.value.toLowerCase().trim(); // Normalize input
    suggestions.innerHTML = ''; // Clear previous results

    if (!q) {
      suggestions.hidden = true; // Hide dropdown if input is empty
      return;
    }

    // Filter keywords that include the search term
    const matched = keywords.filter(k => k.toLowerCase().includes(q)).slice(0, 5);

    // Display up to 5 matching results as clickable suggestions
    matched.forEach(m => {
      const li = document.createElement('li');
      li.textContent = m;

      // When suggestion is clicked → fill input and scroll to item
      li.onclick = () => {
        searchBox.value = m;
        suggestions.hidden = true;

        // Highlight and scroll to the matching item on the page
        const item = [...document.querySelectorAll('.item .title')]
          .find(el => el.textContent.includes(m));
        if (item) {
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
          item.style.border = '2px solid var(--accent-color)';
          setTimeout(() => item.style.border = '', 2000);
        }
      };
      suggestions.appendChild(li);
    });

    // Hide suggestion box if there are no matches
    suggestions.hidden = matched.length === 0;
  });

  // Hide suggestion box when clicking outside the search area
  document.addEventListener('click', (e) => {
    if (!suggestions.contains(e.target) && e.target !== searchBox) {
      suggestions.hidden = true;
    }
  });
});


// ====== Step 1 Form Validation (Name, Phone, Email) ======
function validateStep1() {
  let valid = true;
  const nameEl = document.getElementById('custName');
  const phoneEl = document.getElementById('phone');
  const emailEl = document.getElementById('email');

  // Clear any previous validation errors
  [nameEl, phoneEl, emailEl].forEach(el => {
    el.classList.remove('error');
    const errEl = document.getElementById(el.id + 'Err');
    if (errEl) errEl.textContent = '';
  });

  // Define regex patterns for validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d+$/; // Accepts digits of any length

  // Validate name field
  if (!nameEl.value.trim()) {
    showErrorField(nameEl, isEN ? "Please enter your name." : "الرجاء إدخال الاسم.");
    valid = false;
  }

  // Validate phone field (must contain digits only)
  if (!phoneEl.value.trim()) {
    showErrorField(phoneEl, isEN ? "Please enter phone number." : "الرجاء إدخال رقم الجوال.");
    valid = false;
  } else if (!phonePattern.test(phoneEl.value.trim())) {
    showErrorField(phoneEl, isEN ? "Please enter digits only." : "الرجاء إدخال أرقام فقط.");
  }

  // Validate email field format
  if (!emailEl.value.trim()) {
    showErrorField(emailEl, isEN ? "Please enter email." : "الرجاء إدخال البريد الإلكتروني.");
    valid = false;
  } else if (!emailPattern.test(emailEl.value.trim())) {
    showErrorField(emailEl, isEN ? "Please enter a valid email." : "الرجاء إدخال بريد إلكتروني صحيح.");
    valid = false;
  }

  return valid;
}

// ====== Display Validation Error Below Each Input ======
function showErrorField(inputEl, msg) {
  inputEl.classList.add('error'); // Highlight invalid input
  const errEl = document.getElementById(inputEl.id + 'Err');
  if (errEl) errEl.textContent = msg; // Show specific message
}

// ====== Trigger Validation When Continue Button is Clicked ======
document.getElementById('continueBtn').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default form submission
  if (validateStep1()) {
    nextStep(2); // Move to the payment step if validation passes
  }
});
