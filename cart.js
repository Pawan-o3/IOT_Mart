document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
});

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    cartTable.innerHTML = "";

    let totalAmount = 0;

    cart.forEach((item, index) => {
        let totalPrice = parseFloat(item.price) * item.quantity;
        totalAmount += totalPrice;

        let row = `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>₹${totalPrice.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
        cartTable.innerHTML += row;
    });

    cartTotal.innerText = totalAmount.toFixed(2);
}

// Update Quantity
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Remove Item from Cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Clear Cart
function clearCart() {
    localStorage.removeItem("cart");
    displayCartItems();
}
