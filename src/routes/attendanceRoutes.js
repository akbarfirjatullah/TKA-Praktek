const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
    recordAttendance,
    getAttendanceHistory,
    getMonthlyAttendanceSummary,
    analyzeAttendance
} = require('../controllers/attendanceController');

// Semua rute memerlukan authentication
router.use(verifyToken);

// Catat attendance
router.post('/', recordAttendance);

// Dapatkan riwayat attendance berdasarkan user
router.get('/history/:user_id', getAttendanceHistory);

// Dapatkan ringkasan bulanan
router.get('/summary/:user_id', getMonthlyAttendanceSummary);

// Analisis Attendance
router.post('/analysis', analyzeAttendance);

module.exports = router;