import express, { Request, Response } from 'express';
import morgan from 'morgan';
import contactsV1Routes from '../api/v1/routes/contacts.routes';
const app = express();
const port : String | number = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api/v1/contacts', contactsV1Routes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Hello World!"});
});

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

export default app;