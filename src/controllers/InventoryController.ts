import log from "../logs/log";
import InventoryDB from "../Queries/Inventory";
import ShopsDB from "../Queries/ShopsQueries";
import { CustomRequest, CustomResponse } from "../types/CustomRequest";

const Inventory: any = {};

Inventory.add = async (req: CustomRequest, res: CustomResponse) => {
    const C = "InventoryController";
    const F = "add";
    try {
        let { shopId, name, sellingPrice, quantity, margin, costPrice } = req.body;
        const id = req.id;
        const shop = await ShopsDB.isExistByShopId({ id: shopId, userId: id });
        if (!shop) {
            log.info(`[${C}][${F}], id: [${id}], shopId: [${shopId}], name: [${name}], sellingPrice: [${sellingPrice}], quantity: [${quantity}], margin: [${margin}], costPrice: [${costPrice}], Shop not found`);
            return res.status(400).json({
                message: "Shop not found"
            })
        }
        log.info(`[${C}][${F}], id: [${id}], shopId: [${shopId}], name: [${name}], sellingPrice: [${sellingPrice}], quantity: [${quantity}], margin: [${margin}], costPrice: [${costPrice}] , Adding Shop`);
        const isExist = await InventoryDB.isExist({ name: name.trim(), shopId });
        if (isExist) {
            log.info(`[${C}][${F}], id: [${id}], shopId: [${shopId}], name: [${name}], sellingPrice: [${sellingPrice}], quantity: [${quantity}], margin: [${margin}], costPrice: [${costPrice}], Item already exist`);
            return res.status(400).json({
                message: "Item already exist"
            });
        }
        const item = await InventoryDB.add({ shopId, name, sellingPrice, quantity, margin, costPrice });

        log.info(`[${C}][${F}], id: [${id}], shopId: [${shopId}], name: [${name}], sellingPrice: [${sellingPrice}], quantity: [${quantity}], margin: [${margin}], costPrice: [${costPrice}] , Item added Successfully`);

        res.status(200).json({
            message: "Item added"
        })

    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }

}

Inventory.list = async (req: CustomRequest, res: CustomResponse) => {
    const C = "InventoryController";
    const F = "list";
    try {
        let { shopId, page }: any = req.query;
        const shop = await ShopsDB.isExistByShopId({ id: shopId, userId: req.id });
        if (!shop) {
            log.info(`[${C}][${F}], id: [${req.id}], shopId: [${shopId}], Shop not found`);
            return res.status(400).json({
                message: "Shop not found"
            })
        }
        log.info(`[${C}][${F}], id: [${req.id}], shopId: [${shopId}], Getting Items`);

        let limit = 8;
        if (!page) {
            page = 1;
            limit = 1000000;
        }
        const items = await InventoryDB.list({ shopId, page: page, limit: limit });
        const total = await InventoryDB.totalShopItems({ shopId });
        items.total = total.total;

        log.info(`[${C}][${F}], id: [${req.id}], shopId: [${shopId}], Items fetched Successfully`);
        return res.status(200).json({
            message: "Items fetched Successfully",
            data: items
        })

    }
    catch (error) {
        log.info(`[${C}][${F}], Error: ${error}`);
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

Inventory.delete = async (req: CustomRequest, res: CustomResponse) => {
    const C = "InventoryController";
    const F = "delete";
    try {
        const { shopId, itemId } = req.query;
        if (!shopId || !itemId) {
            log.info(`[${C}][${F}], id: [${req.id}], shopId: [${shopId}], itemId: [${itemId}], Missing Parameters`);
            return res.status(400).json({
                message: "Missing Parameters"
            })
        }
        const shop = await ShopsDB.isExistByShopId({ id: shopId, userId: req.id });
        if (!shop) {
            log.info(`[${C}][${F}], id: [${req.id}], shopId: [${shopId}], itemId: [${itemId}], Shop not found`);
            return res.status(400).json({
                message: "Shop not found"
            })
        }
        log.info(`[${C}][${F}], id: [${req.id}], shopId: [${shopId}], itemId: [${itemId}], Deleting Items`);

        const items = await InventoryDB.deleteById({ id: itemId, shopId });

        log.info(`[${C}][${F}], id: [${req.id}], shopId: [${shopId}], itemId: [${itemId}], Items deleted Successfully`);
        return res.status(200).json({
            message: "Items deleted Successfully"
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

Inventory.edit = async (req: CustomRequest, res: CustomResponse) => {
    const C = "InventoryController";
    const F = "Edit";
    try {
        const { id, shopId, name, sellingPrice, quantity, margin, costPrice } = req.body;
        const shop = await ShopsDB.isExistByShopId({ id: shopId, userId: req.id });
        if (!shop) {

            log.info(`[${C}][${F}], id: [${req.id}], shopId: [${shopId}], Shop not found`);
            return res.status(400).json({
                message: "Shop not found"
            })
        }
        const item = await InventoryDB.edit({ id, shopId, name, sellingPrice, quantity, margin, costPrice });
        log.info(`[${C}][${F}], id: [${req.id}], shopId: [${shopId}], itemId: [${id}], Item edited Successfully`);
        return res.status(200).json({
            message: "Item edited Successfully"
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


export default Inventory;