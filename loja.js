function loadCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<tr><td colspan="4">Seu carrinho está vazio.</td></tr>';
    return;
  }

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.category}</td>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td><button onclick="removeFromCart(${index})">Remover</button></td>
    `;
    cartItems.appendChild(row);
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Carregar o carrinho quando a página for carregada
window.onload = loadCart;










































// Função para formatar preços
function formatPrice(price) {
  return `R$${parseFloat(price).toFixed(2).replace('.', ',')}`;
}

// Função para adicionar produto ao carrinho
function addToCart(productId, productName, productPrice, productImage) {
  // Recupera o carrinho do localStorage ou inicia um novo
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Verifica se o produto já está no carrinho
  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
      // Incrementa a quantidade do produto já existente
      existingProduct.quantity += 1;
  } else {
      // Adiciona um novo produto ao carrinho
      const product = {
          id: productId,
          name: productName,
          price: parseFloat(productPrice.replace('R$', '').replace(',', '.')), // Converte o preço para número
          image: productImage,
          quantity: 1,
      };
      cart.push(product);
  }

  // Atualiza o carrinho no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Feedback visual ao usuário
  showNotification('Produto adicionado ao carrinho!');
}

// Função para exibir notificação
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
      notification.remove();
  }, 3000);
}

// Inicializa os botões "Adicionar ao Carrinho"
document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', function () {
      const productElement = button.closest('.product');
      const productId = productElement.getAttribute('data-id');
      const productName = productElement.querySelector('.p-name').textContent;
      const productPrice = productElement.querySelector('.p-price').textContent;
      const productImage = productElement.querySelector('img').getAttribute('src');

      // Adiciona o produto ao carrinho
      addToCart(productId, productName, productPrice, productImage);
  });
});

// Estilização básica para notificações (opcional)
const style = document.createElement('style');
style.textContent = `
  .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      animation: fadeInOut 3s ease-in-out;
  }
  @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(20px); }
      10%, 90% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(20px); }
  }
`;
document.head.appendChild(style);
