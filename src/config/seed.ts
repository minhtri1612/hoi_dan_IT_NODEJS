import { prisma } from 'config/client';
import { hashPassword } from 'services/user.service';
import { ACCOUNT_TYPE } from 'config/constant';

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();


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


    if (countUser === 0) {
        const defaultPassword = await hashPassword('Minhchau3112...');
        // name is not declared unique in the schema, use findFirst instead of findUnique
        const adminRole = await prisma.role.findFirst({
            where: { name: 'ADMIN' },
        });
        const userRole = await prisma.role.findFirst({
            where: { name: 'USER' },
        });
        await prisma.user.createMany({
            data: [
                {
                    username: 'hoidanit',
                    password: defaultPassword,
                    fullName: 'Hỏi Đáp IT',
                    address: '123 Tech Street',
                    phone: '123-456-7890',
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    avatar: null,
                    roleId: adminRole?.id || 1
                },
                {
                    username: 'janedoe',
                    password: defaultPassword,
                    fullName: 'Jane Doe',
                    address: '456 Main Street',
                    phone: '987-654-3210',
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    avatar: null,
                    roleId: userRole?.id || 2
                },
            ],
            skipDuplicates: true,
        });
    }


};

export default initDatabase;