## Soal 8: Analisis Tingkat Kehadiran Berdasarkan Parameter Tertentu

**File:** [`src/controllers/attendanceController.js`](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/src/controllers/attendanceController.js) - Function `analyzeAttendance`

**Penjelasan:**
Function ini melakukan analisis mendalam tingkat kehadiran. Bisa filter berdasarkan periode waktu tertentu, dan mengelompokkan data berdasarkan kategori (role atau class/position) untuk membandingkan tingkat kehadiran antar-kelompok.

**Cara Kerja:**
1. Terima startDate, endDate, dan groupBy (opsional)
2. Query semua presensi dalam rentang tanggal tersebut
3. Jika ada groupBy: kelompokkan data berdasarkan role/classOrPosition
4. Hitung statistik untuk setiap grup
5. Jika tidak ada groupBy: tampilkan statistik keseluruhan dan per user
6. Return analisis lengkap dengan persentase kehadiran

**Endpoint:** `POST /api/attendance/analysis`

**Screenshot 1 - Analisis Tanpa Group:**
![Analysis Without Group](screenshots/soal8-analysis-overall.png)

**Screenshot 2 - Analisis dengan Group by Role:**
![Analysis With Group by Role](screenshots/soal8-analysis-grouped.png)
