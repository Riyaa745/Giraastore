(() => {
  const products = {
    notebook: { name: "Cute Bear Spiral Notebook", price: 199, image: "Assets/product3.png" },
    pens: { name: "Pastel Highlighter Set", price: 349, image: "Assets/product2.png" },
    mug: { name: "Cute Ceramic Mug", price: 399, image: "Assets/ChatGPT Image Jun 30, 2026 at 02_15_07 AM.png" },
    organizer: { name: "Pastel Desk Organizer", price: 449, image: "Assets/jpg.jpeg" },
    journal: { name: "Dream Big Journal", price: 349, image: "Assets/-9.jpg.jpeg" },
    keychain: { name: "Kawaii Bear Keychain", price: 149, image: "Assets/-10.jpg.jpeg" }
  };
  let cart = JSON.parse(localStorage.getItem("giraa-cart") || "{}");
  const money = value => `₹${value.toLocaleString("en-IN")}`;
  const chevron = '<svg class="nav-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 10 4 4 4-4"/></svg>';
  const accessoriesMarkup = `
    <div class="mega-heading">Accessories</div>
    <div class="submenu-item accessory-group"><button class="submenu-trigger" type="button" aria-expanded="false"><span>💍 Jewellery <small>Anti-Tarnish</small></span>${chevron}</button><div class="submenu-panel"><a href="shop.html">Necklaces</a><a href="shop.html">Earrings</a><a href="shop.html">Rings</a><a href="shop.html">Bracelets</a><a href="shop.html">Anklets</a></div></div>
    <div class="submenu-item accessory-group"><button class="submenu-trigger" type="button" aria-expanded="false"><span>🎀 Hair Essentials</span>${chevron}</button><div class="submenu-panel"><a href="shop.html">Hair Clips</a><a href="shop.html">Claw Clips</a><a href="shop.html">Hair Bands</a><a href="shop.html">Scrunchies</a><a href="shop.html">Keychains</a></div></div>
    <div class="submenu-item accessory-group"><button class="submenu-trigger" type="button" aria-expanded="false"><span>Phone Accessories</span>${chevron}</button><div class="submenu-panel"><a href="shop.html">Phone Charms</a><a href="shop.html">Pop Sockets</a><a href="shop.html">Charging Cables</a><a href="shop.html">Screen Protectors</a><a href="shop.html">Phone Stands</a></div></div>
    <div class="submenu-item accessory-group"><button class="submenu-trigger" type="button" aria-expanded="false"><span>👜 Bags</span>${chevron}</button><div class="submenu-panel"><a href="shop.html">Tote Bags</a><a href="shop.html">Pouches</a><a href="shop.html">Mini Bags</a><span>Laptop Sleeves <small>(future)</small></span></div></div>`;

  const entries = () => Object.entries(cart).filter(([id, quantity]) => products[id] && quantity > 0);
  function save() {
    localStorage.setItem("giraa-cart", JSON.stringify(cart));
    render();
  }
  function render() {
    const current = entries();
    const count = current.reduce((sum, [, quantity]) => sum + quantity, 0);
    const subtotal = current.reduce((sum, [id, quantity]) => sum + products[id].price * quantity, 0);
    document.querySelectorAll(".cart-count").forEach(node => { node.textContent = count; });
    const list = document.querySelector(".cart-page__items");
    if (!list) return;
    list.innerHTML = current.length ? current.map(([id, quantity]) => `
      <article class="cart-page__item"><img src="${products[id].image}" alt="${products[id].name}">
      <div class="cart-page__details"><h2>${products[id].name}</h2><p>${money(products[id].price)}</p>
      <div class="cart-page__quantity"><button data-cart-minus="${id}">−</button><span>${quantity}</span><button data-cart-plus="${id}">+</button></div></div>
      <strong>${money(products[id].price * quantity)}</strong><button class="cart-page__remove" data-cart-remove="${id}">Remove</button></article>`).join("")
      : '<div class="cart-page__empty"><span>♡</span><h2>Your cart is empty</h2><p>Add something cute and it will appear here.</p><a href="shop.html">Start shopping</a></div>';
    document.querySelector(".cart-page__summary")?.classList.toggle("is-empty", !current.length);
    const subtotalNode = document.querySelector("[data-cart-subtotal]");
    if (subtotalNode) subtotalNode.textContent = money(subtotal);
    const remaining = Math.max(0, 499 - subtotal);
    const copy = document.querySelector("[data-shipping-copy]");
    if (copy) copy.innerHTML = remaining ? `Add <strong>${money(remaining)}</strong> more for free shipping.` : "<strong>Yay! You unlocked free shipping.</strong>";
    const progress = document.querySelector("[data-shipping-progress]");
    if (progress) progress.style.width = `${Math.min(100, subtotal / 499 * 100)}%`;
  }

  document.querySelectorAll(".main-nav").forEach(nav => {
    [...nav.querySelectorAll(".shop-nav .submenu-item")].find(item =>
      item.querySelector(".submenu-trigger")?.textContent.includes("Accessories")
    )?.remove();
    const collections = nav.querySelector(".collections-nav") ||
      [...nav.children].find(node => node.matches("a") && node.textContent.trim() === "Collections");
    let accessories = nav.querySelector(".accessories-nav");
    if (!accessories && collections) {
      accessories = document.createElement("div");
      accessories.className = "nav-item has-dropdown accessories-nav";
      accessories.innerHTML = `<button class="nav-trigger" type="button" aria-expanded="false">Accessories ${chevron}</button><div class="dropdown-panel accessories-menu"></div>`;
      collections.replaceWith(accessories);
    }
    accessories?.querySelector(".accessories-menu")?.replaceChildren();
    accessories?.querySelector(".accessories-menu")?.insertAdjacentHTML("afterbegin", accessoriesMarkup);

    const direct = [...nav.children];
    const link = label => direct.find(node => node.matches("a") && node.textContent.trim() === label);
    [link("Home"), link("About Us"), nav.querySelector(":scope>.shop-nav"), link("New Arrivals"), link("Best Sellers"), accessories, link("Contact Us")]
      .filter(Boolean).forEach(node => nav.appendChild(node));
  });

  document.querySelectorAll(".marquee__track").forEach(track => {
    const first = track.querySelector(".marquee__group");
    if (!first) return;
    [...track.querySelectorAll(".marquee__group")].slice(1).forEach(group => group.remove());
    const width = first.getBoundingClientRect().width;
    const copies = Math.max(2, Math.ceil(track.parentElement.getBoundingClientRect().width / width) + 2);
    for (let index = 1; index < copies; index += 1) {
      const clone = first.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    }
    track.style.setProperty("--marquee-shift", `-${width}px`);
    track.classList.add("is-ready");
  });

  document.addEventListener("click", event => {
    const cartButton = event.target.closest(".cart-action");
    if (cartButton) { event.preventDefault(); location.href = "cart.html"; return; }
    const addButton = event.target.closest("[data-add-cart],.add-cart");
    if (addButton) {
      event.preventDefault();
      const id = products[addButton.dataset.addCart] ? addButton.dataset.addCart : "notebook";
      const quantity = Number(addButton.dataset.quantity || document.querySelector("#quantity")?.textContent || 1);
      cart[id] = (cart[id] || 0) + quantity;
      save();
      location.href = "cart.html";
      return;
    }
    const plus = event.target.closest("[data-cart-plus]");
    const minus = event.target.closest("[data-cart-minus]");
    const remove = event.target.closest("[data-cart-remove]");
    if (plus) { cart[plus.dataset.cartPlus] = (cart[plus.dataset.cartPlus] || 0) + 1; save(); }
    if (minus) { cart[minus.dataset.cartMinus] = Math.max(0, (cart[minus.dataset.cartMinus] || 0) - 1); save(); }
    if (remove) { delete cart[remove.dataset.cartRemove]; save(); }
  });

  document.querySelectorAll(".accessories-menu .submenu-trigger").forEach(trigger => {
    trigger.addEventListener("click", event => {
      event.stopPropagation();
      const item = trigger.closest(".submenu-item");
      const open = !item.classList.contains("submenu-open");
      item.parentElement.querySelectorAll(".submenu-item").forEach(other => other.classList.remove("submenu-open"));
      item.classList.toggle("submenu-open", open);
      trigger.setAttribute("aria-expanded", String(open));
    });
  });
  document.querySelectorAll(".wishlist-action").forEach(button => button.addEventListener("click", () => { location.href = "wishlist.html"; }));
  render();
})();
