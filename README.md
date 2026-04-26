# Blockchain Supply Chain Tracking System (Ethereum + MetaMask)

## Overview

This project is a blockchain-based supply chain tracking system that allows users to track products across different stages such as farm, warehouse, and retail.

The system integrates Ethereum and MetaMask to simulate real blockchain transactions while maintaining product data in the backend.

---

## Features

* Add product stages (location and status)
* Trace complete product journey using Product ID
* MetaMask wallet integration
* Ethereum transaction on product addition
* Simple and interactive web interface

---

## Tech Stack

Frontend:

* React (Vite)
* Axios
* Ethers.js

Backend:

* Node.js
* Express

Blockchain:

* Ethereum (Sepolia Test Network)
* MetaMask Wallet

---

## Prerequisites

Make sure the following are installed:

* Node.js (v16 or above)
* npm
* Git (optional)

Install MetaMask browser extension:

* Add MetaMask to Chrome/Brave
* Create a wallet

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/vallabhgaikwad/SupplyChainBlockchain.git
cd SupplyChainBlockchain
```

---

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Run the Application

#### Start Backend

```bash
cd backend
node server.js
```

Backend runs on:
http://localhost:5000

---

#### Start Frontend (new terminal)

```bash
cd frontend
npm run dev
```

Frontend runs on:
http://localhost:5173

---

## MetaMask Setup (Important)

1. Install MetaMask extension
2. Open MetaMask
3. Switch network to:
   Sepolia Test Network
4. Get free test ETH from a Sepolia faucet
5. Connect wallet in the application

---

## How to Use

1. Click "Connect Wallet"
2. Enter product details:

   * Product ID
   * Location
   * Status
3. Click "Add Product"
4. Confirm transaction in MetaMask
5. Enter Product ID in "Trace Product"
6. View full product journey

---

## Project Structure

```
SupplyChainBlockchain/
│
├── backend/
│   ├── server.js
│   └── blockchain.js
│
├── frontend/
│   ├── src/
│   ├── App.jsx
│   └── package.json
│
└── README.md
```

---

## Important Notes

* Product data is currently stored in backend memory (not persistent)
* Blockchain transactions are simulated using Ethereum (Sepolia)
* Requires MetaMask for full functionality

---

## Future Improvements

* Store data fully on blockchain using smart contracts
* Add database (MongoDB) for persistence
* Improve UI with advanced Web3 design
* Add authentication and user roles

---

## Author

Vallabh Gaikwad
