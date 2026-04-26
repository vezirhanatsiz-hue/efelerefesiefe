const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 MongoDB bağlantı
mongoose.connect("mongodb+srv://vezirhanatsiz_db_user:ZwQgM2jJHBawzFW3@cluster0.2hmww1f.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB bağlandı"))
.catch(err => console.log("MongoDB hata:", err));

// 🔥 Schema (veri yapısı)
const DataSchema = new mongoose.Schema({
    name: String,
    code: String
});

const Data = mongoose.model("Data", DataSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// 📦 Tüm verileri getir
app.get('/api/data', async (req, res) => {
    const data = await Data.find();
    res.json(data);
});

// ➕ Yeni kayıt ekle
app.post('/api/add', async (req, res) => {
    const { name, code } = req.body;

    if (!name || !code) {
        return res.status(400).json({ error: 'İsim ve kod gerekli' });
    }

    await Data.create({ name, code });

    res.json({ message: 'Kayıt eklendi' });
});

// 🔍 Arama (büyük/küçük fark etmez)
app.post('/api/search', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'İsim gerekli' });
    }

    const found = await Data.findOne({
        name: new RegExp("^" + name + "$", "i")
    });

    if (found) {
        res.json({ code: found.code });
    } else {
        res.json({ error: 'Kod bulunamadı' });
    }
});

// 🚀 Server başlat
app.listen(PORT, () => {
    console.log("Server çalışıyor: " + PORT);
});