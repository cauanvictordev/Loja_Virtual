

document.addEventListener("DOMContentLoaded", () => {
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  document.getElementById('cart-container').style.marginTop = `${navbarHeight + 20}px`;
});










/* =========================
RECEBENDO O ID DOS PRODUTOS
============================ */
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual

  // Recupera os itens do carrinho do localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  // Verifica se o carrinho está vazio
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <tr>
        <td colspan="4" class="empty-cart-message">Sua sacola está vazia</td>
      </tr>
    `;
    document.getElementById('total-price').textContent = 'R$0,00';
    document.getElementById('subtotal').textContent = 'R$0,00';
    return;
  }

  // Renderiza os itens no carrinho
  cart.forEach((item, index) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    const itemTotal = price * quantity;
    total += itemTotal;

    const itemRow = document.createElement('tr');

    itemRow.innerHTML = `
      <td class="product-details">
        <img src="${item.image}" alt="${item.name}" class="cart-img" width="50">
        <span class="product-name">${item.name || "Item sem nome"}</span>
      </td>
      <td class="quantity">
        <div class="quantity-controls">
          <button onclick="changeQuantity(${index}, -1)">-</button>
          <span>${quantity}</span>
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>
      </td>
      <td class="item-total">R$${itemTotal.toFixed(2).replace('.', ',')}</td>
      <td><button onclick="removeItem(${index})">Remover</button></td>
    `;

    cartItemsContainer.appendChild(itemRow);
  });

  // Atualiza o preço total no carrinho
  const totalPriceText = `R$${total.toFixed(2).replace('.', ',')}`;
  document.getElementById('total-price').textContent = totalPriceText;
  document.getElementById('subtotal').textContent = totalPriceText; // Subtotal igual ao total geral
}

// Função para alterar a quantidade de um item no carrinho
function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart[index].quantity = (parseInt(cart[index].quantity) || 1) + delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

// Função para remover um item do carrinho
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

// Função inicial para configurar o carrinho
function initializeCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCart();
}

// Inicializa o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', initializeCart);





























//================================
//    Aplicar cupom de desconto
//================================

// Aplicar cupom de desconto
document.getElementById('apply-coupon').addEventListener('click', function () {
  const couponCode = document.getElementById('coupon-code').value.trim();
  const subtotalElement = document.getElementById('total-price');
  const freteElement = document.getElementById('frete');
  const totalElement = document.getElementById('total');
  const couponMessage = document.getElementById('coupon-message');

  const subtotal = parseFloat(subtotalElement.textContent.replace('R$', '').replace(',', '.'));
  const frete = parseFloat(freteElement.textContent.replace('R$', '').replace(',', '.'));

  let discount = 0;

  if (couponCode === 'DESCONTO10') {
    discount = subtotal * 0.10;
    couponMessage.textContent = 'Cupom aplicado com sucesso! Desconto de 10%.';
  } else if (couponCode === 'FRETEGRATIS') {
    discount = frete;
    couponMessage.textContent = 'Cupom aplicado com sucesso! Frete grátis.';
  } else {
    couponMessage.style.color = 'red';
    couponMessage.textContent = 'Cupom inválido!';
    return;
  }

  couponMessage.style.color = 'green';

  const newTotal = subtotal + frete - discount;
  totalElement.textContent = `R$ ${newTotal.toFixed(2).replace('.', ',')}`;
});






//===================================
//   Calcular o frete com base no CEP
//===================================

document.getElementById('calculate-freight').addEventListener('click', function () {
  const cepInput = document.getElementById('cep-input').value.trim();
  const freteElement = document.getElementById('frete');
  const totalElement = document.getElementById('total');
  const subtotal = parseFloat(document.getElementById('total-price').textContent.replace('R$', '').replace(',', '.'));

  // Validação do CEP (formato: 00000-000 ou 00000000)
  if (!/^\d{5}-?\d{3}$/.test(cepInput)) {
    freteElement.textContent = 'R$ 0,00';
    alert('Por favor, insira um CEP válido.');
    return;
  }

  // CEP da loja
  const lojaCep = '88056757';

  try {
    // Calcula a distância aproximada entre os CEPs
    const distanciaKm = calcularDistanciaEntreCeps(lojaCep, cepInput);

    // Valor do frete fixo por km (mínimo de R$ 10,00)
    const fretePorKm = 2.00;
    let freightCost = distanciaKm * fretePorKm;
    if (freightCost < 10.00) {
      freightCost = 10.00; // Valor mínimo do frete
    }

    // Atualiza o elemento com o valor do frete
    freteElement.textContent = `R$ ${freightCost.toFixed(2).replace('.', ',')}`;

    const newTotal = subtotal + freightCost;
    totalElement.textContent = `R$ ${newTotal.toFixed(2).replace('.', ',')}`;
  } catch (error) {
    console.error('Erro ao calcular o frete:', error);
    alert('Erro ao calcular o frete. Tente novamente mais tarde.');
  }
});

// Função para calcular a distância aproximada entre dois CEPs
function calcularDistanciaEntreCeps(cep1, cep2) {
  const prefixo1 = parseInt(cep1.substring(0, 5));
  const prefixo2 = parseInt(cep2.substring(0, 5));

  // Diferença entre os prefixos dos CEPs
  const diferenca = Math.abs(prefixo1 - prefixo2);

  // Considera cada unidade de diferença como aproximadamente 1 km
  const distanciaKm = diferenca * 1; // 1 km por unidade de diferença

  return distanciaKm;
}




/*
Frete:
Aplicamos uma tarifa 
de R$ 2,00 por km.
Se o valor calculado for 
menor que R$ 10,00, aplicamos 
o valor mínimo de frete de R$ 10,00.


*/































//===================================
//    ENVIAR PEDIDO PARA O ZAP 
//===================================

// Função para processar o pedido ao clicar no botão "COMPRAR AGORA"
document.querySelector('.btn-success').addEventListener('click', function () {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    // Criar mensagem centralizada para sacola vazia
    const body = document.body;

    // Verificar se a mensagem já existe para evitar duplicação
    if (document.querySelector('.cart-empty-alert')) return;

    const emptyMessage = document.createElement('div');
    emptyMessage.classList.add('cart-empty-alert');
    emptyMessage.textContent = 'Sua sacola está vazia! Adicione produtos para finalizar sua compra.';

    // Adicionar mensagem ao body
    body.appendChild(emptyMessage);

    // Remover a mensagem automaticamente após 3 segundos
    setTimeout(() => {
      emptyMessage.remove();
    }, 3000);

    return;
  }

  // Montar o resumo do pedido
  const pedido = cart.map(item =>
    `Item: ${item.name || "Sem nome"} - Preço: R$${parseFloat(item.price).toFixed(2)} - Quantidade: ${parseInt(item.quantity)}`
  ).join('\n');

  const totalCompra = parseFloat(document.getElementById('total').textContent.replace('R$', '').replace(',', '.'));

  // Formatar mensagem para o WhatsApp
  const mensagem = encodeURIComponent(
    `Olá, gostaria de finalizar o pedido:\n\n${pedido}\n\nTotal: R$${totalCompra.toFixed(2).replace('.', ',')}`
  );

  // Abrir o WhatsApp com a mensagem do pedido
  const numeroWhatsApp = '75983178582';
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, '_blank');
});
