import session from 'express-session';
import authenticate from './authenticate';
import './db';
import './seedData'
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import usersRouter from './api/users';
import genresRouter from './api/genres';

dotenv.config();

const errHandler = (err, req, res, next) => {
    /* if the error in development then send stack trace to display whole error,
    if it's in production then just send error message  */
    if(process.env.NODE_ENV === 'production') {
        return res.status(500).send(`Something went wrong!`);
    }
    res.status(500).send(`Hey!! You caught the bug 👍👍. Message me with the error: ${err.stack} so I can fix it`);
};

//session middleware
app.use(session({
    secret: 'ilikecake',
    resave: true,
    saveUninitialized: true
}));

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});