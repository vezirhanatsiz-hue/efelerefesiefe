const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Static files serve et

// Verileri oku
function readData() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Verileri yaz
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Tüm verileri al
app.get('/api/data', (req, res) => {
    const data = readData();
    res.json(data);
});

// Yeni kayıt ekle
app.post('/api/add', (req, res) => {
    const { name, code } = req.body;
    if (!name || !code) {
        return res.status(400).json({ error: 'İsim ve kod gerekli' });
    }
    const data = readData();
    data.push({ name, code });
    writeData(data);
    res.json({ message: 'Kayıt eklendi' });
});

// Arama
app.post('/api/search', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'İsim gerekli' });
    }
    const data = readData();
    const found = data.find(item => item.name === name);
    if (found) {
        res.json({ code: found.code });
    } else {
        res.json({ error: 'Kod bulunmadı' });
    }
});

app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`);
});