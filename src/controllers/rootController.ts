import { Request, Response } from "express";

const index = async (req: Request, res: Response) => {
    res.status(200).render('index');
};

export default { index };
