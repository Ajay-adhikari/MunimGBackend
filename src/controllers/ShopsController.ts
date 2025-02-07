import log from "../logs/log";
import InventoryDB from "../Queries/Inventory";
import ShopsDB from "../Queries/ShopsQueries";
import { CustomRequest, CustomResponse } from "../types/CustomRequest";
const Shops: any = {};

Shops.add = async (req: CustomRequest, res: CustomResponse) => {
    const C = "ShopsController";
    const F = "add";
    try {
        const id = req.id;
        const { name, address, phone, description } = req.body;

        log.info(`[${C}][${F}], id: [${id}], name: [${name}], address: [${address}], phone: [${phone}], description: [${description}] Adding shop`);

        const alreadyExists = await ShopsDB.isExist({ userId: id, name, address, phone });
        if (alreadyExists) {
            log.info(`[${C}][${F}], id: [${id}], name: [${name}], address: [${address}], phone: [${phone}], Shop already exists`);
            return res.status(400).json({ message: "This Shop Already Exists" });

        }

        const shop = await ShopsDB.add({ userId: id, name, address, phone, description });

        log.info(`[${C}][${F}], id: [${id}], name: [${name}], address: [${address}], phone: [${phone}], Shop Added Successfully`);

        return res.status(200).json({ message: "Shop Added Successfully" });
    }
    catch (error) {
        log.info(`[${C}][${F}], Error: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

Shops.list = async (req: CustomRequest, res: CustomResponse) => {
    const C = "ShopsController";
    const F = "list";
    try {
        const id = req.id;
        const { page } = req.query;
        log.info(`[${C}][${F}], id: [${id}], Getting Shops`);

        const limit = 6;
        console.log(req.query);
        const shops = await ShopsDB.getAllShops({ userId: id, page, limit });
        log.info(`[${C}][${F}], id: [${id}], Shops List Send Successfully`);
        return res.status(200).json({
            message: 'Shop List Send Successfully',
            data: shops
        });
    }
    catch (error) {
        log.info(`[${C}][${F}], Error: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

Shops.remove = async (req: CustomRequest, res: CustomResponse) => {
    const C = "ShopsController";
    const F = "remove"
    try {
        const userId = req.id;
        const { shopId } = req.body;

        if (!shopId) {
            return res.status(400).json({ message: "Shop Id is required" });
        }

        const exist = await ShopsDB.isExistByShopId({ id: shopId, userId: userId });
        if (!exist) {
            log.info(`[${C}][${F}], userId: [${userId}], shopId: ${shopId} Shop Not Found`);
            return res.status(400).json({ message: "Shop Not Found" });
        }

        log.info(`[${C}][${F}], userId: [${userId}], shopId: ${shopId} Removing Shop`);

        const item = await InventoryDB.removeAll({ shopId });

        const shop = await ShopsDB.remove({ id: shopId, userId: userId });

        log.info(`[${C}][${F}], id: [${userId}], shopId: ${shopId} Shop Removed Successfully`);

        return res.status(200).json({ message: "Shop Removed Successfully" });
    }
    catch (error) {
        log.info(`[${C}][${F}], Error: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });

    }
}

export default Shops;