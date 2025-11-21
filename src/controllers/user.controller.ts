import { Request, Response } from 'express';
import { getAllUser, handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles } from '../services/user.service';
import { getProducts } from 'services/client/item.service';


const getHomePage = async (req: Request, res: Response) => {
    const products = getProducts();
    return res.render('client/home/show.ejs', { 
        products: await products 
    });
};

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render('admin/user/create.ejs', { roles: roles || [] });
};

const getUserPage = async (req: Request, res: Response) => {
    // alias to the create page for public route
    const roles = await getAllRoles();
    return res.render('admin/user/create.ejs', { roles: roles || [] });
};

const postUserPage = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file ? file.filename : '';
    await handleCreateUser(fullName, username, address, phone, avatar, role);
    return res.redirect('/admin/user');
};

const postDeleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    await handleDeleteUser(id);
    return res.redirect('/admin/user');
};

const getViewUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getUserById(id);
    const roles = await getAllRoles();

    let userObj: any = result;
    if (Array.isArray(result)) {
        userObj = result[0];
        if (Array.isArray(userObj) && userObj.length) {
            userObj = userObj[0];
        }
    }

    return res.render('admin/user/detail.ejs', {
        id: id,
        user: userObj,
        roles: roles || []
    });
};

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;
    await updateUserById(id, fullName, phone, role, address, avatar);
    return res.redirect('/admin/user');
};

export { getHomePage, getUserPage, postUserPage, postDeleteUser, getViewUser, postUpdateUser, getCreateUserPage };
