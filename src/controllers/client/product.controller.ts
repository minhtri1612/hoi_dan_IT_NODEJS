import { Request, Response } from "express";

const getProductPage = async (req: Request, res: Response) => {
    const productId = req.params.id;
    // For demonstration, we will just render a page with the product ID.
    // In a real application, you would fetch product details from the database.
    return res.render("client/product/detail.ejs", { productId: productId });
};

export { getProductPage };