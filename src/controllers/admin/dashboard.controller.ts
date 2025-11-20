import { Request, Response } from "express";
import { getProductList } from "services/admin/product.service";
import { getAllUser } from "services/user.service";
const getDashboardPage = async (req: Request, res: Response) => {

    return res.render("admin/dashboard/show.ejs");
};

const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUser();
    return res.render("admin/user/show.ejs", {
        users: users,
    });
};

const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getProductList();

    // product page does not need `users` variable — render without it
    return res.render("admin/product/show.ejs", {
        products: products,
    });
};

const getAdminOrderPage = async (req: Request, res: Response) => {

    return res.render("admin/order/show.ejs")
};

export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage };