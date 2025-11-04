## Soal 6: Melihat Riwayat Presensi Pengguna

**File:** [`src/controllers/attendanceController.js`](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/src/controllers/attendanceController.js) - Function `getAttendanceHistory`

**Penjelasan:**
Function ini menampilkan semua riwayat presensi dari satu user, diurutkan dari tanggal terbaru ke terlama. Berguna untuk melihat track record kehadiran user.

**Cara Kerja:**
1. Ambil user_id dari URL parameter
2. Cek apakah user ada
3. Query semua record presensi user tersebut
4. Urutkan berdasarkan tanggal (descending)
5. Return array berisi semua riwayat presensi

**Endpoint:** `GET /api/attendance/history/:user_id`

**Screenshot:**
![Attendance History - Response](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/SOAL%20UKL/Screenshots/WhatsApp%20Image%202025-11-04%20at%2013.12.22_0d065376.jpg)

