import express, { Express } from 'express';
import { getHomePage, getUserPage, postUserPage, postDeleteUser } from 'controllers/user.controller';
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    router.get('/create-user', getUserPage);

    router.post('/handle-create-user', postUserPage);

    router.post('/handle-delete-user/:id', postDeleteUser);

    app.use('/', router);
}

export default webRoutes;
