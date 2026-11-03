# Portfolio Novia Mahara — Panduan Kustomisasi

Website statis (HTML + CSS + JavaScript biasa, tanpa framework dan tanpa build step).
Cara menjalankan: **klik dua kali `index.html`**. Untuk online, upload seluruh folder ke GitHub Pages / Netlify / Vercel.

## 1. Struktur folder

```
portfolio/
├── index.html        Kerangka halaman + kartu Experience + teks Hero/Contact
├── style.css         Semua tampilan (warna, font, spasi, modal, lightbox)
├── data.js           ★ ISI KONTEN: Activities, Projects, Certificates
├── script.js         Perilaku halaman (render kartu, modal, lightbox). Jarang perlu diedit
└── images/
    ├── profile/      Foto profil (IMG_8497.jpg)
    ├── projects/     Thumbnail project (sementara masih placeholder .svg)
    ├── certificates/ Gambar sertifikat (sementara placeholder .svg)
    └── activities/   Foto galeri kegiatan, satu subfolder per kegiatan
```

**Prinsip utamanya:** konten yang sering berubah ada di `data.js`. Kamu tidak perlu menyentuh HTML untuk menambah kartu.
Di `index.html`, `script.js` harus dimuat **setelah** `data.js` (sudah diatur, jangan dibalik).

## 2. Cara edit tiap bagian

### A. Beyond the classroom (Activities)
Edit array `ACTIVITIES` di `data.js`. Satu kegiatan = satu blok `{ ... }`:

