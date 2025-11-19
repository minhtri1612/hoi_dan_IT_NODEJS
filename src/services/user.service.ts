import getConnection from 'config/database';
import { prisma } from 'config/client';
import { ACCOUNT_TYPE } from 'config/constant';
import bscrypt from 'bcrypt';
const saltRounds= 10; 

const hashPassword = async(password: string) => {
    const hashedPassword = await bscrypt.hash(password, saltRounds);
    return hashedPassword;
};
const handleCreateUser = async(
    fullName: string,
    email: string,
    address: string,
    phone: string,
    avatar: string
) => {
    const defaultPassword = await  hashPassword("Minhchau3112...");
    try {
        const newUser = await prisma.user.create({
            data: {
                fullName: fullName,
                username: email,
                address: address,
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                avatar: "",
                phone: ""
            }
        });
        return newUser;
    } catch (prismaError) {
        console.log('Prisma create failed, falling back to raw SQL. Error:', prismaError);
        // fallback: use mysql2 connection
        try {
            const connection = await getConnection();
            const sql = 'INSERT INTO users (name, email, address) VALUES (?, ?, ?)';
            const values = [fullName, email, address];
            const [result] = await connection.query(sql, values);
            // result may contain insertId depending on driver
            // fetch inserted row if possible
            // @ts-ignore
            const insertId = result?.insertId;
            if (insertId) {
                const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [insertId]);
                return Array.isArray(rows) ? rows[0] : rows;
            }
            return result;
        } catch (sqlErr) {
            console.log('Fallback SQL create also failed:', sqlErr);
            throw sqlErr;
        }
    }
};

const getAllUser = async() => {
    try {
        // Use Prisma to fetch users (avoid raw SQL table name mismatches)
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.log('>>> Error:', error);
        return [];
    }
};

const getAllRoles = async() => {
    try {
        // Use Prisma to fetch users (avoid raw SQL table name mismatches)
        const users = await prisma.role.findMany();
        return users;
    } catch (error) {
        console.log('>>> Error:', error);
        return [];
    }
};

const handleDeleteUser = async(id: string) => {
    const result = await prisma.user.delete({
        where: { id: parseInt(id) }
    });
    return result;
};

const getUserById = async(id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    });
    return user;
};

const updateUserById = async(id: string, 
    email: string, address: string, fullName: string
) => {
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: "",
            accountType:""
        }
    });
    return updatedUser;
};


export { handleCreateUser, getAllUser, handleDeleteUser, getUserById, updateUserById, getAllRoles, hashPassword};