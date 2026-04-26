const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 MongoDB
const MONGO_URI = "mongodb+srv://vezirhanatsiz_db_user:GFOyjqLi2cU2LDjV@cluster0.2hmww1f.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
.then(() => console.log("✅ MongoDB bağlandı"))
.catch(err => console.log("❌ MongoDB hata:", err));

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 STATIC (EN KRİTİK)
app.use(express.static(__dirname));

// 🔥 Schema
const DataSchema = new mongoose.Schema({
    name: String,
    code: String
});

const Data = mongoose.model("Data", DataSchema);

// ANA SAYFA (GARANTİ)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API
app.post("/api/add", async (req, res) => {
    try {
        const { name, code } = req.body;

        if (!name || !code) {
            return res.json({ error: "Eksik veri" });
        }

        await Data.create({ name, code });

        res.json({ message: "Kayıt eklendi" });
    } catch (err) {
        res.json({ error: "Sunucu hatası" });
    }
});

app.post("/api/search", async (req, res) => {
    try {
        const { name } = req.body;

        const found = await Data.findOne({ name });

        if (found) {
            res.json({ code: found.code });
        } else {
            res.json({ error: "Bulunamadı" });
        }
    } catch (err) {
        res.json({ error: "Hata" });
    }
});

// SERVER
app.listen(PORT, () => {
    console.log("🚀 Server çalışıyor:", PORT);
});