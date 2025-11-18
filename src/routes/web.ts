import express, { Express } from 'express';
import { getHomePage, getUserPage, postUserPage, postDeleteUser, getViewUser, postUpdateUser } from '../controllers/user.controller';
import { getDashboardPage } from 'controllers/admin/dashboard.controller';
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    router.get('/create-user', getUserPage);

    router.post('/handle-create-user', postUserPage);

    router.post('/handle-delete-user/:id', postDeleteUser);

    // view user by id
    router.get('/handle-view-user/:id', getViewUser);

    router.post('/handle-update-user', postUpdateUser);

    //admin routes
    router.get('/admin', getDashboardPage);

    app.use('/', router);
}

export default webRoutes;
