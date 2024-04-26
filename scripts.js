const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const ckeckoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex"
    updateCartModal();
})

cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", () => {
    cartModal.style.display = "none"
})

menu.addEventListener("click", (event) => {
    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        // Se o item já existe ele aumenta apenas a quantidade do item
        existingItem.quantity += 1;
        return;
    }

    cart.push({
        name,
        price,
        quantity: 1,
    })

    updateCartModal()
}

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between mt-3">
            <div>
            <p class="font-bold">${item.name}</p>
            <p>Qtd: ${item.quantity}</p>
            <p clas="font-bold mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="bg-red-600 rounded-xl text-white px-4 py-1"">Remover</button>
            </div>
        `
        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    cartCounter.innerHTML = cart.length;

}