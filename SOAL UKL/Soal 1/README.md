## Soal 1: Autentikasi dan Otorisasi (Login)

**File:** [src/controllers/authController.js](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/src/controllers/authController.js)

**Penjelasan:**
File ini menangani proses login pengguna. Sistem menerima email dan password, lalu memverifikasi dengan database. Jika valid, sistem menghasilkan JWT token yang digunakan untuk autentikasi endpoint lainnya.

**Cara Kerja:**
1. Menerima email dan password dari user
2. Mencari user di database berdasarkan email
3. Memverifikasi password menggunakan bcrypt
4. Menghasilkan JWT token yang berlaku 24 jam
5. Mengirim token dan data user sebagai response

**Endpoint:** `POST /api/auth/login`

**Screenshot:**
![Login Screenshot](screenshots/soal1-login.png)
