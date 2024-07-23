let cart = [];

function addToCart(productName, productPrice) {
    const quantity = parseInt(prompt(`Ingrese la cantidad para ${productName}:`), 10);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Por favor, ingrese una cantidad válida.");
        return;
    }

    const product = {
        name: productName,
        price: productPrice,
        quantity: quantity
    };

    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push(product);
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCart');
    const totalPriceElement = document.getElementById('totalPrice');

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        totalPriceElement.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        totalPriceElement.style.display = 'block';

        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity}
                <button class="remove-button" onclick="removeFromCart('${item.name}')">Eliminar</button>
            `;
            cartItems.appendChild(li);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${total}`;
    }
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}
