# Blockchain Supply Chain Tracking System

This project is a simple full-stack application that demonstrates how blockchain concepts can be used to track products across a supply chain.

Each product is identified by a unique ID, and every stage (such as farm, warehouse, and retail) is stored as a block. The system allows users to add product stages and trace the complete journey.

---

## Features

* Add product stages (location and status)
* Trace product journey using product ID
* Blockchain-like structure using hash and previous hash
* Simple web interface for interaction

---

## Technologies Used

Frontend:

* React (Vite)
* Tailwind CSS

Backend:

* Node.js
* Express

---

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm

You can check using:

node -v
npm -v

---

## How to Run the Project

### 1. Clone the repository

git clone https://github.com/vallabhgaikwad/SupplyChainBlockchain.git
cd SupplyChainBlockchain

---

### 2. Run Backend

cd backend
npm install
node server.js

The backend will run on:
http://localhost:5000

---

### 3. Run Frontend

Open a new terminal:

cd frontend
npm install
npm run dev

Open in browser:
http://localhost:5173

---

## How to Use

1. Enter product details (product ID, location, status) and add them.
2. Use the same product ID for all stages.
3. Enter the product ID in the trace section.
4. View the full product journey.

---

## Note

The data is currently stored in memory. If the server is restarted, the data will be lost. In a real-world application, a database would be used for persistent storage.

---

## Author

Vallabh Gaikwad
