const prisma = require('../config/prisma');

// Mencatat kehadiran
const recordAttendance = async (req, res) => {
    try {
        const { userId, date, time, status, notes } = req.body;

        // Validasi field yang wajib diisi
        if (!userId || !date || !time) {
            return res.status(400).json({
                success: false,
                message: 'userId, date, dan time wajib diisi'
            });
        }

        // Validasi status
        const validStatuses = ['hadir', 'izin', 'sakit', 'alpha'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status harus: hadir, izin, sakit, atau alpha'
            });
        }

        // Cek apakah user ada
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Pengguna tidak ditemukan'
            });
        }

        // Parse tanggal dan waktu
        const attendanceDate = new Date(date);
        const attendanceTime = new Date(`1970-01-01T${time}`);

        // Cek apakah sudah ada presensi di tanggal yang sama
        const existingAttendance = await prisma.attendance.findFirst({
            where: {
                userId: parseInt(userId),
                date: attendanceDate
            }
        });

        if (existingAttendance) {
            return res.status(409).json({
                success: false,
                message: 'Presensi untuk tanggal ini sudah tercatat'
            });
        }

        // Buat record presensi
        const attendance = await prisma.attendance.create({
            data: {
                userId: parseInt(userId),
                date: attendanceDate,
                time: attendanceTime,
                status: status || 'hadir',
                notes: notes || null
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        classOrPosition: true
                    }
                }
            }
        });

        res.status(201).json({
            success: true,
            message: 'Presensi berhasil dicatat',
            data: attendance
        });

    } catch (error) {
        console.error('Catat attendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
};

// Melihat riwayat presensi berdasarkan user ID
const getAttendanceHistory = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Cek apakah user ada
        const user = await prisma.user.findUnique({
            where: { id: parseInt(user_id) }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Pengguna tidak ditemukan'
            });
        }

        // Ambil riwayat presensi
        const history = await prisma.attendance.findMany({
            where: {
                userId: parseInt(user_id)
            },
            orderBy: {
                date: 'desc'
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        classOrPosition: true
                    }
                }
            }
        });

        res.json({
            success: true,
            count: history.length,
            data: history
        });

    } catch (error) {
        console.error('Mengambil riwayat attendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
};

// Melihat rekap kehadiran bulanan
const getMonthlyAttendanceSummary = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { year, month } = req.query; // Contoh: ?year=2024&month=11

        // Cek apakah user ada
        const user = await prisma.user.findUnique({
            where: { id: parseInt(user_id) }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Pengguna tidak ditemukan'
            });
        }

        // Default ke bulan sekarang jika tidak diisi
        const targetYear = year ? parseInt(year) : new Date().getFullYear();
        const targetMonth = month ? parseInt(month) : new Date().getMonth() + 1;

        // Hitung tanggal awal dan akhir bulan
        const startDate = new Date(targetYear, targetMonth - 1, 1);
        const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);

        // Ambil data presensi dalam periode tersebut
        const attendances = await prisma.attendance.findMany({
            where: {
                userId: parseInt(user_id),
                date: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });

        // Hitung statistik
        const totalDays = attendances.length;
        const hadirCount = attendances.filter(a => a.status === 'hadir').length;
        const izinCount = attendances.filter(a => a.status === 'izin').length;
        const sakitCount = attendances.filter(a => a.status === 'sakit').length;
        const alphaCount = attendances.filter(a => a.status === 'alpha').length;
        
        // Persentase kehadiran (hadir + izin + sakit dianggap tidak alpha)
        const attendancePercentage = totalDays > 0 
            ? ((hadirCount + izinCount + sakitCount) / totalDays * 100).toFixed(2) 
            : 0;

        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    classOrPosition: user.classOrPosition
                },
                period: {
                    year: targetYear,
                    month: targetMonth,
                    startDate: startDate.toISOString().split('T')[0],
                    endDate: endDate.toISOString().split('T')[0]
                },
                summary: {
                    totalDays: totalDays,
                    hadir: hadirCount,
                    izin: izinCount,
                    sakit: sakitCount,
                    alpha: alphaCount,
                    attendancePercentage: parseFloat(attendancePercentage)
                }
            }
        });

    } catch (error) {
        console.error('Mengambil ringkasan bulanan error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
};

// Analisis tingkat kehadiran berdasarkan parameter tertentu
const analyzeAttendance = async (req, res) => {
    try {
        const { startDate, endDate, category, groupBy } = req.body;

        // Validasi field yang wajib diisi
        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'startDate dan endDate wajib diisi'
            });
        }

        // Parse tanggal
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        // Buat kondisi where
        const whereClause = {
            date: {
                gte: start,
                lte: end
            }
        };

        // Ambil semua presensi dalam rentang tanggal
        const attendances = await prisma.attendance.findMany({
            where: whereClause,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        classOrPosition: true
                    }
                }
            }
        });

        // Jika ada groupBy (misalnya 'role' atau 'classOrPosition')
        if (groupBy) {
            const groupedData = {};

            attendances.forEach(attendance => {
                const groupKey = attendance.user[groupBy] || 'unknown';

                if (!groupedData[groupKey]) {
                    groupedData[groupKey] = {
                        total: 0,
                        hadir: 0,
                        izin: 0,
                        sakit: 0,
                        alpha: 0
                    };
                }

                groupedData[groupKey].total++;
                if (attendance.status === 'hadir') groupedData[groupKey].hadir++;
                if (attendance.status === 'izin') groupedData[groupKey].izin++;
                if (attendance.status === 'sakit') groupedData[groupKey].sakit++;
                if (attendance.status === 'alpha') groupedData[groupKey].alpha++;
            });

            // Hitung persentase untuk setiap grup
            const analysis = Object.keys(groupedData).map(key => {
                const data = groupedData[key];
                const attendanceRate = data.total > 0 
                    ? ((data.hadir + data.izin + data.sakit) / data.total * 100).toFixed(2)
                    : 0;

                return {
                    group: key,
                    statistics: {
                        totalRecords: data.total,
                        hadir: data.hadir,
                        izin: data.izin,
                        sakit: data.sakit,
                        alpha: data.alpha,
                        attendancePercentage: parseFloat(attendanceRate)
                    }
                };
            });

            return res.json({
                success: true,
                data: {
                    period: {
                        startDate: startDate,
                        endDate: endDate
                    },
                    groupBy: groupBy,
                    analysis: analysis
                }
            });
        }

        // Jika tidak ada groupBy, tampilkan statistik keseluruhan
        const totalRecords = attendances.length;
        const hadirCount = attendances.filter(a => a.status === 'hadir').length;
        const izinCount = attendances.filter(a => a.status === 'izin').length;
        const sakitCount = attendances.filter(a => a.status === 'sakit').length;
        const alphaCount = attendances.filter(a => a.status === 'alpha').length;
        
        const attendancePercentage = totalRecords > 0
            ? ((hadirCount + izinCount + sakitCount) / totalRecords * 100).toFixed(2)
            : 0;

        // Hitung statistik per user
        const userStats = {};
        attendances.forEach(attendance => {
            const userId = attendance.user.id;
            
            if (!userStats[userId]) {
                userStats[userId] = {
                    user: attendance.user,
                    total: 0,
                    hadir: 0,
                    izin: 0,
                    sakit: 0,
                    alpha: 0
                };
            }

            userStats[userId].total++;
            if (attendance.status === 'hadir') userStats[userId].hadir++;
            if (attendance.status === 'izin') userStats[userId].izin++;
            if (attendance.status === 'sakit') userStats[userId].sakit++;
            if (attendance.status === 'alpha') userStats[userId].alpha++;
        });

        const userAnalysis = Object.values(userStats).map(stats => {
            const attendanceRate = stats.total > 0
                ? ((stats.hadir + stats.izin + stats.sakit) / stats.total * 100).toFixed(2)
                : 0;

            return {
                user: stats.user,
                statistics: {
                    totalRecords: stats.total,
                    hadir: stats.hadir,
                    izin: stats.izin,
                    sakit: stats.sakit,
                    alpha: stats.alpha,
                    attendancePercentage: parseFloat(attendanceRate)
                }
            };
        });

        res.json({
            success: true,
            data: {
                period: {
                    startDate: startDate,
                    endDate: endDate
                },
                overall: {
                    totalRecords: totalRecords,
                    hadir: hadirCount,
                    izin: izinCount,
                    sakit: sakitCount,
                    alpha: alphaCount,
                    attendancePercentage: parseFloat(attendancePercentage)
                },
                byUser: userAnalysis
            }
        });

    } catch (error) {
        console.error('Analisis attendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
};

module.exports = {
    recordAttendance,
    getAttendanceHistory,
    getMonthlyAttendanceSummary,
    analyzeAttendance
};