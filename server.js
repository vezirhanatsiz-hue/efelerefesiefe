const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// 🔥 MongoDB Bağlantı
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB bağlandı"))
.catch(err => console.log("❌ MongoDB hata:", err));

// 📦 Schema
const DataSchema = new mongoose.Schema({
    name: String,
    code: String
});

const Data = mongoose.model('Data', DataSchema);

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Tüm verileri getir
app.get('/api/data', async (req, res) => {
    const data = await Data.find();
    res.json(data);
});

// Yeni kayıt ekle
app.post('/api/add', async (req, res) => {
    const { name, code } = req.body;

    if (!name || !code) {
        return res.status(400).json({ error: 'İsim ve kod gerekli' });
    }

    await Data.create({ name, code });

    res.json({ message: 'Kayıt eklendi' });
});

// Arama
app.post('/api/search', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'İsim gerekli' });
    }

    const found = await Data.findOne({ name });

    if (found) {
        res.json({ code: found.code });
    } else {
        res.json({ error: 'Kod bulunamadı' });
    }
});

// Server başlat
app.listen(PORT, () => {
    console.log("🚀 Server çalışıyor: " + PORT);
});