| Field | Fungsi |
|---|---|
| `icon` | Emoji di kartu dan header modal. Ganti sesukamu (tips: [emojipedia.org](https://emojipedia.org)) |
| `color` | Warna latar ikon: `peach`, `lilac`, `rose`, `butter`, `mint`, `sky` |
| `title`, `org` | Judul dan baris peran · organisasi |
| `period` | Chip tanggal di modal. `''` kalau tidak mau ditampilkan |
| `summary` | Teks singkat di kartu **dan** kalimat pembuka di modal |
| `details` | Daftar paragraf penjelasan, hanya tampil di modal |
| `highlights` | Poin-poin "What I did" |
| `tags` | Chip kecil di modal |
| `gallery` | Foto galeri, lihat bagian 3 |

Menambah kegiatan: salin satu blok, tempel setelah koma, ubah isinya. Menghapus: hapus seluruh blok.
Klik kartu → modal terbuka. Tutup dengan tombol ✕, klik area gelap, atau tombol `Esc`.

> **Perlu kamu isi:** teks `details` dan `highlights` saya tulis hanya dari fakta yang sudah kamu ceritakan. Tambahkan tanggal, angka, dan hasil konkret supaya lebih kuat.

### B. Projects
Edit array `PROJECTS` di `data.js`. Thumbnail diganti lewat field `img`. Kartu hanya memakai `img`, `tag`, `title`, `tagline`, `stack`, `github`, `live`. Sisanya (`problem`, `solution`, `highlights`, `outro`, `year`) dipakai di tampilan studi kasus layar penuh yang terbuka saat kartu diklik.

- Link tombol kode/demo: isi `github` / `live`. Hapus field-nya atau isi `''` untuk menyembunyikan tombol.
- Ukuran kartu diatur `PROJECT_LAYOUT` (`feat` = 7/12, `side` = 5/12, `half` = 6/12, `third` = 4/12). Jumlah tiap baris harus 12.
- Konten project saat ini **masih contoh dari template** (NeuralSketch, LiteStore, dst). Ganti dengan project aslimu.

### C. Certificates
Edit array `CERTIFICATES` di `data.js`: `title`, `issuer`, `date`, `image`, `link` (URL verifikasi, boleh `''`).
Klik kartu → sertifikat tampil besar. Kalau ada lebih dari satu, pakai panah ← → di keyboard atau tombol di layar.
Entri 3 dan 4 adalah placeholder, ganti atau hapus.

### D. Experience, Hero, Contact
Masih di `index.html` (teks biasa). Cari teksnya dengan Ctrl+F lalu ubah. Kartu Experience baru: salin satu `<div class="exp-card">`, ganti warna bar lewat `--bar-color`.

## 3. Menambah foto

**Galeri kegiatan.** Contoh kegiatan ITSMI memakai `photos('itsmi', 3)`, artinya:
1. Buat/isi folder `images/activities/itsmi/`
2. Taruh foto dengan nama persis `1.jpg`, `2.jpg`, `3.jpg`
3. Mau 5 foto? Ubah angkanya jadi `photos('itsmi', 5)` dan tambah `4.jpg`, `5.jpg`
4. Format PNG? `photos('itsmi', 3, 'png')`
5. Nama file bebas? Tulis manual: `gallery: ['images/activities/itsmi/pembukaan.jpg', '...']`

Tidak ada foto = tampil kotak "photo coming soon" (tidak error). `gallery: []` menyembunyikan bagian galeri.

**Thumbnail project & sertifikat.** Taruh file di folder masing-masing, lalu ubah path di field `img` / `image`.

**Tips gambar:** kompres dulu (target di bawah 300 KB per foto, mis. lewat squoosh.app), rasio 4:3 untuk galeri dan sertifikat, 16:10 untuk thumbnail project. Pakai huruf kecil dan tanpa spasi pada nama file (server online membedakan huruf besar/kecil).

## 4. Warna dan font
- **Warna:** blok `:root { ... }` di awal `style.css`. Ubah satu variabel, seluruh situs ikut berubah. `--pink` adalah aksen utama.
- **Font:** ganti `<link>` Google Fonts di `index.html`, lalu ganti nama font di `style.css` (`Playfair Display` untuk judul, `Plus Jakarta Sans` untuk isi, `Fira Code` untuk label kecil).
- **Nomor section** (`02 / experience`, ...): ada di `index.html` pada `.sec-eyebrow`. Kalau menambah atau menghapus section, urutkan ulang manual.

## 5. Yang berubah dari versi sebelumnya
- Emoji kartu Activities disesuaikan dengan isinya (🏛️ kepemimpinan, 🎨 desain, 🎤 webinar, 🧠 deep learning, 📊 data science, 🥈 juara 2 paduan suara, 🎶 klub vokal, 🏆 kompetisi CALC).
- Kartu Activities klik → modal berisi penjelasan lengkap + galeri foto + zoom.
- Section baru **Certificates** (nomor 05, Contact jadi 06) + menu nav.
- Project: fitur scroll ala feed dihapus, kembali ke kartu grid. Thumbnail memakai gambar, bukan emoji.
- Tampilan studi kasus project layar penuh **tetap dipertahankan** (cover-nya kini memakai gambar). Kalau ingin diganti jadi modal sederhana, bilang saja.
- Perbaikan: link email di Contact sebelumnya masih `alexchen@mit.edu`, sekarang sudah ke emailmu. Animasi muncul-saat-scroll tidak lagi memblokir efek hover. Ditambah fokus keyboard dan dukungan `prefers-reduced-motion`.
- Foto profil dipindah ke `images/profile/`.

## 6. Yang masih placeholder (cek sebelum publish)
- Semua konten **Projects** (contoh template) dan thumbnail-nya
- Gambar sertifikat dan entri sertifikat 3–4
- Foto galeri kegiatan
- Tombol **download cv** (`href="#"` di `index.html`): isi dengan path file PDF, mis. `href="cv/Novia-Mahara-CV.pdf"`
- Link GitHub dan LinkedIn di bagian Contact (`href="#"`)
- Angka "12+ projects shipped" di Hero (cocokkan dengan jumlah project aslimu)

## 7. Troubleshooting
| Gejala | Penyebab umum |
|---|---|
| Section Activities / Projects / Certificates kosong | Ada tanda kutip atau koma yang salah di `data.js`. Buka Console browser (F12) dan lihat baris error |
| Gambar tidak muncul setelah online | Beda huruf besar/kecil pada nama file, atau path salah |
| Perubahan tidak terlihat | Refresh keras (Ctrl+Shift+R) |
| Teks aneh di kartu | Jangan pakai karakter `<` mentah di teks (boleh `&amp;`) |
