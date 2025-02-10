import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { SalesType } from "../Schemas/SalesSchema";
import { UserType } from "../Schemas/UserSchema";
import e from "express";

const SalesDB: any = {};

SalesDB.getTotalSale = async ({ id }: UserType) => {
    const query = `SELECT SUM(s.amount) AS amount FROM  Sales s JOIN Shops sh ON s.shopId = sh.id JOIN Users u ON sh.userId = u.id WHERE u.id = ?`;
    const result = await sequelize.query(query,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        }
    )
    if (result.length > 0) return result[0];
    return 0;
}

SalesDB.add = async ({ productId, shopId, profit, quantity, amount }: SalesType) => {
    const query = `INSERT INTO Sales (productId, shopId, quantity, amount, profit) VALUES (?, ?, ?, ?, ?)`;
    const result = await sequelize.query(query,
        {
            replacements: [productId, shopId, quantity, amount, profit],
            type: QueryTypes.INSERT
        }
    )
    return result;
}

SalesDB.updateSale = async ({ productId, shopId, profit, quantity, amount, id }: SalesType) => {
    const query = `UPDATE Sales SET quantity = quantity + ?, amount = amount + ?, profit = profit + ? WHERE id = ?`;
    const result = await sequelize.query(query,
        {
            replacements: [productId, shopId, quantity, amount, profit, id],
            type: QueryTypes.UPDATE
        }
    )
    return result;
}

SalesDB.getSaleForToday = async ({ productId, shopId }: SalesType) => {
    const query = `SELECT * FROM Sales WHERE productId = ? and shopId = ?  AND DATE(createdAt) = CURDATE()`;
    const result = await sequelize.query(query,
        {
            replacements: [productId, shopId],
            type: QueryTypes.SELECT
        }
    )
    if (result.length > 0) return result[0];
    return 0;
}

SalesDB.getTodaySale = async ({ shopId }: SalesType) => {
    const query = `SELECT SUM(amount) AS totalSale  FROM Sales WHERE shopId = ? AND DATE(createdAt) = CURRENT_DATE;`;
    const result = await sequelize.query(query,
        {
            replacements: [shopId],
            type: QueryTypes.SELECT
        }
    )
    if (result.length > 0) return result[0];
    return 0;
}

SalesDB.getTodayItemSale = async ({ shopId }: SalesType) => {
    const query = `SELECT SUM(quantity) AS totalItemSold  FROM Sales WHERE shopId = ? AND DATE(createdAt) = CURRENT_DATE;
`;
    const result = await sequelize.query(query,
        {
            replacements: [shopId],
            type: QueryTypes.SELECT
        }
    )
    if (result.length > 0) return result[0];
    return 0;
}

export default SalesDB;