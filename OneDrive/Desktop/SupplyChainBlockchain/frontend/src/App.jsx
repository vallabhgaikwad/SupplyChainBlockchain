import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { motion, AnimatePresence } from "framer-motion";

/* 🌐 NETWORK BACKGROUND */
const NetworkBG = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let nodes = [];
    const NODE_COUNT = 40;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // create nodes
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.strokeStyle = "rgba(0,245,255,0.08)";
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#00F5FF";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00F5FF";
        ctx.fill();

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background:
          "radial-gradient(circle at 20% 30%, #00F5FF22, transparent), radial-gradient(circle at 80% 70%, #8B5CF622, transparent), #0B0E11"
      }}
    />
  );
};

function App() {
  const [productId, setProductId] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [traceId, setTraceId] = useState("");
  const [data, setData] = useState([]);
  const [wallet, setWallet] = useState("");
  const [toast, setToast] = useState(null);

  const toastTimer = useRef(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });

    if (toastTimer.current) clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return showToast("MetaMask not installed", "error");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet(accounts[0]);

      showToast("Wallet Connected");
    } catch {
      showToast("Connection failed", "error");
    }
  };

  const addProduct = async () => {
    if (!productId || !location || !status)
      return showToast("Fill all fields", "error");

    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        await signer.sendTransaction({
          to: await signer.getAddress(),
          value: ethers.parseEther("0.00001")
        });
      }

      await axios.post("http://localhost:5000/add", {
        productId,
        location,
        status
      });

      setProductId("");
      setLocation("");
      setStatus("");

      showToast("Product added successfully");
    } catch {
      showToast("Error adding product", "error");
    }
  };

  const traceProduct = async () => {
    if (!traceId) return showToast("Enter Product ID", "error");

    try {
      const res = await axios.get(
        `http://localhost:5000/trace/${traceId}`
      );

      if (res.data.length === 0) {
        setData([]);
        showToast("No product found", "error");
      } else {
        setData(res.data);
        showToast("Trace loaded");
      }
    } catch {
      showToast("Error fetching data", "error");
    }
  };

  return (
    <div style={styles.app}>
      <NetworkBG />

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            style={{
              ...styles.toast,
              background:
                toast.type === "error"
                  ? "#ef4444"
                  : "linear-gradient(135deg,#00F5FF,#8B5CF6)"
            }}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <h1 style={styles.title}>Blockchain Supply Chain</h1>

      <button onClick={connectWallet} style={styles.walletBtn}>
        {wallet
          ? `Connected: ${wallet.slice(0, 6)}...`
          : "Connect Wallet"}
      </button>

      <div style={styles.grid}>
        {/* ADD */}
        <div style={styles.card}>
          <h2>Add Product</h2>

          <input
            style={styles.input}
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <button style={styles.btn} onClick={addProduct}>
            Add Product
          </button>
        </div>

        {/* TRACE */}
        <div style={styles.card}>
          <h2>Trace Product</h2>

          <input
            style={styles.input}
            placeholder="Enter Product ID"
            onChange={(e) => setTraceId(e.target.value)}
          />

          <button style={styles.btn} onClick={traceProduct}>
            Trace
          </button>

          <div style={{ marginTop: 20 }}>
            {data.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                style={styles.timeline}
              >
                <div style={styles.dot}></div>

                <div style={styles.content}>
                  <b>{item.data.location}</b>
                  <p>{item.data.status}</p>
                  <small style={{ opacity: 0.5 }}>
                    Hash: {Math.random().toString(36).slice(2, 8)}
                  </small>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  app: {
    minHeight: "100vh",
    padding: "30px",
    color: "white",
    textAlign: "center",
    fontFamily: "Inter"
  },

  title: {
    fontSize: "38px",
    marginBottom: "20px"
  },

  walletBtn: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#00F5FF,#8B5CF6)",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "20px"
  },

  grid: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
    flexWrap: "wrap"
  },

  card: {
    background: "rgba(21,25,28,0.7)",
    padding: "20px",
    borderRadius: "14px",
    width: "320px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 0 40px rgba(0,245,255,0.2)"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    background: "#0B0E11",
    color: "white"
  },

  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg,#00F5FF,#8B5CF6)",
    cursor: "pointer",
    fontWeight: "bold"
  },

  timeline: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px"
  },

  dot: {
    width: "10px",
    height: "10px",
    background: "#00F5FF",
    borderRadius: "50%",
    marginRight: "10px",
    boxShadow: "0 0 10px #00F5FF"
  },

  content: {
    background: "#15191C",
    padding: "10px",
    borderRadius: "8px",
    width: "100%"
  },

  toast: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: "bold",
    color: "black"
  }
};

export default App;