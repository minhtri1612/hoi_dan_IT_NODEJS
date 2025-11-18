import { Request, Response } from 'express';
import { getAllUser, handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles } from '../services/user.service';
    
const getHomePage = async (req: Request, res: Response) => {
    // get users
    const users = await getAllUser();
    console.log("check users:",users);

    return res.render("home",{
        users: users
    });
};

const getCreateUserPage = async(req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render("admin/user/create.ejs", { roles: roles });
};

const getUserPage = async (req: Request, res: Response) => {
    // fetch roles to populate the select dropdown (safe if empty)
    const roles = await getAllRoles();
    return res.render('admin/user/create.ejs', { roles: roles || [] });
};

const postUserPage = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;

    const a = await handleCreateUser(fullName, email, address);
    
    return res.redirect('/');
};

const postDeleteUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    const a = await handleDeleteUser(id);
    return res.redirect('/');
};

const getViewUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    // get user by id (service may return rows array)
    const result = await getUserById(id);

    // normalize to a single user object
    let userObj: any = result;
    if (Array.isArray(result)) {
        // some database drivers return [rows], or query may return rows array
        // if result is an array of rows, pick the first row
        userObj = result[0];
        // if the driver returns [rows, fields] structure, check for nested array
        if (Array.isArray(userObj) && userObj.length) {
            userObj = userObj[0];
        }
    }

    // pass the user object to the view so template can access user.name, user.email, etc.
    return res.render('view-user', {
        id: id,
        user: userObj,
    });
};

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, email, address, fullName } = req.body;
    //get user by id
    const a = await updateUserById(id, email, address, fullName );

    return res.redirect('/');
};




export { getHomePage, getUserPage, postUserPage, postDeleteUser, getViewUser,
    postUpdateUser, getCreateUserPage
 };