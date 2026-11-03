// FORNALHA — menu de demonstração e encomendas pelo WhatsApp.
// Troca o número de exemplo pelo contacto real: indicativo + número, só dígitos.
// Exemplo de Angola: 244923456789 (sem +, espaços ou traços).
const WHATSAPP_NUMBER = "244923456789"; // SUBSTITUI pelo número real da loja

const menuItems = [
  {
    id: 1, name: "Brasa & Massa Burger", category: "Hambúrguer", price: 6500,
    description: "Carne, queijo cheddar, alface e molho da casa.",
    image: "imagem/brasa&massaburger.png",
    label: "Mais pedido"
  },
  {
    id: 2, name: "Pizza Pepperoni", category: "Pizza", price: 9500,
    description: "Queijo derretido, pepperoni e molho especial.",
    image: "imagem/Pizzapeperoni.png",
    label: "Favorita"
  },
  {
    id: 3, name: "Batatas Crocantes", category: "Acompanhamento", price: 2500,
    description: "Douradas por fora, macias por dentro.",
    image: "imagem/batata.png",
    label: ""
  },
  {
    id: 4, name: "Pizza Margherita", category: "Pizza", price: 8000,
    description: "Tomate, mozzarella e manjericão fresco.",
    image: "imagem/pizademuzarela.png",
    label: ""
  },
  {
    id: 5, name: "Cheese Burger", category: "Hambúrguer", price: 5500,
    description: "Carne grelhada, cheddar e molho cremoso.",
    image: "imagem/choosebuerger.png",
    label: ""
  },
  {
    id: 6, name: "Anéis de Cebola", category: "Acompanhamento", price: 3000,
    description: "Crocantes e perfeitos para partilhar.",
    image: "imagem/cebolasfritas.png",
    label: ""
  },
  {
    id: 7, name: "Refrigerante", category: "Bebida", price: 1000,
    description: "Uma bebida fresca para acompanhar o teu pedido.",
    image: "imagem/coca-cola.png",
    label: ""
  },
  {
    id: 8, name: "Pizza da Casa", category: "Pizza", price: 11000,
    description: "Uma combinação generosa de sabores da casa.",
    image: "imagem/pizzamolho.png",
    label: "Especial"
  }
];

const menuGrid = document.querySelector("#menuGrid");
const filterButtons = document.querySelectorAll("[data-filter]");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

function formatPrice(price) {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0
  }).format(price);
}

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderMenu(filter = "Todos") {
  const items = filter === "Todos"
    ? menuItems
    : menuItems.filter(item => item.category === filter);

  menuGrid.innerHTML = items.map(item => `
    <article class="menu-card" data-order-id="${item.id}" >
      <div class="menu-card-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="menu-card-bottom">
        <span class="menu-price">${formatPrice(item.price)}</span>
        <span class="card-order" type="button" >Pedir agora</span>
      </div>
    </article>
    
  `).join("");
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderMenu(button.dataset.filter);
  });
});

menuGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-order-id]");
  if (!button) return;

  const item = menuItems.find(product => product.id === Number(button.dataset.orderId));
  if (!item) return;

  const message = `Olá! Gostaria de encomendar:\n\n${item.name}\nPreço anunciado: ${formatPrice(item.price)}\n\nPodem confirmar a disponibilidade e informar como faço o levantamento e pagamento?`;
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
});

const generalMessage = "Olá! Gostaria de consultar o menu e fazer uma encomenda para levantamento no estabelecimento.";
["contactOrder", "footerWhatsApp", "floatingOrder"].forEach(id => {
  const link = document.getElementById(id);
  if (link) link.href = whatsappLink(generalMessage);
});

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderMenu();
