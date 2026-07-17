const catalogCards=[...document.querySelectorAll('.catalog-card')];
const categoryButtons=[...document.querySelectorAll('.category-filter button')];
const priceRange=document.querySelector('#price-range');
const rangeOutput=document.querySelector('#range-output');
const countOutput=document.querySelector('#product-count');
const emptyMessage=document.querySelector('.catalog-empty');
let activeCategory='all';

const catalogViews={
  'new-arrivals':{title:'Fresh New Arrivals',category:'all',label:'Just landed at Giraastore'},
  'best-sellers':{title:'Most-Loved Best Sellers',category:'all',label:'Customer favourites'},
  sale:{title:'Sweet Deals & Sale',category:'all',label:'Cute finds for less'},
  stationery:{title:'Beautiful Stationery',category:'stationery',label:'Make every day creative'},
  notebooks:{title:'Notebooks & Journals',category:'stationery',label:'For ideas, plans and dreams'},
  pens:{title:'Pens & Writing Tools',category:'stationery',label:'Make every word beautiful'},
  stickers:{title:'Cute Stickers',category:'stationery',label:'Decorate your everyday'},
  'washi-tape':{title:'Washi Tape Collection',category:'stationery',label:'Add a little colour'},
  'pencil-cases':{title:'Pencil Cases',category:'bags',label:'Keep your desk essentials close'},
  highlighters:{title:'Pastel Highlighters',category:'stationery',label:'Highlight happy ideas'},
  gifts:{title:'Thoughtful Gifts',category:'gifts',label:'Made for special moments'},
  'gift-sets':{title:'Curated Gift Sets',category:'gifts',label:'Ready to make someone smile'},
  'birthday-gifts':{title:'Birthday Gifts',category:'gifts',label:'Celebrate their special day'},
  'return-gifts':{title:'Return Gifts',category:'gifts',label:'Little gifts, big smiles'},
  'gift-boxes':{title:'Beautiful Gift Boxes',category:'gifts',label:'Packed with love'},
  lifestyle:{title:'Cute Lifestyle Finds',category:'lifestyle',label:'Beauty for your everyday'},
  drinkware:{title:'Drinkware',category:'lifestyle',label:'Sip in a cuter way'},
  'home-decor':{title:'Home Décor',category:'lifestyle',label:'Make your space feel special'},
  'desk-setup':{title:'Dream Desk Setup',category:'lifestyle',label:'Create your happy workspace'},
  organizers:{title:'Organizers',category:'lifestyle',label:'A lovely place for everything'},
  accessories:{title:'Everyday Accessories',category:'all',label:'Cute details you will love'},
  'tote-bags':{title:'Tote Bags',category:'bags',label:'Carry cute everywhere'},
  pouches:{title:'Bags & Pouches',category:'bags',label:'Keep favourites together'},
  keychains:{title:'Cute Keychains',category:'accessories',label:'A little joy on the go'},
  'phone-accessories':{title:'Phone Accessories',category:'accessories',label:'Dress up your everyday tech'},
  toys:{title:'Plush & Toys',category:'gifts',label:'Soft, cute and lovable'},
  jewellery:{title:'Jewellery Collection',category:'all',label:'A little sparkle for you'}
};

const requestedView=new URLSearchParams(location.search).get('view');
if(requestedView&&catalogViews[requestedView]){
  const view=catalogViews[requestedView];
  activeCategory=view.category;
  document.querySelector('.catalog-banner h1').innerHTML=view.title;
  document.querySelector('.catalog-banner small').textContent=view.label;
  document.title=`${view.title} | Giraastore`;
  categoryButtons.forEach(button=>button.classList.toggle('active',button.dataset.category===activeCategory));
}

if(['accessories','jewellery'].includes(requestedView)){
  document.body.classList.add('accessories-catalog');
  const catalogPage=document.querySelector('.catalog-page');
  catalogPage.insertAdjacentHTML('afterbegin',`<nav class="accessory-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>›</span><a href="shop.html">Shop</a><span>›</span><strong>${requestedView==='jewellery'?'Jewellery':'Accessories'}</strong></nav><section class="accessory-hero"><div class="accessory-hero__copy"><small>Giraastore Essentials</small><h1>${requestedView==='jewellery'?'Timeless<br>Jewellery':'Everyday<br>Accessories'}</h1><i></i><p>Cute details. Beautifully yours.</p><div class="accessory-features"><span>♢<b>Premium Quality</b></span><span>♡<b>Skin Friendly</b></span><span>☼<b>Everyday Style</b></span><span>✦<b>Made to Last</b></span></div></div></section><div class="accessory-intro">Our accessories are thoughtfully selected to stay beautiful through every little moment.<br>Made for everyday styling, gifting and adding a touch of joy to your look.</div>`);
  catalogPage.insertAdjacentHTML('beforeend',`<section class="accessory-quality" aria-label="Accessory benefits"><article><i>♡</i><div><strong>Skin Friendly</strong><small>Comfortable everyday wear</small></div></article><article><i>☼</i><div><strong>Premium Quality</strong><small>Carefully selected materials</small></div></article><article><i>♢</i><div><strong>Made to Last</strong><small>Designed for daily styling</small></div></article><article><i>♙</i><div><strong>Perfect Gift</strong><small>For yourself or loved ones</small></div></article></section>`);
}

function updateCatalog(){
  const maxPrice=Number(priceRange?.value||1000);
  const checked=[...document.querySelectorAll('.stock-filter:checked')].map(input=>input.value);
  let visible=0;
  catalogCards.forEach(card=>{
    const categoryMatch=activeCategory==='all'||card.dataset.category===activeCategory;
    const priceMatch=Number(card.dataset.price)<=maxPrice;
    const stockMatch=!checked.length||checked.includes(card.dataset.stock);
    card.hidden=!(categoryMatch&&priceMatch&&stockMatch);
    if(!card.hidden)visible++;
  });
  countOutput.textContent=visible;
  emptyMessage.hidden=visible!==0;
}

categoryButtons.forEach(button=>button.addEventListener('click',()=>{
  categoryButtons.forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  activeCategory=button.dataset.category;
  updateCatalog();
}));
priceRange?.addEventListener('input',()=>{rangeOutput.textContent=`₹${priceRange.value}`;updateCatalog()});
document.querySelectorAll('.stock-filter').forEach(input=>input.addEventListener('change',updateCatalog));

function sortCatalog(value){
  const cards=[...catalogCards];
  if(value==='low')cards.sort((a,b)=>a.dataset.price-b.dataset.price);
  if(value==='high')cards.sort((a,b)=>b.dataset.price-a.dataset.price);
  if(value==='name')cards.sort((a,b)=>a.querySelector('h2').textContent.localeCompare(b.querySelector('h2').textContent));
  cards.forEach(card=>card.parentElement.append(card));
}
document.querySelectorAll('#shop-sort,#mobile-sort').forEach(select=>select.addEventListener('change',()=>sortCatalog(select.value)));

const sidebar=document.querySelector('.catalog-sidebar');
const filterToggle=document.querySelector('.mobile-filter-toggle');
filterToggle?.addEventListener('click',()=>{sidebar.classList.add('open');filterToggle.setAttribute('aria-expanded','true')});
document.querySelector('.filter-close')?.addEventListener('click',()=>{sidebar.classList.remove('open');filterToggle.setAttribute('aria-expanded','false')});

document.querySelectorAll('.catalog-card__image button').forEach(button=>button.addEventListener('click',event=>{
  event.preventDefault();
  event.stopPropagation();
}));

updateCatalog();
