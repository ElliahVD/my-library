import { NextFunction, Request, Response } from "express";
import { Gender } from "../db/definitions/gender";
import genderDb from "../db/genderDb";

async function getAllGenders(req: Request, res: Response) {
    const result: Gender[] = await genderDb.getGendersDB();
    console.log(result);
    // res.status(200).send({ users: result });
    res.status(200).render('genders', { data: result });
}

async function getGender(req: Request, res: Response) {
    const { genderId } = req.params;
    const result: Gender = await genderDb.getGenderById(parseInt(genderId));
    res.status(200).render('genders', { data: result });
    // res.status(200).send({ users: result });
}

async function insertGender(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body;
        const result = await genderDb.insertGenderDB(name);
        if (result) {
            res.status(201).render('genders', { data: result });
        } else {
            res.status(500).send('Internal server error');
        }
    } catch (error: any) {
        next(error)
    }
}

async function updateGender(req: Request, res: Response, next: NextFunction) {
    try {
        const genderId = req.params.id;
        const { name } = req.body;
        const result = await genderDb.updateGenderDB(parseInt(genderId), name);
        if (result) {
            res.status(200).render('genders', { data: result });
        } else {
            res.status(404).send('Gender not found');
        }
    } catch (error: any) {
        next(error);
    }
}

async function deleteGender(req: Request, res: Response, next: NextFunction) {
    try {
        const genderId = req.params.id;
        const result = await genderDb.deleteGenderDB(parseInt(genderId));
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send('Gender not found');
        }
    } catch (error: any) {
        next(error);
    }
}



export default {
    getAllGenders,
    getGender,
    insertGender,
    updateGender,
    deleteGender
}
