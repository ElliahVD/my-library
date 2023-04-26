import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import api from './src/routes';
import path from "path";

const app: Express = express();
const port = 8888;

// app.use(cors({
//   origin: 'http://localhost:8888'
// }));
app.set('view engine', 'ejs')
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.bodyParser())
app.use(bodyParser.json());

app.use("/", api());

app.use(express.static(__dirname + '/public'));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Ooops, server error !');
});
// app.use((req, res) => {
//   res.status(404).send("Ooops, you took a wrong turn !");
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

