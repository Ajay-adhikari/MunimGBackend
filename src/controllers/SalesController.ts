import log from "../logs/log";
import InventoryDB from "../Queries/Inventory";
import SalesDB from "../Queries/SalesQueries";
import { CustomRequest, CustomResponse } from "../types/CustomRequest";

const SalesController: any = {};

SalesController.add = async (req: CustomRequest, res: CustomResponse) => {
    const C = "SalesController";
    const F = "add";
    try {
        const id = req.id;
        const { shopId, items } = req.body;

        log.info(`[${C}][${F}], id: [${id}], shopId: [${shopId}], items: [${items}], Adding Sales`);

        for (const item of items) {
            console.log(item);
            const { id, quantity, price, profit } = item;
            const product = await InventoryDB.getById({ id, shopId });
            if (!product || product.quantity < quantity) {
                log.info(`[${C}][${F}], id: [${id}], shopId: [${shopId}], items: [${items}], Item not found`);
                return res.status(400).json({
                    message: "Not enough stock for some items"

                })
            }
            const existingSale = await SalesDB.getSaleForToday({ productId: id, shopId });
            console.log(existingSale);
            if (existingSale) {
                // Update existing sale for the product sold today
                await InventoryDB.updateQuantity({ id, shopId, quantity });
                await SalesDB.updateSale({ productId: id, shopId, profit, quantity, amount: price, id: existingSale.id });
            }
            else {
                await InventoryDB.updateQuantity({ id, shopId, quantity });
                await SalesDB.add({ productId: id, shopId, profit, quantity, amount: price });
            }
            log.info(`[${C}][${F}], id: [${id}], shopId: [${shopId}], items: [${items}], sales added Successfully`);
        }
        return res.status(200).json({
            message: "Sales added"
        })
    }
    catch (error) {
        log.error(`[${C}][${F}], Error: [${error}]`);
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }


}

export default SalesController;