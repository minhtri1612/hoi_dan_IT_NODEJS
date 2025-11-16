import express, { Express } from 'express';
import { getHomePage, getUserPage, postUserPage } from 'controllers/user.controller';
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    router.get('/create-user', getUserPage);

    router.post('/handle-create-user', postUserPage);

    app.use('/', router);
}

export default webRoutes;
