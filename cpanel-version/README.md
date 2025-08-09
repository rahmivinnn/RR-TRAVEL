# RR Travel - cPanel Ready Version

Website RR Travel dalam format HTML/CSS/JavaScript murni yang siap upload ke cPanel hosting.

## 🎯 Fitur Lengkap

### ✅ Fitur Utama
- **Design Tokopedia-inspired** dengan warna hijau (#5da96a) 
- **Responsive** untuk mobile, tablet, dan desktop
- **Paket wisata clickable** dengan modal detail lengkap
- **Mapbox integration** dengan pencarian lokasi
- **QR Code Scanner** untuk promotional material RR Travel
- **Contact form** terintegrasi WhatsApp
- **Smooth scrolling** dan animasi modern

### ✅ Paket Wisata
1. **Bali Budaya & Alam** - 3D2N - Rp 2,850,000
2. **Yogya Heritage Tour** - 4D3N - Rp 1,950,000  
3. **Lombok Paradise** - 5D4N - Rp 3,450,000
4. **Raja Ampat Diving** - 6D5N - Rp 8,750,000
5. **Java Cultural Journey** - 7D6N - Rp 4,250,000
6. **Adventure Trekking** - 4D3N - Rp 2,150,000

### ✅ Informasi Kontak
- **Alamat**: Jl. Siti Mariah, Bandung 40231
- **Telepon/WhatsApp**: 082115665661
- **Owner**: Reza Pahlawan (Founder & CEO)

## 📁 Struktur File

```
cpanel-version/
├── index.html          # Halaman utama website
├── style.css           # Styling lengkap dengan design Tokopedia
├── script.js           # JavaScript untuk semua fungsi interaktif
├── assets/             # Folder untuk gambar (logo, foto owner)
│   └── .gitkeep       
└── README.md           # Panduan ini
```

## 🚀 Cara Upload ke cPanel

### 1. Persiapan File
1. Download semua file dalam folder `cpanel-version/`
2. Siapkan gambar yang dibutuhkan:
   - `assets/rr-travel-logo.png` (logo RR Travel)
   - `assets/owner-reza.png` (foto Reza Pahlawan)

### 2. Upload ke cPanel
1. **Login ke cPanel** hosting Anda
2. **Buka File Manager**
3. **Masuk ke folder public_html** (atau domain folder)
4. **Upload semua file**:
   - `index.html`
   - `style.css` 
   - `script.js`
   - Folder `assets/` beserta isinya

### 3. Setting Permissions
- Pastikan file memiliki permission **644**
- Folder assets permission **755**

### 4. Test Website
- Akses domain Anda di browser
- Test semua fitur:
  - ✅ Navigasi menu
  - ✅ Click paket wisata untuk modal
  - ✅ QR Scanner (perlu akses kamera)
  - ✅ Mapbox (perlu koneksi internet)
  - ✅ Contact form ke WhatsApp

## 🔧 Konfigurasi API

### Mapbox Token
File sudah menggunakan Mapbox token yang valid. Jika ingin ganti:

```javascript
// Di script.js, line ~445
mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';
```

### WhatsApp Number
Nomor WhatsApp sudah diset ke **082115665661**. Untuk mengubah:

```javascript
// Di script.js, cari semua instance
const whatsappUrl = `https://wa.me/6282115665661?text=${encodeURIComponent(message)}`;
// Ganti dengan nomor baru
```

## 📱 Fitur Mobile

- **Responsive design** otomatis menyesuaikan layar
- **Hamburger menu** untuk navigasi mobile
- **Touch-friendly** buttons dan interactions
- **QR Scanner** menggunakan kamera mobile

## 🎨 Customisasi Design

### Warna Utama (CSS Variables)
```css
:root {
    --primary-green: #5da96a;        /* Hijau utama Tokopedia */
    --primary-green-hover: #4a8757;  /* Hijau hover */
    --dark-forest: #2c5530;          /* Hijau gelap */
    --light-green: #e8f5e8;          /* Hijau muda background */
}
```

### Font dan Typography
- Font: Segoe UI (system font, loading cepat)
- Responsive typography dengan rem units
- Consistent spacing dengan CSS custom properties

## 🔍 SEO Ready

- **Meta tags** lengkap untuk semua page
- **Open Graph** tags untuk social media
- **Structured data** untuk travel packages
- **Semantic HTML5** structure
- **Image alt attributes** untuk accessibility

## ⚡ Performance

- **No build process** - langsung jalan di browser
- **CDN resources** untuk libraries (Font Awesome, Mapbox)
- **Optimized images** dengan lazy loading
- **Minified external dependencies**

## 🛟 Troubleshooting

### QR Scanner tidak jalan
- Pastikan website diakses via HTTPS
- Check browser permissions untuk kamera
- Test di browser yang berbeda

### Map tidak muncul  
- Check koneksi internet
- Verifikasi Mapbox token masih valid
- Check console browser untuk error

### WhatsApp tidak redirect
- Pastikan nomor format internasional: +6282115665661
- Check browser tidak block popup

### Images tidak muncul
- Upload gambar ke folder `assets/`
- Check nama file sesuai: `rr-travel-logo.png`, `owner-reza.png`
- Fallback images dari Unsplash akan otomatis muncul

## 📞 Support

Untuk bantuan teknis:
- **WhatsApp**: 082115665661
- **Email**: info@rrtravel.com

---

**🎉 Website siap production dan compatible dengan semua cPanel hosting!**