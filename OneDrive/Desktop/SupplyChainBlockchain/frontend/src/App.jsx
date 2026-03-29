import { useState } from "react";
import axios from "axios";

function App() {
  const [productId, setProductId] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [traceId, setTraceId] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  // ADD PRODUCT
  const addProduct = async () => {
    if (!productId || !location || !status) {
      alert("⚠️ Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add", {
        productId,
        location,
        status,
      });

      alert("✅ Product Added!");
      setProductId("");
      setLocation("");
      setStatus("");
    } catch (err) {
      alert("❌ Error adding product");
    }
  };

  // TRACE PRODUCT
  const traceProduct = async () => {
    if (!traceId) {
      setMessage("⚠️ Please enter Product ID");
      setData([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/trace/${traceId}`
      );

      if (res.data.length === 0) {
        setMessage("❌ No product found with this ID");
        setData([]);
      } else {
        setMessage("");
        setData(res.data);
      }
    } catch (error) {
      setMessage("❌ Error fetching data");
      setData([]);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a, #020617)",
      color: "white",
      padding: "30px",
      fontFamily: "Segoe UI"
    }}>
      
      {/* HEADER */}
      <h1 style={{
        textAlign: "center",
        fontSize: "40px"
      }}>
        🚀 Blockchain Supply Chain
      </h1>

      <p style={{ textAlign: "center", opacity: 0.7 }}>
        🔗 Secure • Transparent • Real-Time Tracking
      </p>

      {/* ADD PRODUCT */}
      <div style={box}>
        <h2>Add Product</h2>

        <input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={input}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={input}
        />

        <input
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={input}
        />

        <button onClick={addProduct} style={addBtn}>
          ➕ Add Product
        </button>
      </div>

      {/* TRACE PRODUCT */}
      <div style={box}>
        <h2>Trace Product</h2>

        <input
          placeholder="Enter Product ID (P101)"
          onChange={(e) => setTraceId(e.target.value)}
          style={input}
        />

        <button onClick={traceProduct} style={traceBtn}>
          🔍 Trace
        </button>

        {/* MESSAGE */}
        {message && (
          <p style={{ color: "#f87171", marginTop: "10px" }}>
            {message}
          </p>
        )}

        {/* TIMELINE */}
        <div style={{ marginTop: "20px" }}>
          {data.map((item, index) => (
            <div key={index} style={timelineItem}>
              <div style={circle}></div>
              <div style={card}>
                <p><b>📍 {item.data.location}</b></p>
                <p>📦 {item.data.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const box = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "30px",
  maxWidth: "600px",
  marginInline: "auto",
  boxShadow: "0 0 20px rgba(0,0,0,0.4)"
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "none",
  background: "#0f172a",
  color: "white"
};

const addBtn = {
  width: "100%",
  padding: "12px",
  background: "#38bdf8",
  border: "none",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

const traceBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "#22c55e",
  border: "none",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

const timelineItem = {
  display: "flex",
  alignItems: "center",
  marginBottom: "15px"
};

const circle = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: "#38bdf8",
  marginRight: "15px"
};

const card = {
  background: "#334155",
  padding: "10px 15px",
  borderRadius: "8px",
  width: "100%"
};

export default App;
