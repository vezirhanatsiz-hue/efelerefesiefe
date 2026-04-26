# İsim ve Kod Yönetim Web Sitesi - Ortak Sistem

Bu web sitesi artık ortak erişimli! Veriler sunucuda (data.json dosyasında) saklanıyor. Birden fazla kişi aynı verilere erişebilir.

## Kurulum ve Çalıştırma

1. Node.js yüklü olduğundan emin olun.
2. Klasöre gidin: `cd c:\Users\yeniadmin\Desktop\website`
3. Bağımlılıkları yükleyin: `npm install`
4. Sunucuyu başlatın: `npm start`
5. Tarayıcıda `http://localhost:3000` açın.

## Kullanım

1. Giriş için:
   - Kullanıcı adı: admin
   - Şifre: 123
2. Giriş yaptıktan sonra isim ve kod ekleyebilirsiniz.
3. Arama kısmında ismi yazıp "Ara" butonuna tıklayarak kodu görebilirsiniz.

## Ortak Erişim

- Sunucu aynı ağda çalışan kişiler için erişilebilir (örneğin `http://[bilgisayar-ip]:3000`)
- Gerçek ortak erişim için hosting servisi (Heroku, Vercel vb.) kullanın.

## Özellikler

- Kullanıcı girişi
- İsim ve kod kaydı
- Arama fonksiyonu
- Ortak veri havuzu (data.json)

## API Endpoints

- GET /api/data: Tüm verileri al
- POST /api/add: Yeni kayıt ekle (body: {name, code})
- POST /api/search: Arama (body: {name})