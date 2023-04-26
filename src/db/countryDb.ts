import { OkPacket, RowDataPacket } from "mysql2";
import dbService, { MySqlReturnType } from "./db";
import { Country } from "./definitions/country";

async function getCountriesDB(): Promise<Country[]> {
    const connect = new dbService.DbService();
    const result: Country[] = []
    const getCountriesResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM countries", []);

    console.log('Country Service -- getCountriesDB -- getCountriesResponse: ', getCountriesResponse)

    for (const countriesFromDb of getCountriesResponse as RowDataPacket[] as Country[]) {
        result.push(countriesFromDb)
    }
    return result
}

async function getCountryById(id: number): Promise<Country> {
    const connect = new dbService.DbService();
    const getCountryResponse: MySqlReturnType = await connect.runQuery("SELECT * FROM countries WHERE id = ?", [id]);
    const country = getCountryResponse as RowDataPacket as Country
    console.log('Country Service -- getCountryById -- country: ', country)
    return country
}

async function insertCountryDB(name: string): Promise<Country | null> {
    try {
        const connect = new dbService.DbService();
        const insertCountryResponse: MySqlReturnType = await connect.runQuery("INSERT INTO countries (name) values (?)", [name]);
        console.log('CountryDb Service -- insert response: ', insertCountryResponse)

        if ((insertCountryResponse as OkPacket).affectedRows > 0) {
            const country: Country = await getCountryById((insertCountryResponse as OkPacket).insertId)
            return country;
        } else {
            return null;
        }
    } catch (error: any) {
        console.log('CountryDb Service -- insert ERROR response: ', error)
        throw error
    }
}

async function updateCountryDB(id: number, name: string) {
    const connect = new dbService.DbService();
    return await connect.runQuery("UPDATE countries SET name=? WHERE id=?", [name, id]);
}

async function deleteCountryDB(id: number) {
    const connect = new dbService.DbService();
    return await connect.runQuery("DELETE FROM countries where id = ? ", [id]);
}

export default {
    getCountriesDB,
    getCountryById,
    insertCountryDB,
    updateCountryDB,
    deleteCountryDB
}
