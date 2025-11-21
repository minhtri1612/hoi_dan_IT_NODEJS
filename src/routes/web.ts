import express, { Express } from 'express';
import { getHomePage, getUserPage, postUserPage, postDeleteUser, getViewUser, postUpdateUser } from '../controllers/user.controller';
import { getDashboardPage } from 'controllers/admin/dashboard.controller';
import { getAdminUserPage } from 'controllers/admin/dashboard.controller';
import { getAdminProductPage } from 'controllers/admin/dashboard.controller';
import { getAdminOrderPage } from 'controllers/admin/dashboard.controller';
import { getProductPage} from 'controllers/client/product.controller';
import fileUploadMiddleware from 'src/middleware/multer';
import { postAdminCreateProduct, getAdminCreateProductPage, postDeleteProduct, getViewProduct, postUpdateProduct } from 'controllers/admin/product.controller';
import { getLoginPage, getRegisterPage } from 'controllers/client/auth.controller';
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);
    router.get("/product/:id", getProductPage);
    router.get("/login", getLoginPage);
    router.get("/register", getRegisterPage);

    // public create page
    router.get('/create-user', getUserPage);

    // view user by id
    router.get('/handle-view-user/:id', getViewUser);

    //admin routes
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/create-user', getUserPage);
    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postUserPage);
    router.post('/admin/delete-user/:id', postDeleteUser);
    router.get('/admin/view-user/:id', getViewUser);
    router.post('/admin/update-user', fileUploadMiddleware('avatar'), postUpdateUser);
    router.get('/admin/create-product', getAdminCreateProductPage);
    router.post('/admin/create-product', fileUploadMiddleware("image","image/product"),  postAdminCreateProduct);
    
    router.post("/admin/delete-product/:id", postDeleteProduct);
    router.get("/admin/view-product/:id", getViewProduct);
    router.post("/admin/update-product", fileUploadMiddleware("image","image/product"), postUpdateProduct);


    app.use('/', router);
}

export default webRoutes;
