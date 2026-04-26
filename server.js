const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// 🔥 STATIC DOSYALARI SERVE ET (ÖNEMLİ)
app.use(express.static(path.join(__dirname)));

// 🔥 ANA SAYFA
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// MongoDB bağlantı
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB bağlandı"))
.catch(err => console.log("❌ MongoDB hata:", err));

// Model
const Data = mongoose.model("Data", {
    name: String,
    code: String
});

// API - EKLE
app.post("/api/add", async (req, res) => {
    try {
        const { name, code } = req.body;

        const newData = new Data({ name, code });
        await newData.save();

        res.json({ message: "Kayıt başarılı" });
    } catch (err) {
        res.status(500).json({ error: "Kayıt hatası" });
    }
});

// API - ARA
app.post("/api/search", async (req, res) => {
    try {
        const { name } = req.body;

        const data = await Data.findOne({ name });

        if (data) {
            res.json({ code: data.code });
        } else {
            res.json({ error: "Bulunamadı" });
        }
    } catch (err) {
        res.status(500).json({ error: "Arama hatası" });
    }
});

// PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("🚀 Server çalışıyor:", PORT);
});