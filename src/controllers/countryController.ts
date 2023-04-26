import { NextFunction, Request, Response } from "express";
import countryDb from "../db/countryDb";
import { Country } from "../db/definitions/country";

async function getAllCountry(req: Request, res: Response) {
    const result: Country[] = await countryDb.getCountriesDB();
    console.log(result);
    // res.status(200).send({ users: result });
    res.status(200).render('countries', { data: result });
}

async function getCountry(req: Request, res: Response) {
    const { countryId } = req.params;
    const result: Country = await countryDb.getCountryById(parseInt(countryId));
    res.status(200).render('countries', { data: result });
    // res.status(200).send({ users: result });
}

async function insertCountry(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body;
        const result = await countryDb.insertCountryDB(name);
        if (result) {
            res.status(201).send("Insertion OK");
        } else {
            res.status(500).send('Internal server error');
        }
    } catch (error: any) {
        next(error);
    }
}

async function updateCountry(req: Request, res: Response, next: NextFunction) {
    try {
        const countryId = req.params.id;
        const { name } = req.body;
        const result = await countryDb.updateCountryDB(parseInt(countryId), name);
        if (result) {
            res.status(200).send("Update OK");
        } else {
            res.status(404).send('Country not found');
        }
    } catch (error: any) {
        next(error);
    }
}

async function deleteCountry(req: Request, res: Response, next: NextFunction) {
    try {
        const countryId = req.params.id;
        const result = await countryDb.deleteCountryDB(parseInt(countryId));
        if (result) {
            res.status(200).send("Delete OK");
        } else {
            res.status(404).send('Country not found');
        }
    } catch (error: any) {
        next(error);
    }
}

export default {
    getCountry,
    getAllCountry,
    insertCountry,
    updateCountry,
    deleteCountry
}
