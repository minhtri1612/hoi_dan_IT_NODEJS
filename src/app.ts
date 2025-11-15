import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World and vc');
});

app.get('/hoidanit', (req, res) => {
    res.send('Hello Minh Tri!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port:`,process.env.PORT);
});