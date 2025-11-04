const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route utama
app.get('/', (req, res) => {
    res.json({ 
        message: 'API Presensi Online berjalan!',
        endpoints: {
            login: 'POST /api/auth/login',
            users: 'GET/POST/PUT /api/users',
            attendance: 'POST /api/attendance'
        }
    });
});

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/attendance', require('./src/routes/attendanceRoutes'));

// Middleware menangani error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Terjadi kesalahan!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});