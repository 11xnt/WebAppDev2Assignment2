import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import uniqid from 'uniqid'
import express from 'express';
import { movies, movieReviews, movieDetails } from './moviesData';
import {getUpcomingMovies, getMovies, getTopRatedMovies, getMovie, getMovieImages, getMovieReviews} from './tmdb-api';


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

// gets upcoming movies
router.get('/upcoming', asyncHandler( async(req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);

    const totalDocumentsPromise1 = upcomingMovies.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise1 = upcomingMovies.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments1 = await totalDocumentsPromise1; //wait for the above promises to be fulfilled
    const movies1 = await moviesPromise1;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments1 / limit), total_results: totalDocuments1, results: movies1 };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));

// gets upcoming movies
router.get('/discover', asyncHandler( async(req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const movies = await getMovies();
    res.status(200).json(movies);

    const totalDocumentsPromise1 = movies.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise1 = movies.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments1 = await totalDocumentsPromise1; //wait for the above promises to be fulfilled
    const movies1 = await moviesPromise1;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments1 / limit), total_results: totalDocuments1, results: movies1 };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));

// gets top rated movies from api
router.get('/toprated', asyncHandler( async(req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);

    const totalDocumentsPromise1 = topRatedMovies.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise1 = topRatedMovies.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments1 = await totalDocumentsPromise1; //wait for the above promises to be fulfilled
    const movies1 = await moviesPromise1;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments1 / limit), total_results: totalDocuments1, results: movies1 };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie images
router.get('/:id/movieImages', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovieImages(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie reviews
router.get('/:id/movieReviews', asyncHandler(async (req, res) => {
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
}));

// // Get movie reviews
// router.get('/:id/reviews', (req, res) => {
//     const id = parseInt(req.params.id);
//     // find reviews in list
//     if (movieReviews.id == id) {
//         res.status(200).json(movieReviews);
//     } else {
//         res.status(404).json({
//             message: 'The resource you requested could not be found.',
//             status_code: 404
//         });
//     }
// });

// //Post a movie review
// router.post('/:id/reviews', (req, res) => {
//     const id = parseInt(req.params.id);
//     if (movieReviews.id == id) {
//         req.body.created_at = new Date();
//         req.body.updated_at = new Date();
//         req.body.id = uniqid();
//         movieReviews.results.push(req.body); //push the new review onto the list
//         res.status(201).json(req.body);
//     } else {
//         res.status(404).json({
//             message: 'The resource you requested could not be found.',
//             status_code: 404
//         });
//     }
// });






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