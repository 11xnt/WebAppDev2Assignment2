import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import uniqid from 'uniqid'
import express from 'express';
import { movies, movieReviews, movieDetails } from './moviesData';
import {getUpcomingMovies, getMovies, getTopRatedMovies} from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const movies = await moviesPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

//Post a movie review
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

// gets upcoming movies
router.get('/movies/upcoming', asyncHandler( async(req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// gets movies from api
router.get('/tmdb/movies', asyncHandler( async(req, res) => {
    const moviesList = await getMovies();
    res.status(200).json(moviesList);
}));

// gets top rated movies from api
router.get('/tmdb/toprated', asyncHandler( async(req, res) => {
    const topMovies = await getTopRatedMovies();
    res.status(200).json(topMovies);
}));



// // gets movie details from api
// router.get('/:id', asyncHandler( async(req, res) => {
//     const id = parseInt(req.params.id);
//     const movie = await getMovie(id);
//     res.status(200).json(movie);
// }));
//
// // gets movie genres from api
// router.get('/', asyncHandler( async(req, res) => {
//     const genres = await getGenres();
//     res.status(200).json(genres);
// }));
//
// // gets movie images  from api
// router.get('/:id/images', asyncHandler( async(req, res) => {
//     const id = parseInt(req.params.id);
//     const movieImages = await getMovieImages(id);
//     res.status(200).json(movieImages);
// }));

// gets movie reviews from api
// router.get('/:id/reviews', asyncHandler( async(req, res) => {
//     const id = parseInt(req.params.id);
//     const movieReviews = await getMovieReviews(id);
//     res.status(200).json(movieReviews);
// }));

export default router;