(() => {
  document.querySelectorAll('.marquee__track').forEach(track => {
    const firstGroup = track.querySelector('.marquee__group');
    if (!firstGroup) return;
    const groupWidth = firstGroup.getBoundingClientRect().width;
    const viewportWidth = track.parentElement.getBoundingClientRect().width;
    while (track.scrollWidth < viewportWidth + (groupWidth * 2)) {
      const clone = firstGroup.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }
    track.style.setProperty('--marquee-shift', `-${groupWidth}px`);
    track.classList.add('is-ready');
  });
  const products = {
    notebook:{name:"Cute Bear Spiral Notebook",price:199,image:"Assets/product3.png"},
    pens:{name:"Pastel Highlighter Set",price:349,image:"Assets/product2.png"},
    mug:{name:"Cute Ceramic Mug",price:399,image:"Assets/ChatGPT Image Jun 30, 2026 at 02_15_07 AM.png"},
    organizer:{name:"Pastel Desk Organizer",price:449,image:"Assets/jpg.jpeg"},
    journal:{name:"Dream Big Journal",price:349,image:"Assets/-9.jpg.jpeg"},
    keychain:{name:"Kawaii Bear Keychain",price:149,image:"Assets/-10.jpg.jpeg"}
  };
  let cart = JSON.parse(localStorage.getItem("giraa-cart") || "{}");
  document.body.insertAdjacentHTML("beforeend", `<div class="cart-overlay"></div><aside class="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart"><div class="cart-drawer__head"><h2>Your Cart <span aria-hidden="true">♡</span></h2><button class="cart-close" aria-label="Close cart">×</button></div><div class="cart-progress"></div><div class="cart-items"></div><div class="cart-drawer__foot"></div></aside><div class="toast" role="status"></div>`);
  const drawer=document.querySelector(".cart-drawer"), overlay=document.querySelector(".cart-overlay");
  const money=n=>`₹${n.toLocaleString("en-IN")}`;
  function save(){localStorage.setItem("giraa-cart",JSON.stringify(cart));render()}
  function render(){
    const entries=Object.entries(cart).filter(([,q])=>q>0), count=entries.reduce((n,[,q])=>n+q,0), total=entries.reduce((n,[id,q])=>n+products[id].price*q,0);
    document.querySelectorAll(".cart-count").forEach(el=>el.textContent=count);
    const remain=Math.max(0,499-total);
    document.querySelector(".cart-progress").innerHTML=`<div>${remain?`Add <b>${money(remain)}</b> more for free shipping!`:`<b>Yay! You unlocked free shipping.</b>`}</div><div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,total/499*100)}%"></div></div>`;
    document.querySelector(".cart-items").innerHTML=entries.length?entries.map(([id,q])=>`<article class="drawer-item"><img src="${products[id].image}" alt="${products[id].name}"><div><h3>${products[id].name}</h3><p>${money(products[id].price)}</p><div class="mini-qty"><button data-cart-minus="${id}" aria-label="Decrease">−</button><span>${q}</span><button data-cart-plus="${id}" aria-label="Increase">+</button></div></div><button class="remove-item" data-cart-remove="${id}" aria-label="Remove">×</button></article>`).join(""):`<div class="cart-empty"><span>🛍️</span><strong>Your cart is waiting for something cute</strong><br><a href="shop.html">Start shopping</a></div>`;
    document.querySelector(".cart-drawer__foot").innerHTML=entries.length?`<div class="cart-totals"><span>Subtotal</span><span>${money(total)}</span></div><p class="cart-note">Taxes included. Shipping calculated at checkout.</p><a class="cart-checkout" href="contact.html">Checkout securely →</a><a class="cart-view" href="shop.html">Continue shopping</a>`:"";
  }
  function open(){drawer.classList.add("open");overlay.classList.add("open");document.body.style.overflow="hidden"}
  function close(){drawer.classList.remove("open");overlay.classList.remove("open");document.body.style.overflow=""}
  function add(id,qty=1){if(!products[id])id="notebook";cart[id]=(cart[id]||0)+qty;save();open();const t=document.querySelector(".toast");t.textContent="Added to your cart ♡";t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1700)}
  document.addEventListener("click",e=>{const cartBtn=e.target.closest(".cart-action");if(cartBtn){e.preventDefault();open()} if(e.target.closest(".cart-close")||e.target===overlay)close();const addBtn=e.target.closest("[data-add-cart],.add-cart");if(addBtn){e.preventDefault();add(addBtn.dataset.addCart||"notebook",Number(addBtn.dataset.quantity||document.querySelector("#quantity")?.textContent||1))} const plus=e.target.closest("[data-cart-plus]"),minus=e.target.closest("[data-cart-minus]"),remove=e.target.closest("[data-cart-remove]");if(plus){cart[plus.dataset.cartPlus]++;save()}if(minus){cart[minus.dataset.cartMinus]--;save()}if(remove){delete cart[remove.dataset.cartRemove];save()}});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
  window.GiraaCart={add,open}; render();
  const routes={"Contact Us":"contact.html","FAQ":"faq.html","FAQ’s":"faq.html","Shipping Policy":"shipping-policy.html","Return & Refund Policy":"return-policy.html","Terms & Conditions":"terms.html","Privacy Policy":"privacy-policy.html","All Products":"shop.html"};
  document.querySelectorAll("a").forEach(link=>{const label=link.textContent.trim();if(routes[label])link.href=routes[label]});
  document.querySelectorAll('.wishlist-action').forEach(button=>button.addEventListener('click',()=>location.href='wishlist.html'));
  document.querySelectorAll('a[href^="tel:"]').forEach(link=>{if(link.closest('footer')){link.href='tel:+918424913989';link.textContent='+91 84249 13989'}});
  const socialMarkup=`<a href="https://www.instagram.com/reel/DZ5JCxYhJnP/?igsh=MWVndHQ2cnljNnJ5bA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg></a><a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z"/></svg></a><a href="#" aria-label="Pinterest"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 18 12 8.5c.5-1.8 3.5-1 2.8 1.5-.7 2.6-3.4 2.4-3.9.8-.8-2.4 1-4.5 3.2-4.5 3 0 4.6 2.2 4.1 4.8-.5 3-2.7 5.2-5.4 4.6"/></svg></a><a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="4"/><path d="m10 9 5 3-5 3Z"/></svg></a>`;
  document.querySelectorAll('.footer-socials,.socials').forEach(group=>group.innerHTML=socialMarkup);
  document.querySelectorAll('.main-nav').forEach(nav=>{
    const direct=[...nav.children];
    const findLink=label=>direct.find(el=>el.matches('a')&&el.textContent.trim()===label);
    const ordered=[findLink('Home'),findLink('About Us'),nav.querySelector(':scope > .shop-nav'),findLink('New Arrivals'),findLink('Best Sellers'),nav.querySelector(':scope > .collections-nav'),findLink('Contact Us')].filter(Boolean);
    ordered.forEach(item=>nav.appendChild(item));
  });
})();
