import getConnection from 'config/database';

const handleCreateUser = async(
    fullName: string, 
    email: string, 
    address: string) => {

    //insert into database
    const connection = await getConnection();

        try {
            const sql = 'INSERT INTO users (name, email, address) VALUES (?, ?, ?)';
            const values = [fullName, email, address];

            const [result, fields] = await connection.query(sql, values);
            return result;
    } catch (error) {
        console.log(">>> Error:", error);
        return [];
    }
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