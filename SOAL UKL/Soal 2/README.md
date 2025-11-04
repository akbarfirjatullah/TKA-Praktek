## Soal 2: Menambah Pengguna Baru

**File:** [`src/controllers/userController.js`](src/controllers/userController.js) - Function `createUser`

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
![Create User - Request & Response](screenshots/soal2-create-user.png)
