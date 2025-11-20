import { Request, Response} from 'express';
import { ProductSchema, TProductSchema } from 'src/validation/product.schema';
import { createProduct } from 'services/admin/product.service';

const getAdminCreateProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/create.ejs");
}

const postAdminCreateProduct = async (req: Request, res: Response) => {
    const {name, price, detailDesc, shortDesc, quantity, factory, target} = req.body as TProductSchema;

    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        console.error('Validation error in postAdminCreateProduct:', validate.error);
        return res.status(400).send('Invalid product data');
    }
    const image = req.file ? req.file.filename : '';
    // service signature: createProduct(name, price, detailDesc, shortDesc, quantity, factory, target, imageUpload)
    await createProduct(
        name,
        +price,
        detailDesc,
        shortDesc,
        +quantity,
        factory,
        target,
        image || ''
    );
    return res.redirect('/admin/product');
}

export { getAdminCreateProductPage, postAdminCreateProduct };