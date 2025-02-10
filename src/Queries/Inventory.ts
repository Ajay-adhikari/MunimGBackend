import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { InventoryType } from "../Schemas/InventorySchema";
import e from "express";

const InventoryDB: any = {};
InventoryDB.add = async ({ shopId, name, sellingPrice, quantity, margin, costPrice }: InventoryType) => {
    const query = `INSERT INTO Inventory (shopId, name, sellingPrice, quantity, margin, costPrice) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await sequelize.query(query, {
        replacements: [shopId, name, sellingPrice, quantity, margin, costPrice],
        type: QueryTypes.INSERT
    })
    return result;

}

InventoryDB.isExist = async ({ shopId, name }: InventoryType) => {
    const query = `SELECT * FROM Inventory WHERE shopId = ? AND LOWER(name) = LOWER(?)`;
    const result = await sequelize.query(query, {
        replacements: [shopId, name],
        type: QueryTypes.SELECT
    })
    if (result.length > 0) return true;
    return false;
}

InventoryDB.list = async ({ shopId, page, limit }: { shopId: number, page: number, limit: number }) => {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM Inventory WHERE shopId = ? LIMIT ? OFFSET ?`;
    const result = await sequelize.query(query, {
        replacements: [shopId, limit, offset],
        type: QueryTypes.SELECT
    })
    if (result.length > 0) return result;
    return [];
}

InventoryDB.removeAll = async ({ shopId }: { shopId: number }) => {
    const query = `DELETE FROM Inventory WHERE shopId = ?`;
    const result = await sequelize.query(query, {
        replacements: [shopId],
        type: QueryTypes.DELETE
    })
    return true;
}

InventoryDB.deleteById = async ({ id, shopId }: InventoryType) => {
    const query = `DELETE FROM Inventory WHERE id = ? and shopId = ? `;
    const result = await sequelize.query(query, {
        replacements: [id, shopId],
        type: QueryTypes.DELETE
    })
    return true;
}

InventoryDB.edit = async ({ id, shopId, name, sellingPrice, quantity, margin, costPrice }: InventoryType) => {
    const query = `UPDATE Inventory SET name = ?, sellingPrice = ?, quantity = ?, margin = ?, costPrice = ? WHERE id = ? and shopId = ?`;
    const result = await sequelize.query(query, {
        replacements: [name, sellingPrice, quantity, sellingPrice - costPrice, costPrice, id, shopId],
        type: QueryTypes.UPDATE
    })
    return true;
}

InventoryDB.totalShopItems = async ({ shopId }: { shopId: number }) => {
    const query = `SELECT COUNT(*) AS total FROM Inventory WHERE shopId = ?`;
    const result = await sequelize.query(query, {
        replacements: [shopId],
        type: QueryTypes.SELECT
    })
    return result[0];
}

InventoryDB.getById = async ({ id, shopId }: InventoryType) => {
    const query = `SELECT * FROM Inventory WHERE id = ? and shopId = ?`;
    const result = await sequelize.query(query, {
        replacements: [id, shopId],
        type: QueryTypes.SELECT
    })
    return result[0];
}

InventoryDB.updateQuantity = async ({ id, shopId, quantity }: InventoryType) => {
    const query = `UPDATE Inventory SET quantity = quantity - ? WHERE id = ? and shopId = ?`;
    const result = await sequelize.query(query, {
        replacements: [quantity, id, shopId],
        type: QueryTypes.UPDATE
    })
    return true;
}

export default InventoryDB;