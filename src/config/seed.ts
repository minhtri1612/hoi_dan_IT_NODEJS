import { prisma } from 'config/client';
import e from 'express';
const initDatabase = async () => {
    const countUser = await prisma.user.count();
    if (countUser === 0) {
        console.log('Seeding initial user data...');
    } else {
        console.log('User data already exists, skipping seeding.');
        return;
    }
    await prisma.user.createMany({
        data: [
            {
                username: "hoidanit",
                password: "password123",
                fullName: "Hỏi Đáp IT",
                address: "123 Tech Street",
                phone: "123-456-7890",
                accountType: "admin",
                avatar: null
            },
            {
                username: "janedoe",
                password: "password456",
                fullName: "Jane Doe",
                address: "456 Main Street",
                phone: "987-654-3210",
                accountType: "user",
                avatar: null
            }
        ],
        skipDuplicates: true
    });
}

export default initDatabase;