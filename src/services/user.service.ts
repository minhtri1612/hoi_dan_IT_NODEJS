import getConnection from '../config/database';

const handleCreateUser = (
    fullName: string, 
    email: string, 
    address: string) => {

    console.log(">>> insert a new user:", fullName, email, address);
};

const getAllUser = async() => {
    const connection = await getConnection();


    try {
        const [result, fields] = await connection.query(
            'SELECT * FROM users'
        );
        return result;
    } catch (error) {
        console.log(">>> Error:", error);
        return [];
    }

};

export { handleCreateUser, getAllUser };