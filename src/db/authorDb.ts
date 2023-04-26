import { OkPacket, RowDataPacket } from "mysql2";
import dbService, { MySqlReturnType } from "./db";
import { Author } from "../db/definitions/author";

async function getAuthorsDB(): Promise<Author[]> {
    const connect = new dbService.DbService();
    const result: Author[] = []
    const getAuthorsResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM author", []);

    console.log('Author Service -- getAuthorsDB -- getAuthorsResponse: ', getAuthorsResponse)

    for (const authorsFromDb of getAuthorsResponse as RowDataPacket[] as Author[]) {
        result.push(authorsFromDb)
    }
    return result
}

async function getAuthorById(id: number): Promise<Author> {
    const connect = new dbService.DbService();
    const getAuthorResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM author WHERE id = ?", [id]);
    const author = getAuthorResponse as RowDataPacket as Author
    // const utilisateur = donne la reponse en format rowdataP mais qui est aussi un format user
    console.log('Author Service -- getAuthorById -- author: ', author)
    return author
}

async function insertAuthorDB(firstname: string,
    lastname: string,
    id_country: number): Promise<Author | null> {
    try {
        const connect = new dbService.DbService();
        const insertAuthorResponse: MySqlReturnType = await connect.runQuery("INSERT INTO author (title, id_author,resume, publication, id_gender) values (?,?,?,?,?)", [firstname, lastname, id_country]);
        console.log('AuthorDb Service -- insert response: ', insertAuthorResponse)

        if ((insertAuthorResponse as OkPacket).affectedRows > 0) {
            const author: Author = await getAuthorById((insertAuthorResponse as OkPacket).insertId)
            return author;
        } else {
            return null;
        }
    } catch (error: any) {
        console.log('AuthorDb Service -- insert ERROR response: ', error)
        throw error
    }
}

async function updateAuthor(firstname: string,
    lastname: string,
    id_country: number) {
    const connect = new dbService.DbService();
    return await connect.runQuery("UPDATE author SET title=?, resume=?, publication=?, id_author=?, id_gender=? WHERE id=?", [firstname, lastname, id_country]);
}

async function deleteAuthor(id: number) {
    const connect = new dbService.DbService();
    return await connect.runQuery("DELETE FROM author where id = ? ", [id]);
}

export default {
    getAuthorById,
    getAuthorsDB,
    insertAuthorDB,
    updateAuthor,
    deleteAuthor
};
