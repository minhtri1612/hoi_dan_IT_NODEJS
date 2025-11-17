import getConnection from 'config/database';
import { prisma } from 'config/client';

const handleCreateUser = async(
    fullName: string,
    email: string,
    address: string) => {
    // Try to create with Prisma first. If Prisma fails (schema/migration issues),
    // fallback to raw SQL using the existing mysql2 connection so the app can still create users.
    try {
        const newUser = await prisma.user.create({
            data: {
                name: fullName,
                email: email,
                address: address
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

const handleDeleteUser = async(id: string) => {
    const connection = await getConnection();

    try {
        const sql = 'DELETE FROM users WHERE id = ? LIMIT 1';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (error) {
        console.log(">>> Error:", error);
        return [];
    }
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
            email: email,
            address: address,
            name: fullName
        }
    });
    return updatedUser;
};


export { handleCreateUser, getAllUser, handleDeleteUser, getUserById, updateUserById };