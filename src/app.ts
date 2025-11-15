import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/hoidanit', (req, res) => {
    res.send('Hello Minh Tri!');
});

app.get('/abc', (req, res) => {
    res.send('ABC')
});  

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port:`,process.env.PORT);
});