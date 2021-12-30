//import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import uniqid from 'uniqid'
import express from 'express';
//import { movies, movieReviews, movieDetails } from './moviesData';
import {getTvShow, getTvShows, getTvShowImages} from './tmdb-api';


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    // let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    // [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)
    //
    // const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    // const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);
    // const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    // const movies = await moviesPromise;
    //
    // const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object
    //
    // res.status(200).json(returnObject);
}));

// gets tv shows
router.get('/discover', asyncHandler( async(req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const tvShows = await getTvShows();
    res.status(200).json(tvShows);

    const totalDocumentsPromise1 = tvShows.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise1 = tvShows.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments1 = await totalDocumentsPromise1; //wait for the above promises to be fulfilled
    const movies1 = await moviesPromise1;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments1 / limit), total_results: totalDocuments1, results: movies1 };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));

// Get tv details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getTvShow(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get tv images
router.get('/:id/tvImages', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getTvShowImages(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie reviews
// router.get('/:id/movieReviews', asyncHandler(async (req, res) => {
//     const id = parseInt(req.params.id);
//     const movieReviews = await getMovieImages(id);
//     // find reviews in list
//     if (movieReviews.id == id) {
//         res.status(200).json(movieReviews);
//     } else {
//         res.status(404).json({
//             message: 'The resource you requested could not be found.',
//             status_code: 404
//         });
//     }
// }));

export default router;