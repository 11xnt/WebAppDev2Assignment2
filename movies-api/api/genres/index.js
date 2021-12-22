import express from 'express';

const router = express.Router();

// Get all genres
router.get('/', async(req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
});

export default router;