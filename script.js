const AUTH_USER = "admin";
const AUTH_PASS = "123456";

const loginView = document.querySelector("#loginView");
const introView = document.querySelector("#introView");
const appView = document.querySelector("#appView");
const loginForm = document.querySelector("#loginForm");
const saveForm = document.querySelector("#saveForm");
const logoutButton = document.querySelector("#logoutButton");
const loginError = document.querySelector("#loginError");
const saveError = document.querySelector("#saveError");
const ownerInput = document.querySelector("#ownerInput");
const walletInput = document.querySelector("#walletInput");
const searchInput = document.querySelector("#searchInput");
const resultBox = document.querySelector("#resultBox");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.querySelector("#loginUsername").value;
  const pass = document.querySelector("#loginPassword").value;

  if (user !== AUTH_USER || pass !== AUTH_PASS) {
    loginError.textContent = "Hatalı giriş";
    return;
  }

  loginError.textContent = "";
  loginView.hidden = true;
  introView.hidden = false;

  setTimeout(() => {
    introView.hidden = true;
    appView.hidden = false;
  }, 1500);
});

logoutButton.addEventListener("click", () => {
  appView.hidden = true;
  loginView.hidden = false;
});


// 🔥 KAYDET (MongoDB)
saveForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = ownerInput.value.trim();
  const code = walletInput.value.trim();

  if (!name || !code) {
    saveError.textContent = "Boş bırakma";
    return;
  }

  try {
    const res = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, code })
    });

    const data = await res.json();

    if (data.error) {
      saveError.textContent = data.error;
    } else {
      saveError.textContent = "";
      ownerInput.value = "";
      walletInput.value = "";
      alert("Kaydedildi");
    }

  } catch (err) {
    saveError.textContent = "Sunucu hatası";
  }
});


// 🔥 ARAMA (MongoDB)
searchInput.addEventListener("input", async () => {
  const name = searchInput.value.trim();

  if (!name) {
    resultBox.innerHTML = "Arama yap...";
    return;
  }

  try {
    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });

    const data = await res.json();

    if (data.code) {
      resultBox.innerHTML = "Kod: " + data.code;
    } else {
      resultBox.innerHTML = data.error || "Bulunamadı";
    }

  } catch (err) {
    resultBox.innerHTML = "Hata";
  }
});