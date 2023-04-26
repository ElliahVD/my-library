import { OkPacket, RowDataPacket } from "mysql2";
import dbService, { MySqlReturnType } from "./db";
import { User } from "./definitions/user";

async function getUsersDB(): Promise<User[]> {
    const connect = new dbService.DbService();
    const result: User[] = []
    const getUsersResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM app_user", []);

    console.log('User Service -- getUsersDB -- getUsersResponse: ', getUsersResponse)

    for (const usersFromDb of getUsersResponse as RowDataPacket[] as User[]) {
        result.push(usersFromDb)
    }
    return result
}

async function getUserById(id: number): Promise<User> {
    const connect = new dbService.DbService();
    const getUserResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM app_user WHERE id = ?", [id]);
    const user = getUserResponse as RowDataPacket as User
    // const utilisateur = donne la reponse en format rowdataP mais qui est aussi un format user
    console.log('User Service -- getUserById -- user: ', user)
    return user
}

async function isExist(pseudo: string, password: string): Promise<boolean> {
    const connect = new dbService.DbService();
    const getUserResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM app_user WHERE pseudo = ? AND password = ?", [pseudo, password]);
    const user = getUserResponse as RowDataPacket as User
    // const utilisateur = donne la reponse en format rowdataP mais qui est aussi un format user
    console.log('User Service -- getUserById -- user: ', user)
    return user ? true : false
}

async function getUserByPseudoPassword(pseudo: string, password: string): Promise<User> {
    const connect = new dbService.DbService();
    const getUserResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM app_user WHERE pseudo = ? AND password = ?", [pseudo, password]);
    const user = getUserResponse as RowDataPacket as User
    // const utilisateur = donne la reponse en format rowdataP mais qui est aussi un format user
    console.log('User Service -- getUserById -- user: ', user)
    return user
}

async function insertUserDB(pseudo: string, password: string): Promise<User | null> {
    try {
        const connect = new dbService.DbService();
        const insertUserResponse: MySqlReturnType = await connect.runQuery("INSERT INTO app_user (pseudo,password) values (?,?)", [pseudo, password]);
        console.log('UserDb Service -- insert response: ', insertUserResponse)

        if ((insertUserResponse as OkPacket).affectedRows > 0) {
            // * get User grace au okpacket on peu récupérer l'id sans avoir à chercher par le nom et password et réécrire la fonction getUserById
            const user: User = await getUserById((insertUserResponse as OkPacket).insertId)
            return user;
        } else {
            return null;
        }
    } catch (error: any) {
        console.log('UserDb Service -- insert ERROR response: ', error)
        throw error
    }
}

async function updateUserDB(id: number, pseudo: string, password: string) {
    const connect = new dbService.DbService();
    return await connect.runQuery("UPDATE app_user SET pseudo=?, password=? WHERE id=?", [pseudo, password, id]);
}

async function deleteUserDB(id: number) {
    const connect = new dbService.DbService();
    return await connect.runQuery("DELETE FROM app_user where id = ? ", [id]);
}

export default {
    getUsersDB,
    getUserById,
    insertUserDB,
    updateUserDB,
    deleteUserDB,
    isExist,
    getUserByPseudoPassword
}