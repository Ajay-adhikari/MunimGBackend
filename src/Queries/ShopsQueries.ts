import { QueryTypes } from "sequelize";
import { UserType } from "../Schemas/UserSchema";
import sequelize from "../config/database";
import { ShopType } from "../Schemas/ShopSchema";
import Shops from "../controllers/ShopsController";
const ShopsDB: any = {};

ShopsDB.totalShops = async ({ id }: UserType) => {
    const query = `SELECT COUNT(*) AS totalShops FROM Shops WHERE userId = ?`;
    const result = await sequelize.query(query, {
        replacements: [id],
        type: QueryTypes.SELECT
    })
    if (result.length > 0) return result[0];
    return 0;
}

ShopsDB.add = async ({ userId, name, address, phone, description }: ShopType) => {
    const query = `INSERT INTO Shops (userId, name, address, phone, description) VALUES (?, ?, ?, ?,?)`;
    const result = await sequelize.query(query, {
        replacements: [userId, name, address, phone, description],
        type: QueryTypes.INSERT
    })
    if (result.length > 0) return true;
    return 0;
}

ShopsDB.isExist = async ({ userId, name, address, phone }: ShopType) => {
    const query = `SELECT * FROM Shops WHERE userId = ? AND name = ? AND address = ? AND phone = ?`;
    const result = await sequelize.query(query, {
        replacements: [userId, name, address, phone],
        type: QueryTypes.SELECT
    })
    if (result.length > 0) return true;
    return false;
}

ShopsDB.isExistByShopId = async ({ id, userId }: ShopType) => {
    const query = `SELECT * FROM Shops WHERE  id=? and userId = ? `;
    const result = await sequelize.query(query, {
        replacements: [id, userId],
        type: QueryTypes.SELECT
    })
    if (result.length > 0) return true;
    return false;
}

ShopsDB.getAllShops = async ({ userId, page, limit }: { userId: ShopType, page: number, limit: number }) => {
    ;
    const offset = (page - 1) * limit;
    const query = `SELECT id , name , phone, address, description FROM Shops WHERE userId = ? LIMIT ? OFFSET ?`;
    const result = await sequelize.query(query, {
        replacements: [userId, limit, offset],
        type: QueryTypes.SELECT
    })
    if (result.length > 0) return result;
    return [];
}

ShopsDB.remove = async ({ id, userId }: ShopType) => {
    const query = `DELETE FROM Shops WHERE id = ? and userId = ?`;
    const result = await sequelize.query(query, {
        replacements: [id, userId],
        type: QueryTypes.DELETE
    })
    return result;
}

export default ShopsDB;