import { Request, Response} from 'express';

const getAdminCreateProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/create.ejs");
}

const postAdminCreateProduct = async (req: Request, res: Response) => {
    const {name} = req.body;
    const file = req.file;
    const image = file ? file.filename : '';
    // Here you would typically save the product to the database
    console.log(`Creating product: Name=${name}, Image=${image}`);
    return res.redirect('/admin/product');
}

export { getAdminCreateProductPage, postAdminCreateProduct };