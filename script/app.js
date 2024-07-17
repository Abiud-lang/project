const url = "http://localhost:3000/products";
const cart = [];

function fetchProducts() {
    fetch(url)
        .then(res => res.json())
        .then(products => {
            const container = document.querySelector('.jersey-container');
            products.map(product => {
                const jerseyDiv = document.createElement('div');
                jerseyDiv.className = 'jersey';

                const jerseyImg = document.createElement('img');
                jerseyImg.src = product.jersey.image;
                jerseyImg.alt = `${product.team} Jersey`;

                const jerseyTeam = document.createElement('h3');
                jerseyTeam.textContent = product.team;

                const jerseyPrice = document.createElement('p');
                jerseyPrice.textContent = `Price: Ksh ${product.jersey.price.toFixed(2)}`;

                const jerseySize = document.createElement('p');
                jerseySize.textContent = `Sizes: ${product.jersey.size.join(', ')}`;

                // const quantityLabel = document.createElement('label');
                // quantityLabel.textContent = 'Quantity: ';

                // const quantityInput = document.createElement('input');
                // quantityInput.type = 'number';
                // quantityInput.min = 1;
                // quantityInput.value = 1;

                const btn = document.createElement('button');
                btn.textContent = 'Add to cart';

                // btn.addEventListener('click', () => {
                //     const selectedQuantity = parseInt(quantityInput.value);
                //     addToCart(product, selectedQuantity);
                // });

                jerseyDiv.appendChild(jerseyImg);
                jerseyDiv.appendChild(jerseyTeam);
                jerseyDiv.appendChild(jerseyPrice);
                jerseyDiv.appendChild(jerseySize);
                // jerseyDiv.appendChild(quantityLabel);
                // jerseyDiv.appendChild(quantityInput);
                jerseyDiv.appendChild(btn);

                container.appendChild(jerseyDiv);
            });
        });
}

function addToCart(product, quantity) {
    const cartItem = cart.find(item => item.product.id === product.id);

    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    displayCart();
}

function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.product.id === productId);

    if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1);
    }

    displayCart();
}

function displayCart() {
    const cartContainer = document.querySelector('.cart-container .detail');
    cartContainer.innerHTML = '';

    cart.forEach(cartItem => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        const cartItemTeam = document.createElement('h3');
        cartItemTeam.textContent = cartItem.product.team;

        const cartItemQuantity = document.createElement('p');
        cartItemQuantity.textContent = `Quantity: ${cartItem.quantity}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove from cart';
        removeBtn.addEventListener('click', () => removeFromCart(cartItem.product.id));

        cartItemDiv.appendChild(cartItemTeam);
        cartItemDiv.appendChild(cartItemQuantity);
        cartItemDiv.appendChild(removeBtn);

        cartContainer.appendChild(cartItemDiv);
    });

    const checkoutButton = document.querySelector('.cart-container .button button:first-child');
    checkoutButton.addEventListener('click', checkout);
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.product.jersey.price * item.quantity;
    });

    // For simplicity, we just alert the total. In a real application, you'd handle payment processing here.
    alert(`Thank you for your purchase! Your total is Ksh ${total.toFixed(2)}.`);
    
    // Clear the cart after checkout
    cart.length = 0;
    displayCart(); // Refresh the cart display
}

fetchProducts();
