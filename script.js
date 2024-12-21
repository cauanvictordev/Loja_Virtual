document.addEventListener("DOMContentLoaded", () => {
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const cartContainer = document.getElementById('cart-container');

  cartContainer.style.marginTop = `${navbarHeight + 70}px`; // Adiciona mais 50px (20px + 50px)
  cartContainer.style.position = "absolute";
  cartContainer.style.top = "calc(50% + 50px)"; // Move 50px mais para baixo
  cartContainer.style.left = "50%";
  cartContainer.style.transform = "translate(-50%, -50%)";
});



















// Função para formatar preços
function formatPrice(price) {
  return `R$${parseFloat(price).toFixed(2).replace('.', ',')}`;
}

// Função para adicionar produto ao carrinho
function addToCart(productId, productName, productPrice, productImage) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Verifica se o produto já está no carrinho
  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
      existingProduct.quantity += 1; // Incrementa a quantidade
  } else {
      cart.push({
          id: productId,
          name: productName,
          price: parseFloat(productPrice.replace('R$', '').replace(',', '.')), // Converte o preço para número
          image: productImage,
          quantity: 1,
      });
  }

  // Atualiza o carrinho no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Exibe notificação
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

      addToCart(productId, productName, productPrice, productImage);
  });
});

// Estilização para notificação
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


























const feedbacks = [
  { name: 'Carlos Santos', position: 'Empresário', feedback: 'A experiência de compra na Rymo é maravilhosa! Desde o atendimento até a entrega, tudo funciona perfeitamente. As roupas são estilosas e caem super bem para diversas ocasiões. Com certeza voltarei a comprar!', photo: 'Carlos Santos.jpg' },
  { name: 'Mariana Costa', position: 'Influencer', feedback: 'Sempre que preciso de roupas novas e modernas, eu corro para a Rymo. A variedade é incrível, e eu sempre saio satisfeita. A coleção nova me impressionou demais, com peças que misturam conforto e elegância.', photo: 'Mariana Costa.jpg' },
  { name: 'Fernando Lima', position: 'Designer', feedback: 'A Rymo é sinônimo de qualidade e sofisticação. Cada peça que compro me surpreende mais, tanto pelo design quanto pela durabilidade. Eles realmente sabem o que fazem, e por isso sou cliente há anos.', photo: 'Fernando Lima.jpg' },
  { name: 'Juliana Pereira', position: 'Estilista', feedback: 'Se você busca moda e inovação, a Rymo é o lugar certo. As roupas são incríveis, feitas com muito cuidado nos detalhes e sempre acompanhando as tendências do mercado. Recomendo sem pensar duas vezes.', photo: 'Juliana Pereira.jpg' }
];

let index = 0;
function updateFeedback() {
  const feedback = feedbacks[index];
  document.getElementById('name').innerHTML = `${feedback.name}`;
  document.getElementById('position').innerHTML = `${feedback.position}`;
  document.getElementById('feedback').innerHTML = `&ldquo;${feedback.feedback}&rdquo;`;
  document.getElementById('photo').src = feedback.photo;
  document.getElementById('photo').alt = feedback.name;
  index = (index + 1) % feedbacks.length;
}

setInterval(updateFeedback, 10000);












let currentFeedback = 0;

function updateFeedback() {
  document.getElementById('client-name').textContent = feedbacks[currentFeedback].name;
  document.getElementById('feedback-text').textContent = feedbacks[currentFeedback].text;
  document.querySelector('.hearts').textContent = feedbacks[currentFeedback].hearts;
  document.querySelector('.avatar').textContent = feedbacks[currentFeedback].avatar;
}

function nextFeedback() {
  currentFeedback = (currentFeedback + 1) % feedbacks.length;
  updateFeedback();
}

// Configura o carrossel de feedbacks para alternar a cada 30 segundos
setInterval(nextFeedback, 30000);
updateFeedback();

// Carrossel de imagens
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;
const carouselImages = document.querySelector('.carousel-images');
let autoScroll;

function moveToNextImage() {
  currentIndex = (currentIndex + 1) % totalImages;
  carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Inicia a rotação automática do carrossel de imagens
function startAutoScroll() {
  autoScroll = setInterval(moveToNextImage, 8000); // 8 segundos entre as transições
}

// Pausa a rotação automática
function stopAutoScroll() {
  clearInterval(autoScroll);
}

// Inicia a rotação automática ao carregar
startAutoScroll();

// Pausa e reinicia a rotação automática ao interagir com o carrossel
const carouselContainer = document.querySelector('.carousel');
carouselContainer.addEventListener('mouseover', stopAutoScroll);
carouselContainer.addEventListener('mouseout', startAutoScroll);

// Navegação manual
document.querySelector('.prev-btn').addEventListener('click', () => {
  stopAutoScroll(); // Pausa ao clicar
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
});

document.querySelector('.next-btn').addEventListener('click', () => {
  stopAutoScroll(); // Pausa ao clicar
  moveToNextImage();
});
















/* BARRA DE PESQUISA  */


const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');

searchIcon.addEventListener('click', () => {
  if (searchBar.style.width === '300px') {
    searchBar.style.width = '0';
  } else {
    searchBar.style.width = '300px';
  }
});