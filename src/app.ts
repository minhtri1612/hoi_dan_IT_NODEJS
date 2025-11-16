import express from 'express';
import dotenv from 'dotenv';
import 'dotenv/config';
import webRoutes from './routes/web';
import getConnection from './config/database';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static files
app.use(express.static('public'));

// config routes
webRoutes(app);

getConnection();

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});