import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { UserType } from "../Schemas/UserSchema";

const ExpenseDB: any = {};

ExpenseDB.getTotalExpense = async ({ id }: UserType) => {
    console.log("expenseDb");
    const query = `SELECT SUM(e.amount) AS totalExpense FROM expenses e JOIN shops sh ON e.shopId = sh.id JOIN users u ON sh.userId = u.id WHERE u.id = ?`;
    const result = await sequelize.query(query,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        }
    )
    if (result.length > 0) return result[0];
    return 0;
}

export default ExpenseDB;