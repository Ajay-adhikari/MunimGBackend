import { Request, Response, NextFunction } from "express";
import { z as zod, ZodError, ZodSchema } from 'zod'
import jwt from "jsonwebtoken";
import log from "../logs/log";
import { CustomRequest, CustomResponse } from "../types/CustomRequest";

export const validateSchema = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    const C = "Validation";
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map((issue: any) => ({
                message: `${issue.message}`,
            }))
            log.info(`[${C}], error: ${error.message}`);
            res.status(400).json({ error: errorMessages[errorMessages.length - 1].message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export const validate = (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
    const C = "Validate";
    try {
        const token: string = req.headers.authorization || "";
        if (!token) {
            log.info(`[${C}], Token not found`);
            res.status(401).json({ message: 'Unauthorized' });
        }
        var parts = token.split(' ');
        const secretJWT = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
        const decoded: any = jwt.verify(parts[1], secretJWT);
        req.id = decoded.id;
        next();
    }
    catch (error) {
        log.info(`[${C}], Error: ${error}`);
        res.status(401).json({ message: 'InvalidToken' });
    }
}
