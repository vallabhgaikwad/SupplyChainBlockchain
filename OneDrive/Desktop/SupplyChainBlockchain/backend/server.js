const express = require("express");
const cors = require("cors");
const blockchain = require("./blockchain");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Add transaction
app.post("/add", (req, res) => {
  const { productId, location, status } = req.body;

  blockchain.addBlock({
    productId,
    location,
    status,
    timestamp: new Date(),
  });

  res.json({ message: "Added successfully" });
});

// Trace product
app.get("/trace/:id", (req, res) => {
  const id = req.params.id;

  const data = blockchain.getChain().filter(
    (b) => b.data.productId === id
  );

  res.json(data);
});

// Full chain
app.get("/chain", (req, res) => {
  res.json(blockchain.getChain());
});

// Start server
app.listen(5000, () => {
  console.log("🔥 Server running on port 5000");
});