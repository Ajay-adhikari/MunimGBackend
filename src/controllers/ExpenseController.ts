import log from "../logs/log";
import ExpenseDB from "../Queries/ExpenseQueries";
import { CustomRequest, CustomResponse } from "../types/CustomRequest";

const Expense: any = {};

Expense.add = async (req: CustomRequest, res: CustomResponse) => {
    const C = "ExpenseController";
    const F = "add";
    try {
        const id = req.id;
        const { shopId, amount, description, category, paymentMode, paidTo } = req.body;
        log.info(`[${C}][${F}], id: ${id}, shopId: ${shopId}, amount: ${amount}, description: ${description}, category: ${category}, paymentMode: ${paymentMode}, paidTo: ${paidTo}, Adding Expense`);
        const expense = await ExpenseDB.add({
            shopId,
            amount,
            description,
            category,
            paymentMode,
            paidTo,
        });
        log.info(`[${C}][${F}], id: ${id}, shopId: ${shopId}, amount: ${amount}, description: ${description}, category: ${category}, paymentMode: ${paymentMode}, paidTo: ${paidTo},  Expense Added Successfully`);
        return res.status(200).json({
            success: true,
            message: "Expense Added Successfully",
            expense
        })

    }
    catch (err) {
        log.info(`[${C}][${F}], Error: ${err}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err
        })
    }

}

Expense.list = async (req: CustomRequest, res: CustomResponse) => {
    const C = "ExpenseController";
    const F = "list";
    try {
        const id = req.id;
        const { shopId, page } = req.query;
        log.info(`[${C}][${F}], id: ${id}, shopId: ${shopId}, Listing Expenses`);
        if (!shopId) return res.status(400).json({
            success: false,
            message: "Shop Id is required",
        })

        const limit = 4;
        const expenses = await ExpenseDB.list({ shopId, page, limit });
        log.info(`[${C}][${F}], id: ${id}, shopId: ${shopId}, Expenses Listed Successfully`);
        return res.status(200).json({
            success: true,
            message: "Expenses Listed Successfully",
            expenses
        })
    }
    catch (err) {
        log.info(`[${C}][${F}], Error: ${err}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err
        })
    }
}

export default Expense;