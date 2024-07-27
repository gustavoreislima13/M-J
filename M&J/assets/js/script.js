'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElemArr = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}



/**
 * add active class on header when scrolled 200px from top
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 200 ? header.classList.add("active")
    : header.classList.remove("active");
})

  document.addEventListener('DOMContentLoaded', () => {
    // Função para abrir a imagem em uma nova aba
    function viewImage(imageSrc) {
      window.open(imageSrc, '_blank');
    }

    // Função para adicionar ao carrinho e atualizar o contador
    function addToCart() {
      const cartBadge = document.querySelector('.header-action-btn .btn-badge.green');
      let itemCount = parseInt(cartBadge.textContent);

      // Incrementa o número de itens
      itemCount += 1;

      // Atualiza o número de itens no carrinho
      cartBadge.textContent = itemCount;
    }

    // Função para adicionar à lista de desejos e atualizar o contador
    function addToWishlist() {
      const wishlistBadge = document.querySelector('.header-action-btn .btn-badge:not(.green)');
      let itemCount = parseInt(wishlistBadge.textContent);

      // Incrementa o número de itens
      itemCount += 1;

      // Atualiza o número de itens na lista de desejos
      wishlistBadge.textContent = itemCount;
    }

    // Adiciona event listeners aos botões de visualização rápida
    document.querySelectorAll('.view-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const imageSrc = document.querySelectorAll('.card-banner img')[index].src;
        viewImage(imageSrc);
      });
    });

    // Adiciona event listeners aos botões de adicionar ao carrinho
    document.querySelectorAll('.cart-btn').forEach(btn => {
      btn.addEventListener('click', addToCart);
    });

    // Adiciona event listeners aos botões de adicionar à lista de desejos
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', addToWishlist);
    });
  });

  
  document.addEventListener('DOMContentLoaded', () => {
    function showNotification(message) {
      const notificationContainer = document.getElementById('notification-container');
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;

      notificationContainer.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000); // Remove a notificação após 3 segundos
    }

    function viewImage(imageSrc) {
      window.open(imageSrc, '_blank');
    }

    function addToCart() {
      const cartBadge = document.querySelector('.header-action-btn .btn-badge.green');
      let itemCount = parseInt(cartBadge.textContent);

      itemCount += 1;
      cartBadge.textContent = itemCount;

      showNotification('Item adicionado ao carrinho');
    }

    function addToWishlist() {
      const wishlistBadge = document.querySelector('.header-action-btn .btn-badge:not(.green)');
      let itemCount = parseInt(wishlistBadge.textContent);

      itemCount += 1;
      wishlistBadge.textContent = itemCount;

      showNotification('Item adicionado à lista de desejos');
    }

    document.querySelectorAll('.view-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const imageSrc = document.querySelectorAll('.card-banner img')[index].src;
        viewImage(imageSrc);
      });
    });

    document.querySelectorAll('.cart-btn').forEach(btn => {
      btn.addEventListener('click', addToCart);
    });

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', addToWishlist);
    });
  });

  
  document.addEventListener('DOMContentLoaded', () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const openCartBtn = document.getElementById('open-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsList = document.getElementById('cart-items-list');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartBadge = document.getElementById('cart-badge');
    let totalAmount = 0;
    let cartItems = {};

    function toggleCartSidebar() {
      cartSidebar.classList.toggle('open');
    }

    function updateCartTotal(price) {
      totalAmount += price;
      cartTotal.textContent = `R$${totalAmount.toFixed(2)}`;
    }

    function updateCartBadge() {
      const itemCount = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
      cartBadge.textContent = itemCount;
      cartBadge.style.display = itemCount > 0 ? 'block' : 'none';
    }

    function removeFromCart(event) {
      const button = event.currentTarget;
      const cartItemElement = button.closest('li');
      const productName = cartItemElement.getAttribute('data-name');
      const productPrice = cartItems[productName].price;

      cartItems[productName].quantity -= 1;
      if (cartItems[productName].quantity === 0) {
        delete cartItems[productName];
        cartItemElement.remove();
      } else {
        cartItemElement.querySelector('.item-quantity').textContent = `Quantidade: ${cartItems[productName].quantity}`;
      }

      totalAmount -= productPrice;
      cartTotal.textContent = `R$${totalAmount.toFixed(2)}`;

      if (Object.keys(cartItems).length === 0) {
        emptyCartMessage.style.display = 'block';
      }

      updateCartBadge();
    }

    function addToCart(event) {
      const button = event.currentTarget;
      const productCard = button.closest('.product-card');
      const productName = productCard.querySelector('.card-title a').textContent;
      const productImage = productCard.querySelector('.card-banner img').src;
      const productPrice = parseFloat(productCard.querySelector('.card-price data').value);

      if (!cartItems[productName]) {
        cartItems[productName] = {
          name: productName,
          image: productImage,
          price: productPrice,
          quantity: 0
        };
      }

      cartItems[productName].quantity += 1;

      const cartItemElement = document.querySelector(`#cart-items-list li[data-name="${productName}"]`);
      if (cartItemElement) {
        cartItemElement.querySelector('.item-quantity').textContent = `Quantidade: ${cartItems[productName].quantity}`;
      } else {
        const cartItem = document.createElement('li');
        cartItem.setAttribute('data-name', productName);
        cartItem.innerHTML = `
          <img src="${productImage}" alt="${productName}">
          <div>
            <p>${productName}</p>
            <p>R$${productPrice.toFixed(2)}</p>
            <p class="item-quantity">Quantidade: ${cartItems[productName].quantity}</p>
          </div>
          <button class="remove-item-btn" aria-label="Remover Item">&times;</button>
        `;
        cartItem.querySelector('.remove-item-btn').addEventListener('click', removeFromCart);
        cartItemsList.appendChild(cartItem);
      }

      updateCartTotal(productPrice);
      updateCartBadge();
      emptyCartMessage.style.display = 'none';
    }

    function addToWishlist() {
      const wishlistBadge = document.querySelector('.header-action-btn .btn-badge:not(.green)');
      let itemCount = parseInt(wishlistBadge.textContent);
      itemCount += 1;
      wishlistBadge.textContent = itemCount;

      showNotification('Item adicionado à lista de desejos');
    }

    document.querySelectorAll('.view-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const imageSrc = document.querySelectorAll('.card-banner img')[index].src;
        viewImage(imageSrc);
      });
    });

    document.querySelectorAll('.cart-btn').forEach(btn => {
      btn.addEventListener('click', addToCart);
    });

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', addToWishlist);
    });

    openCartBtn.addEventListener('click', toggleCartSidebar);
    closeCartBtn.addEventListener('click', toggleCartSidebar);
    checkoutBtn.addEventListener('click', () => {
      alert('Finalizando compra...');
      // Aqui você pode adicionar a lógica para finalizar a compra
    });
  });



