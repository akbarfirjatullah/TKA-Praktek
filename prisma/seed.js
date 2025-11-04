const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Buat user test
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            name: 'Test User',
            email: 'test@example.com',
            password: hashedPassword,
            role: 'siswa',
            classOrPosition: 'XI RPL'
        }
    });

    console.log('User test berhasil dibuat:', user);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });