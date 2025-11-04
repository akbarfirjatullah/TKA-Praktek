## Soal 2: Menambah Pengguna Baru

**File:** [src/controllers/userController.js](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/src/controllers/userController.js) - Function `createUser`

**Penjelasan:**
Function ini membuat user baru dalam sistem. Melakukan validasi input, memastikan email tidak duplikat, meng-hash password untuk keamanan, lalu menyimpan ke database.

**Cara Kerja:**
1. Validasi input (name, email, password, role wajib diisi)
2. Cek apakah email sudah terdaftar
3. Hash password menggunakan bcrypt
4. Simpan user baru ke database
5. Return data user (tanpa password)

**Endpoint:** `POST /api/users`

**Screenshot:**
![Create User - Request & Response](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/SOAL%20UKL/Screenshots/WhatsApp%20Image%202025-11-04%20at%2013.06.20_f69a91f3.jpg)

