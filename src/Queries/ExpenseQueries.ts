import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { UserType } from "../Schemas/UserSchema";
import { ExpenseType } from "../Schemas/ExpenseSchema";
const ExpenseDB: any = {};

ExpenseDB.getTotalExpense = async ({ id }: UserType) => {
    console.log("expenseDb");
    const query = `SELECT SUM(e.amount) AS totalExpense FROM Expenses e JOIN Shops sh ON e.shopId = sh.id JOIN Users u ON sh.userId = u.id WHERE u.id = ?`;
    const result = await sequelize.query(query,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        }
    )
    if (result.length > 0) return result[0];
    return 0;
}

ExpenseDB.add = async ({ shopId, amount, description, category, paymentMode, paidTo }: ExpenseType) => {
    const query = `INSERT INTO Expenses (shopId, amount, description, category, paymentMode, paidTo) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await sequelize.query(query,
        {
            replacements: [shopId, amount, description, category, paymentMode, paidTo],
            type: QueryTypes.INSERT
        }
    )
    return result;
}

ExpenseDB.list = async ({ shopId, page, limit }: { shopId: ExpenseType, page: number, limit: number }) => {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM Expenses WHERE shopId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
    const result = await sequelize.query(query,
        {
            replacements: [shopId, limit, offset],
            type: QueryTypes.SELECT
        }
    )
    return result;
}
export default ExpenseDB;