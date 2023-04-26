import { OkPacket, RowDataPacket } from "mysql2";
import dbService, { MySqlReturnType } from "./db";
import { Book } from "./definitions/book";

async function getBooksDB(): Promise<Book[]> {
    const connect = new dbService.DbService();
    const result: Book[] = []
    const getBooksResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM book", []);

    console.log('Book Service -- getBooksDB -- getBooksResponse: ', getBooksResponse)

    for (const booksFromDb of getBooksResponse as RowDataPacket[] as Book[]) {
        result.push(booksFromDb)
    }
    return result
}

async function getBookById(id: number): Promise<Book> {
    const connect = new dbService.DbService();
    const getBookResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM book WHERE id = ?", [id]);
    const book = getBookResponse as RowDataPacket as Book
    // const utilisateur = donne la reponse en format rowdataP mais qui est aussi un format user
    console.log('Book Service -- getBookById -- book: ', book)
    return book
}

async function insertBookDB(title: string, id_author: number, resume: string, publication: string, id_gender: number): Promise<Book | null> {
    try {
        const connect = new dbService.DbService();
        const insertBookResponse: MySqlReturnType = await connect.runQuery("INSERT INTO book (title, id_author,resume, publication, id_gender) values (?,?,?,?,?)", [title, id_author, resume, publication, id_gender]);
        console.log('BookDb Service -- insert response: ', insertBookResponse)

        if ((insertBookResponse as OkPacket).affectedRows > 0) {
            const book: Book = await getBookById((insertBookResponse as OkPacket).insertId)
            return book;
        } else {
            return null;
        }
    } catch (error: any) {
        console.log('BookDb Service -- insert ERROR response: ', error)
        throw error
    }
}

async function updateBook(title: string, id_author: number, resume: string, publication: string, id_gender: number) {
    const connect = new dbService.DbService();
    return await connect.runQuery("UPDATE book SET title=?, resume=?, publication=?, id_author=?, id_gender=? WHERE id=?", [title, id_author, resume, publication, id_gender]);
}

async function deleteBook(id: number) {
    const connect = new dbService.DbService();
    return await connect.runQuery("DELETE FROM book where id = ? ", [id]);
}

export default {
    getBookById,
    getBooksDB,
    insertBookDB,
    updateBook,
    deleteBook
};
