import log from '../logs/log';
import { Request, Response } from 'express';
import UserDB from "../Queries/UserQueries";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { CustomRequest, CustomResponse } from '../types/CustomRequest';
import ShopsDB from '../Queries/ShopsQueries';
import ExpenseDB from '../Queries/ExpenseQueries';
import CustomerCreditsDB from '../Queries/CustomerCreditsQueries';
import SalesDB from '../Queries/SalesQueries';
dotenv.config();

const User: any = {};

User.register = async (req: Request, res: Response) => {
    const C = "UserController";
    const F = "register";
    try {
        const { name, email, password, phone } = req.body;
        log.info(`[${C}][${F}], Email: [${email}], Password: [${password}], Phone: [${phone}], Name: [${name}]`);
        const alreadyExist = await UserDB.getUserByEmail({ email });
        if (alreadyExist) {
            log.info(`[${C}][${F}],${email} already exists`);
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const salt: string = process.env.SECRET_SALT ? process.env.SECRET_SALT : "";
        const hashedPassword = await bcrypt.hash(password, salt);
        const User = await UserDB.insertUser({ name, email, password: hashedPassword, phone });
        log.info(`[${C}][${F}] ,Email:${email}, registered successfully`);
        return res.status(200).json({
            message: "User registered successfully",
        })
    }
    catch (error) {
        log.info(`[${C}][${F}] ${error}`);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

User.login = async (req: Request, res: Response) => {
    const C = "UserController";
    const F = "login";
    try {
        const { email, password } = req.body;

        log.info(`[${C}][${F}], Email: [${email}], Password: [${password}]`);

        const user = await UserDB.getUserByEmail({ email });
        if (!user) {
            log.info(`[${C}][${F}],Email:${email} not found`);
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            log.info(`[${C}][${F}], Email:${email}, Password: ${password}, password is incorrect`);
            return res.status(401).json({
                message: "Invalid password"
            });
        }
        log.info(`[${C}][${F}], Email:${email}, Password: ${password}, logged in successfully`);

        const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 1 day from now
        const secretJWT = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
        const token = jwt.sign({
            id: user.id,
            email: user.email,
        },
            secretJWT,
            { expiresIn: '10D' });

        return res.status(200).json({
            message: "Logged in successfully",
            data: {
                id: user.id,
                token: token,
                expirationTime: expirationTime
            }
        });

    }
    catch (error) {
        log.info(`[${C}][${F}], Error: ${error}`);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error
        })

    }

}

User.getUserDetails = async (req: CustomRequest, res: CustomResponse) => {
    const C = "UserController";
    const F = "getUserDetails";
    try {
        const id = req.id;
        const { shopId } = req.query;
        log.info(`[${C}][${F}], User ID: [${id}], Shop ID: [${shopId}]`);
        const user = await UserDB.getUser({ id });
        if (!user) {
            log.info(`[${C}][${F}], User not found`);
            return res.status(404).json({
                message: "User not found"
            })
        }
        let todaySale: any = 0;
        let totalItemSaleToday: any = 0;
        let todayExpense: any = 0;
        const totalSale = await SalesDB.getTotalSale({ id });
        const totalExpense = await ExpenseDB.getTotalExpense({ id });
        const totalShops = await ShopsDB.totalShops({ id });
        const pendingMoney = await CustomerCreditsDB.getPendingMoney({ id: id });
        if (shopId) {
            todaySale = await SalesDB.getTodaySale({ shopId });
            totalItemSaleToday = await SalesDB.getTodayItemSale({ shopId });
            todayExpense = await ExpenseDB.todayExpense({ id });
        }

        log.info(`[${C}][${F}], Total Sale: [${totalSale}], Total Expense: [${totalExpense}], Total Shops: [${totalShops}], Pending Money: [${pendingMoney}], Details fetched successfully`);
        return res.status(200).json({
            message: "User details fetched successfully",
            data: {
                name: user.name,
                phone: user.phone,
                totalsale: totalSale.amount || 0,
                totalexpense: totalExpense.totalExpense || 0,
                totalshops: totalShops.totalShops || 0,
                pendingmoney: pendingMoney.totalAmount || 0,
                todaysale: shopId ? todaySale.totalSale || 0 : 0,
                totalitemsale: shopId ? totalItemSaleToday.totalItemSold || 0 : 0,
                todayExpense: shopId ? todayExpense.totalExpense || 0 : 0
            }
        })
    }
    catch (error) {
        log.info(`[${C}][${F}], Error: ${error}`);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

export default User;