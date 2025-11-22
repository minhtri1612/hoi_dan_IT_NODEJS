import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { hashPassword } from "services/user.service";


const isEmailExist = async (email: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
        where: { username: email }
    });
    if (user) return true;
    return false;
};

const registerNewUser = async(
    fullName: string,
    email: string,
    hashedPassword: string
) => {
    const newPassword = await hashPassword(hashedPassword);
    
    const userRole = await prisma.role.findUnique({
        where: { name: "user" }
    });


    if(userRole) {
        await prisma.user.create({
            data: {
                username: email,
                password: newPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId: userRole.id
            }
        });
    }
};

export { isEmailExist, registerNewUser };

/// src/routes/web.ts