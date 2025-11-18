import { prisma } from 'config/client';

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: 'hoidanit',
                    password: 'password123',
                    fullName: 'Hỏi Đáp IT',
                    address: '123 Tech Street',
                    phone: '123-456-7890',
                    accountType: 'admin',
                    avatar: null,
                },
                {
                    username: 'janedoe',
                    password: 'password456',
                    fullName: 'Jane Doe',
                    address: '456 Main Street',
                    phone: '987-654-3210',
                    accountType: 'user',
                    avatar: null,
                },
            ],
            skipDuplicates: true,
        });
    }

    // ensure roles exist as well
    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: 'ADMIN',
                    description: 'Administrator with full access',
                },
                {
                    name: 'USER',
                    description: 'Regular user with limited access',
                },
            ],
            skipDuplicates: true,
        });
    }
};

export default initDatabase;