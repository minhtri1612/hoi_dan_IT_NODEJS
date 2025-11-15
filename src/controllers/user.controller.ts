import { Request, Response } from 'express';
    
const getHomePage = (req: Request, res: Response) => {
    return res.render('home');
};

const getUserPage = (req: Request, res: Response) => {
    return res.render('create-user');
};

const postUserPage = (req: Request, res: Response) => {
    return res.redirect('/');
};




export { getHomePage, getUserPage, postUserPage };