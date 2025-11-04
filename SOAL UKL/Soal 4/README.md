## Soal 4: Mengubah Data Pengguna

**File:** [src/controllers/userController.js](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/src/controllers/userController.js) - Function `updateUser`

**Penjelasan:**
Function ini mengupdate data user yang sudah ada. Semua field bersifat opsional, hanya field yang dikirim yang akan diupdate. Password otomatis di-hash jika diubah.

**Cara Kerja:**
1. Ambil ID user dari URL parameter
2. Cek apakah user dengan ID tersebut ada
3. Validasi input yang diberikan
4. Update hanya field yang dikirim
5. Hash password baru jika password diubah
6. Return data user yang sudah diupdate

**Endpoint:** `PUT /api/users/:id`

**Screenshot:**
![Update User - Request & Response](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/SOAL%20UKL/Screenshots/WhatsApp%20Image%202025-11-04%20at%2013.07.36_0dfd6ca5.jpg)

