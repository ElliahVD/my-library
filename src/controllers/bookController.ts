import { NextFunction, Request, Response } from "express";
import bookDb from "../db/bookDb";
import { Book } from "../db/definitions/book";
import path from 'path';

async function getAllBooks(req: Request, res: Response) {
    const result: Book[] = await bookDb.getBooksDB();
    console.log(result);
    // res.status(200).send({ users: result });
    res.status(200).render('books', { data: result });
}

async function getBook(req: Request, res: Response) {
    const { bookId } = req.params;
    const result: Book = await bookDb.getBookById(parseInt(bookId));
    res.status(200).render('books', { data: result });
    // res.status(200).send({ users: result });
}

async function insertBook(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, id_author, resume, publication, id_gender } = req.body;
        const result = await bookDb.insertBookDB(title, id_author, resume, publication, id_gender);
        if (result) {
            res.status(201).render('books', { data: result });
        } else {
            res.status(500).send('Internal server error');
        }
    } catch (error: any) {
        next(error)
    }
}

async function updateBook(req: Request, res: Response, next: NextFunction) {
    try {
        const bookId = req.params.id;
        const { title, id_author, resume, publication, id_gender } = req.body;
        const result = await bookDb.updateBook(title, id_author, resume, publication, id_gender);
        if (result) {
            res.status(200).render('books', { data: result });
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error: any) {
        next(error);
    }
}

async function deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
        const bookId = req.params.id;
        const result = await bookDb.deleteBook(parseInt(bookId));
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error: any) {
        next(error);
    }
}



export default {
    getAllBooks,
    getBook,
    insertBook,
    updateBook,
    deleteBook
}
