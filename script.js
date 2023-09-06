document.addEventListener("DOMContentLoaded", function () {
    const itemsData = [
        { id: 1, name: "Product A", price: 10.99, quantity: 0, image: "image/micro-1.png" },
        { id: 2, name: "Product B", price: 19.99, quantity: 0, image: "image/kettle.png" },
        { id: 3, name: "Product C", price: 10.99, quantity: 0, image: "image/micro.png" },
        { id: 4, name: "Product D", price: 19.99, quantity: 0, image: "image/phone-1.png" },
        { id: 5, name: "Product E", price: 10.99, quantity: 0, image: "image/phone-2.png" },
        { id: 6, name: "Product F", price: 19.99, quantity: 0, image: "image/phone.png" },
        // Add more items to the array
    ];

    const itemContainer = document.getElementById("item-list");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = [];

    // Initialize the cart
    function initializeCart() {
        cart = [...itemsData];
    }

    // Add item to cart
    function addItemToCart(itemId) {
        const item = cart.find((item) => item.id === itemId);
        if (item) {
            item.quantity++;
            updateCart();
        }
    }

    // Remove item from cart
    function removeItemFromCart(itemId) {
        const item = cart.find((item) => item.id === itemId);
        if (item && item.quantity > 0) {
            item.quantity--;
            updateCart();
        }
    }

    // Delete item from cart
    function deleteItemFromCart(itemId) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCart();
        }
    }

    // Update cart UI
    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

            // count items in the cart
            //document.getElementById("count").innerHTML = cart.length;

        cart.forEach((item) => {
            if (item.quantity > 0) {
                const li = document.createElement("li");
                li.innerHTML = `
                    <div class='row-image'>
                    <img class="row-img" src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        
                            <button class="decrement" data-item-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increment" data-item-id="${item.id}">+</button>
                        
                        <i class='fa-solid fa-trash delete' data-item-id="${item.id}"></i>
                    </div>
                `;
                cartItems.appendChild(li);
                total += item.price * item.quantity;
            }
        });

        cartTotal.textContent = total.toFixed(2);
    }

    // Initialize the cart and attach event listeners
    initializeCart();

    itemsData.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "item";
        itemElement.innerHTML = `
            <div class='img-box'>
            <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-info">
                <h2>${item.name}</h2>
                <p>Price: $${item.price.toFixed(2)}</p>
                <div class="quantity">
                    <button class="decrement" data-item-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increment" data-item-id="${item.id}">+</button>
                </div>
                <button class="add-to-cart" data-item-id="${item.id}">Add to Cart</button>
            </div>
        `;

        const addToCartBtn = itemElement.querySelector(".add-to-cart");
        addToCartBtn.addEventListener("click", () => {
            addItemToCart(item.id);
        });


        itemContainer.appendChild(itemElement);
    });

    // Event listener for increment and decrement buttons in the cart
    cartItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("increment")) {
            const itemId = parseInt(e.target.getAttribute("data-item-id"));
            addItemToCart(itemId);
        } else if (e.target.classList.contains("decrement")) {
            const itemId = parseInt(e.target.getAttribute("data-item-id"));
            removeItemFromCart(itemId);
        }
    });

    // Event listener for deleting items from the cart
    cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const itemId = parseInt(e.target.getAttribute("data-item-id"));
        deleteItemFromCart(itemId);
        }
    });

    

});
