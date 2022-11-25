import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const createUser = new CreateUserService();

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  }
}
