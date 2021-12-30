import express from 'express';
import Genre from "./genreModel";
import asyncHandler from "express-async-handler";
import {getGenres, getTvGenres} from "./tmdb-api";

const router = express.Router();

// Get all genres
router.get('/', async(req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
});

// gets movie genres from api
router.get('/genres', asyncHandler( async(req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

// gets movie genres from api
router.get('/tvGenres', asyncHandler( async(req, res) => {
    const genres = await getTvGenres();
    res.status(200).json(genres);
}));

export default router;