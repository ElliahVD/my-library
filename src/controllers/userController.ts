import { NextFunction, Request, Response } from "express";
import userDb from "../db/userDb";
import { User } from "../db/definitions/user";

async function test(req: Request, res: Response) {
    const result: User[] = await userDb.getUsersDB();
    console.log('USER CTRL -- test -- result: ', result);
    // res.status(200).send({ users: result });
    res.status(200).render('login', { users: result });
}

async function login(req: Request, res: Response) {
    res.status(200).render('login', {});
}

async function newUser(req: Request, res: Response) {
    res.status(200).render('new_user', {});
}

async function connect(req: Request, res: Response) {
    try {
        const test = JSON.parse(JSON.stringify(req.query))
        console.log('USER CTRL -- test -- test: ', JSON.parse(JSON.stringify(test)));
        const pseudo = test.pseudo
        const password = test.password
        console.log('USER CTRL -- test -- pseudo: ', pseudo);
        console.log('USER CTRL -- test -- password: ', password);
        const result: boolean = await userDb.isExist(pseudo, password);
        const user: User = await userDb.getUserByPseudoPassword(pseudo, password);
        console.log('USER CTRL -- test -- result: ', result);
        if (result) {
            return res.status(200).render('users', { users: [user] });
        } else {
            res.status(403).render('login', { message: 'Failed connection' });
        }
        console.log('USER CTRL -- connect -- POUET')

    } catch (error: any) {
        console.log('USER CTRL -- connect -- error: ', error)
    }
}

async function getAllUsers(req: Request, res: Response) {
    const result: User[] = await userDb.getUsersDB();
    console.log(result);
    // res.status(200).send({ users: result });
    res.status(200).render('users', { users: result });
}

async function getUser(req: Request, res: Response) {
    const { userId } = req.params;
    const result: User = await userDb.getUserById(parseInt(userId));
    res.status(200).render('users', { user: result });
    // res.status(200).send({ users: result });
}

async function insertUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { pseudo, password } = req.body;
        const result = await userDb.insertUserDB(pseudo, password);
        if (result) {
            res.status(201).render('users', { data: result });
        } else {
            res.status(500).send('Internal server error');
        }
    } catch (error: any) {
        next(error)
    }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.id;
        const { name, password } = req.body;
        const result = await userDb.updateUserDB(parseInt(userId), name, password);
        if (result) {
            res.status(200).render('users', { data: result });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error: any) {
        next(error);
    }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.id;
        const result = await userDb.deleteUserDB(parseInt(userId));
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send('User not found');
        }
    } catch (error: any) {
        next(error);
    }
}



export default {
    test,
    getAllUsers,
    getUser,
    insertUser,
    connect,
    updateUser,
    deleteUser,
    login,
    newUser
}
