## Soal 5: Melakukan Presensi (Catat Kehadiran)

**File:** [src/controllers/attendanceController.js](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/src/controllers/attendanceController.js) - Function `recordAttendance`

**Penjelasan:**
Function ini mencatat kehadiran pengguna pada hari tertentu. Sistem memastikan user tidak bisa presensi 2 kali di tanggal yang sama, dan memvalidasi status kehadiran.

**Cara Kerja:**
1. Terima data userId, date, time, status, dan notes
2. Validasi input yang wajib (userId, date, time)
3. Cek apakah user ada di database
4. Cek apakah sudah ada presensi di tanggal yang sama
5. Simpan record presensi ke database
6. Return data presensi yang baru dibuat

**Endpoint:** `POST /api/attendance`

**Screenshot:**
![Record Attendance - Request & Response](https://github.com/akbarfirjatullah/TKA-Praktek/blob/main/SOAL%20UKL/Screenshots/WhatsApp%20Image%202025-11-04%20at%2013.10.11_cee22cf5.jpg)

