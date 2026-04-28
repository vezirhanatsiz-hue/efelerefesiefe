const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// 🔥 Middleware
app.use(express.json());

// 🔥 STATIC DOSYALAR
app.use(express.static(path.join(__dirname)));

// 🔥 ANA SAYFA (garanti)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 🔥 MongoDB bağlantı
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB bağlandı"))
.catch(err => console.log("❌ MongoDB hata:", err));

// 🔥 Schema & Model
const DataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true }
});

const Data = mongoose.model("Data", DataSchema);

// 🔥 API - EKLE
app.post("/api/add", async (req, res) => {
    try {
        const { name, code } = req.body;

        if (!name || !code) {
            return res.status(400).json({ error: "Eksik veri" });
        }

        const newData = new Data({ name, code });
        await newData.save();

        res.json({ message: "Kayıt başarılı" });

    } catch (err) {
        console.log("ADD HATA:", err);
        res.status(500).json({ error: "Kayıt hatası" });
    }
});

// 🔥 API - ARA
app.post("/api/search", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "İsim gerekli" });
        }

        const data = await Data.findOne({ name });

        if (data) {
            res.json({ code: data.code });
        } else {
            res.json({ error: "Bulunamadı" });
        }

    } catch (err) {
        console.log("SEARCH HATA:", err);
        res.status(500).json({ error: "Arama hatası" });
    }
});

// 🔥 TEST ROUTE (debug için bırak)
app.get("/test", (req, res) => {
    res.send("SERVER AKTİF");
});

// 🔥 SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("🚀 Server çalışıyor:", PORT);
});