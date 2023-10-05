// İlgili modülü içe aktarın
const { Client } = require('pg');

// PostgreSQL bağlantısı için gerekli bilgileri tanımlayın
const client = new Client({
    user: 'postgres',        // PostgreSQL kullanıcı adınız
    host: 'localhost',            // PostgreSQL sunucu adresi (genellikle localhost)
    database: 'postgres',    // Kullanmak istediğiniz PostgreSQL veritabanı adı
    password: 'depixen-pass',    // PostgreSQL şifreniz
    port: 5432,                   // PostgreSQL bağlantı noktası (varsayılan 5432)
});

// PostgreSQL bağlantısını açın
client.connect();

// Kart verilerini veritabanına eklemek için işlev
async function addCardToDatabase(baslik, aciklama, resim_url) {
    try {
        const query = 'INSERT INTO kartlar (baslik, aciklama, resim_url) VALUES ($1, $2, $3) RETURNING id';
        const values = [baslik, aciklama, resim_url];
        const result = await client.query(query, values);
        const insertedCardId = result.rows[0].id;
        console.log(`Kart başarıyla eklendi. ID: ${insertedCardId}`);
    } catch (error) {
        console.error('Kart eklenirken bir hata oluştu:', error);
    }
}

// Kart oluşturma işlevi
async function createCard() {
    // Kart verilerini al
    const baslik = document.querySelector(".baslik").textContent;
    const aciklama = document.querySelector(".aciklama").innerHTML;
    const resim_url = document.querySelector(".kare img").src;

    // Kartı veritabanına ekle
    await addCardToDatabase(baslik, aciklama, resim_url);

    // Kartı sıfırla ve diğer işlemleri gerçekleştir
    // ...
}

// Örnek kullanım: Kart oluşturma düğmesi tıklandığında createCard işlevini çağır
const createCardButton = document.getElementById("createCardButton");
createCardButton.addEventListener('click', createCard);
