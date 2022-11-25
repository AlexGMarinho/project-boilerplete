import { Request, Response } from "express";
import { formatUserResponse } from "../../../shared/userHelper";

export class ProfileController {
    async show(req: Request, res: Response): Promise<Response> {
        const user = req.user;

        return res.json(formatUserResponse(user))
    }
}