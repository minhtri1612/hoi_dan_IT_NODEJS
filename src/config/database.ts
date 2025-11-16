import mysql from 'mysql2/promise';

const getConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            port: 3306,
            // Use IPv4 loopback to avoid ::1 resolution issues on some Linux distros
            host: '127.0.0.1',
            user: 'root',
            database: 'nodejspro',
            password: 'Minhchau3112...'
        });
        const [result, fields] = await connection.query(
            'SELECT * FROM users'
        );
        return result;
    } catch (error) {
        console.error('[database] failed to connect/query MySQL');
        throw error;
    }
}

export default getConnection;