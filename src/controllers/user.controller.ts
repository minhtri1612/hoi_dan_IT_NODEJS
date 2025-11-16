import { Request, Response } from 'express';
import { getAllUser, handleCreateUser } from '../services/user.service';
import { get } from 'http';
    
const getHomePage = async (req: Request, res: Response) => {
    // get users
    const users = await getAllUser();
    console.log("check users:",users);

    return res.render("home",{
        users: users
    });
};

const getUserPage = (req: Request, res: Response) => {
    return res.render('create-user');
};

const postUserPage = (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;

    handleCreateUser(fullName, email, address);
    
    return res.redirect('/');
};




export { getHomePage, getUserPage, postUserPage };