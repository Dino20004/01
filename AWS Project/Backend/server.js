const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files (images, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Sample endpoint for products
app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "Laptop", price: 1000, image: "./images/laptop.avif" },
    { id: 2, name: "Phone", price: 500, image: "./images/phone.avif" },
  ];
  res.json(products);
});

// Endpoint for checkout
app.post("/checkout", (req, res) => {
  const order = req.body;

  // Validate incoming data
  if (!Array.isArray(order) || order.some((item) => !item.id || !item.price)) {
    return res.status(400).json({ error: "Invalid cart data" });
  }

  // Log order details
  console.log("Order received:", order);

  // Example: Calculate total cost
  const total = order.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  console.log(`Order total: $${total}`);

  res.status(200).json({
    message: "Order processed successfully!",
    total,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
