import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { CustomerCreditType } from "../Schemas/CustomerCreditSchema";
import { UserType } from "../Schemas/UserSchema";
const CustomerCreditsDB: any = {};

CustomerCreditsDB.getPendingMoney = async ({ id }: UserType) => {
    const query = `SELECT SUM(cc.totalAmount) AS totalAmount  FROM customercredits cc  JOIN shops s ON cc.shopId = s.id  WHERE s.userId = ?`;
    const result = await sequelize.query(query,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });
    if (result.length > 0) return result[0];
    return 0;
}

export default CustomerCreditsDB;