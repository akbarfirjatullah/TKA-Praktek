## Soal 7: Melihat Rekap Kehadiran Bulanan

**File:** [`src/controllers/attendanceController.js`](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/src/controllers/attendanceController.js) - Function `getMonthlyAttendanceSummary`

**Penjelasan:**
Function ini membuat ringkasan/rekap kehadiran bulanan untuk satu user. Menghitung total hari, jumlah hadir, izin, sakit, alpha, dan persentase kehadiran.

**Cara Kerja:**
1. Ambil user_id, year, dan month (opsional, default bulan ini)
2. Hitung tanggal awal dan akhir bulan tersebut
3. Query semua presensi dalam periode tersebut
4. Hitung statistik: total, hadir, izin, sakit, alpha
5. Hitung persentase kehadiran
6. Return summary lengkap dengan data user dan periode

**Endpoint:** `GET /api/attendance/summary/:user_id?year=2024&month=11`

**Screenshot:**
![Monthly Summary - Response](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/SOAL%20UKL/Screenshots/WhatsApp%20Image%202025-11-04%20at%2013.13.09_3dc5dcdb.jpg)

