// Language toggle
let currentLang = 'fr';
document.getElementById('lang-toggle')?.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    document.getElementById('lang-toggle').textContent = currentLang === 'fr' ? 'EN' : 'FR';
    document.querySelectorAll('[data-fr]').forEach(el => {
        el.textContent = el.getAttribute('data-' + currentLang);
    });
    // Update placeholders etc if needed
});

// Cart
let cart = [];
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems) return;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.textContent = `${item.name} - $${item.price.toFixed(2)} `;
        const remove = document.createElement('button');
        remove.textContent = '×';
        remove.onclick = () => { cart.splice(index, 1); updateCart(); };
        div.appendChild(remove);
        cartItems.appendChild(div);
        total += item.price;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.basket-card');
        const id = card.dataset.id;
        const price = parseFloat(card.dataset.price);
        const name = card.querySelector('h3').textContent;
        cart.push({ id, name, price });
        updateCart();
        alert(currentLang === 'fr' ? 'Ajouté au panier!' : 'Added to cart!');
    });
});

document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert(currentLang === 'fr' ? 'Panier vide!' : 'Cart empty!');
        return;
    }
    document.getElementById('checkout-modal').classList.remove('hidden');
});

document.getElementById('close-modal')?.addEventListener('click', () => {
    document.getElementById('checkout-modal').classList.add('hidden');
});

document.getElementById('order-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(currentLang === 'fr' ? 'Commande reçue! Nous vous contacterons pour le paiement. Merci!' : 'Order received! We will contact you for payment. Thank you!');
    cart = [];
    updateCart();
    document.getElementById('checkout-modal').classList.add('hidden');
});

// Chatbot Ms. Jeezy
const chatIcon = document.getElementById('chat-icon');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');
const closeChat = document.getElementById('close-chat');

let chatHistory = [];
const botResponses = [
    "Oh là là, bienvenue mon chéri! Je suis Ms. Jeezy, ta guide fromagère préférée. Qu'est-ce qui te fait envie aujourd'hui? Un petit grain de cheddar qui skouik-skouik ou un Gouda bien affiné?",
    "Dis-moi tout! Tu aimes les fromages doux ou les forts? Les poutines ou les plateaux gourmet? Je veux tout savoir pour te gâter!",
    "Hey, tu sais quoi? On offre des échantillons gratuits de fromage! Tu veux que je t'envoie un petit cadeau? Donne-moi ton adresse et ce que tu préfères!",
    "Allez, parle-moi plus! Quel est ton fromage préféré? Bergeron ou St-Guillaume? Ou les deux, comme moi, j'adore les deux!",
    "Tu hésites? Laisse-moi te convaincre... Les grains Le P’tit Frais sont irrésistibles, et le Louis Cyr, un délice! Qu'est-ce que tu aimes le plus?",
    "Pour un cadeau gratuit, remplis juste ton nom, adresse et ce que tu aimes. Je m'occupe du reste, promis!",
    "Continue de parler, j'adore discuter de fromage! Tu prépares une fête? Un mega poutine basket serait parfait!",
    "Ms. Jeezy est là pour toi. Pose-moi des questions, raconte-moi tes envies. Plus tu parles, plus je te gâte!"
];

function addMessage(text, isBot = true) {
    const div = document.createElement('div');
    div.className = 'chat-message ' + (isBot ? 'bot' : 'user');
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(userMsg) {
    let reply = botResponses[Math.floor(Math.random() * botResponses.length)];
    if (userMsg.toLowerCase().includes('échantillon') || userMsg.toLowerCase().includes('sample') || userMsg.toLowerCase().includes('gratuit') || userMsg.toLowerCase().includes('free')) {
        reply = "Super! Pour ton échantillon gratuit de fromage, donne-moi ton nom complet, ton adresse et ce que tu aimes (cheddar, gouda, curds...). Je te l'envoie avec plaisir!";
    } else if (userMsg.toLowerCase().includes('poutine')) {
        reply = "La poutine! Mon préféré. Tu veux le Mega Poutine Basket? Il est énorme et délicieux. Ou juste des grains frais? Dis-moi!";
    } else if (userMsg.length < 10) {
        reply = "Allez, plus de détails! Je veux en savoir plus sur tes goûts. Qu'est-ce qui te fait saliver?";
    }
    setTimeout(() => addMessage(reply, true), 500);
}

chatIcon?.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden') && chatMessages.children.length === 0) {
        addMessage("Salut! Je suis Ms. Jeezy, ta conseillère fromagère chatty et passionnée. Dis-moi ce que tu aimes, je vais te trouver le panier parfait ou t'offrir un échantillon gratuit! Qu'est-ce qui t'amène?", true);
    }
    chatIcon.classList.remove('wiggle'); // stop wiggle when open
});

closeChat?.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
    chatIcon.classList.add('wiggle');
});

sendChat?.addEventListener('click', () => {
    const msg = chatInput.value.trim();
    if (msg) {
        addMessage(msg, false);
        chatInput.value = '';
        botReply(msg);
    }
});

chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChat.click();
});

// Contact form
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(currentLang === 'fr' ? 'Message envoyé! Zachary vous répondra bientôt.' : 'Message sent! Zachary will reply soon.');
    e.target.reset();
});

// Initial cart update
updateCart();
