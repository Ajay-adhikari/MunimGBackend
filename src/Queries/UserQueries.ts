import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { UserType } from "../Schemas/UserSchema";

const UserDB: any = {};

UserDB.insertUser = async ({ name, email, password, phone }: UserType) => {
    const query = `INSERT INTO Users (name, email , password , phone) VALUES (?, ?, ?, ?)`;
    const result = await sequelize.query(query,
        {
            replacements: [name, email, password, phone],
            type: QueryTypes.INSERT
        }
    )
    return result;
}

UserDB.getUser = async ({ id }: UserType) => {
    const query = `SELECT * FROM Users WHERE id=?`;
    const result = await sequelize.query(query,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        }
    )
    if (result.length > 0) return result[0];
    return false;

}

UserDB.getUserByEmail = async ({ email }: UserType) => {
    const query = `SELECT * FROM Users WHERE email = ?`;
    const result = await sequelize.query(query,
        {
            replacements: [email],
            type: QueryTypes.SELECT
        }
    )
    if (result.length > 0) return result[0];
    return false;
}

export default UserDB;