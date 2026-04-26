// script.js

// Giriş formu
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === 'admin' && password === '123') {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = '/dashboard';
        } else {
            document.getElementById('error').textContent = 'Geçersiz kullanıcı adı veya şifre';
        }
    });
}

// Dashboard işlemleri
const addForm = document.getElementById('addForm');
const searchBtn = document.getElementById('searchBtn');
const logoutBtn = document.getElementById('logoutBtn');

if (addForm) {
    // Giriş kontrolü
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = '/';
    }

    addForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const code = document.getElementById('code').value;
        try {
            const response = await fetch('/api/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, code })
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                document.getElementById('name').value = '';
                document.getElementById('code').value = '';
            } else {
                alert(result.error);
            }
        } catch (error) {
            alert('Hata: ' + error.message);
        }
    });

    searchBtn.addEventListener('click', async function() {
        const searchName = document.getElementById('searchName').value;
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: searchName })
            });
            const result = await response.json();
            const resultEl = document.getElementById('result');
            if (result.code) {
                resultEl.textContent = `Kod: ${result.code}`;
            } else {
                resultEl.textContent = result.error;
            }
        } catch (error) {
            document.getElementById('result').textContent = 'Hata: ' + error.message;
        }
    });

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('loggedIn');
        window.location.href = '/';
    });
}