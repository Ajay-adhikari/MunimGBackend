import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { SalesType } from "../Schemas/SalesSchema";
import { UserType } from "../Schemas/UserSchema";
import e from "express";

const SalesDB: any = {};

SalesDB.getTotalSale = async ({ id }: UserType) => {
    const query = `SELECT SUM(s.amount) AS amount FROM  sales s JOIN shops sh ON s.shopId = sh.id JOIN users u ON sh.userId = u.id WHERE u.id = ?`;
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
    const query = `INSERT INTO sales (productId, shopId, quantity, amount, profit) VALUES (?, ?, ?, ?, ?)`;
    const result = await sequelize.query(query,
        {
            replacements: [productId, shopId, quantity, amount, profit],
            type: QueryTypes.INSERT
        }
    )
    return result;
}

SalesDB.updateSale = async ({ productId, shopId, profit, quantity, amount, id }: SalesType) => {
    const query = `UPDATE sales SET quantity = quantity + ?, amount = amount + ?, profit = profit + ? WHERE id = ?`;
    const result = await sequelize.query(query,
        {
            replacements: [productId, shopId, quantity, amount, profit, id],
            type: QueryTypes.UPDATE
        }
    )
    return result;
}

SalesDB.getSaleForToday = async ({ productId, shopId }: SalesType) => {
    const query = `SELECT * FROM sales WHERE productId = ? and shopId = ?  AND DATE(createdAt) = CURDATE()`;
    const result = await sequelize.query(query,
        {
            replacements: [productId, shopId],
            type: QueryTypes.SELECT
        }
    )
    if (result.length > 0) return result[0];
    return 0;
}

export default SalesDB;