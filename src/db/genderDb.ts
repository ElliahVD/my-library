import { OkPacket, RowDataPacket } from "mysql2";
import dbService, { MySqlReturnType } from "./db";
import { Gender } from "./definitions/gender";

async function getGendersDB(): Promise<Gender[]> {
    const connect = new dbService.DbService();
    const result: Gender[] = []
    const getGendersResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM gender", []);

    console.log('Gender Service -- getGendersDB -- getGendersResponse: ', getGendersResponse)

    for (const gendersFromDb of getGendersResponse as RowDataPacket[] as Gender[]) {
        result.push(gendersFromDb)
    }
    return result
}

async function getGenderById(id: number): Promise<Gender> {
    const connect = new dbService.DbService();
    const getGenderResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM gender WHERE id = ?", [id]);
    const gender = getGenderResponse as RowDataPacket as Gender
    console.log('Gender Service -- getGenderById -- gender: ', gender)
    return gender
}

async function insertGenderDB(name: string): Promise<Gender | null> {
    try {
        const connect = new dbService.DbService();
        const insertGenderResponse: MySqlReturnType = await connect.runQuery("INSERT INTO gender (name) values (?)", [name]);
        console.log('GenderDb Service -- insert response: ', insertGenderResponse)

        if ((insertGenderResponse as OkPacket).affectedRows > 0) {
            const gender: Gender = await getGenderById((insertGenderResponse as OkPacket).insertId)
            return gender;
        } else {
            return null;
        }
    } catch (error: any) {
        console.log('GenderDb Service -- insert ERROR response: ', error)
        throw error
    }
}

async function updateGenderDB(id: number, name: string) {
    const connect = new dbService.DbService();
    return await connect.runQuery("UPDATE gender SET name=? WHERE id=?", [name, id]);
}

async function deleteGenderDB(id: number) {
    const connect = new dbService.DbService();
    return await connect.runQuery("DELETE FROM gender where id = ? ", [id]);
}

export default {
    getGendersDB,
    getGenderById,
    insertGenderDB,
    updateGenderDB,
    deleteGenderDB
}
