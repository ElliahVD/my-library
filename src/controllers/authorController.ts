import { NextFunction, Request, Response } from "express";
import authorDb from "../db/authorDb";
import { Author } from "../db/definitions/author";
import path from 'path';

async function getAllAuthors(req: Request, res: Response) {
    const result: Author[] = await authorDb.getAuthorsDB();
    console.log(result);
    // res.status(200).send({ users: result });
    res.status(200).render('authors', { data: result });
}

async function getAuthor(req: Request, res: Response) {
    const { authorId } = req.params;
    const result: Author = await authorDb.getAuthorById(parseInt(authorId));
    res.status(200).render('authors', { data: result });
    // res.status(200).send({ users: result });
}

async function insertAuthor(req: Request, res: Response, next: NextFunction) {
    try {
        const { firstname, lastname, id_country } = req.body;
        const result = await authorDb.insertAuthorDB(firstname, lastname, id_country);
        if (result) {
            res.status(201).render('authors', { data: result });
        } else {
            res.status(500).send('Internal server error');
        }
    } catch (error: any) {
        next(error)
    }
}

async function updateAuthor(req: Request, res: Response, next: NextFunction) {
    try {
        const authorId = req.params.id;
        const { firstname, lastname, id_country } = req.body;
        const result = await authorDb.updateAuthor(firstname, lastname, id_country);
        if (result) {
            res.status(200).render('authors', { data: result });
        } else {
            res.status(404).send('Author not found');
        }
    } catch (error: any) {
        next(error);
    }
}

async function deleteAuthor(req: Request, res: Response, next: NextFunction) {
    try {
        const authorId = req.params.id;
        const result = await authorDb.deleteAuthor(parseInt(authorId));
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send('Author not found');
        }
    } catch (error: any) {
        next(error);
    }
}

export default {
    getAllAuthors,
    getAuthor,
    insertAuthor,
    updateAuthor,
    deleteAuthor
}
