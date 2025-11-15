import express, { Express } from 'express';
import { get } from 'http';
import { getHomePage, getUserPage } from '../controllers/user.controller';
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    router.get('/create-user', getUserPage);

    app.use('/', router);
}

export default webRoutes;
