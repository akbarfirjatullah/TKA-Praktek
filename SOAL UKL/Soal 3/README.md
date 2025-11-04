## Soal 3: Mengambil Data Pengguna by ID

**File:** [src/controllers/userController.js](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/src/controllers/userController.js) - Function `getUserById`

**Penjelasan:**
Function ini mengambil detail data satu pengguna berdasarkan ID yang diberikan. Digunakan untuk melihat profil atau detail user tertentu.

**Cara Kerja:**
1. Ambil ID dari URL parameter
2. Query database untuk mencari user dengan ID tersebut
3. Return data user jika ditemukan
4. Return error 404 jika tidak ditemukan

**Endpoint:** `GET /api/users/:id`

**Screenshot:**
![Get User by ID - Response](screenshots/soal3-get-user.png)
