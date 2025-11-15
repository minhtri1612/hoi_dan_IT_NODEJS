import express from 'express';
import dotenv from 'dotenv';
import 'dotenv/config';
import webRoutes from './routes/web';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 

// config routes
webRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port:`,process.env.PORT);
});