document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const checkoutButton = document.getElementById("checkout");

  let products = []; // Store fetched products
  let cart = []; // Store cart items

  // Fetch and display products
  fetch("http://54.159.185.225:5000/products")
    .then((response) => response.json())
    .then((data) => {
      products = data; // Save products for later use
      data.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product-item";
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
      });
    })
    .catch((error) => console.error("Failed to fetch products:", error));

  // Add item to the cart
  window.addToCart = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      const cartItem = cart.find((item) => item.id === id);
      if (cartItem) {
        cartItem.quantity += 1; // Increase quantity if already in cart
      } else {
        cart.push({ ...product, quantity: 1 }); // Add new item to cart
      }
      renderCart();
    } else {
      alert("Product not found!");
    }
  };

  // Render cart items
  const renderCart = () => {
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        ${item.name} - $${item.price} x ${item.quantity}
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(div);
    });
  };

  // Remove item from the cart
  window.removeFromCart = (index) => {
    cart.splice(index, 1); // Remove item by index
    renderCart();
  };

  // Handle checkout
  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    fetch("http://54.159.185.225:5000/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || "Order placed successfully!");
        cart = []; // Clear cart
        renderCart();
      })
      .catch((error) => console.error("Checkout failed:", error));
  });
});
