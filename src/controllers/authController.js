const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

// Controller untuk login pengguna
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Email dan password wajib diisi' 
            });
        }

        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
            where: { email }
        });
        
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Email atau password salah' 
            });
        }

        // Verifikasi password
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false,
                message: 'Email atau password salah' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login berhasil',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                classOrPosition: user.classOrPosition
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Terjadi kesalahan server' 
        });
    }
};

module.exports = { login };