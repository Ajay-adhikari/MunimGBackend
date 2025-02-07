import { Request, Response } from 'express';

// Extend Request for custom properties
export interface CustomRequest extends Request {
    id?: number;
    email?: string;

}

export interface CustomResponse extends Response {

}


