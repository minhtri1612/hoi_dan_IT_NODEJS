import { Request, Response } from 'express';
import { handleCreateUser } from '../services/user.service';
    
const getHomePage = (req: Request, res: Response) => {
    return res.render('home');
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