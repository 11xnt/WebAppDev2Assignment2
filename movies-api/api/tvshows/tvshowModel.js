import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const TvShowSchema = new Schema({
    adult: { type: Boolean },

    created_by: [{
        id: {type: Number, unique: true },
        credit_id: { type: String },
        name: { type: String},
        gender: { type: Number},
        profile_path: { type: String},
    }],
    episode_run_time: [{ type: Number }],
    genre: [{
        genre_id: { type: Number },
        genre_name: { type: String}
    }],
    homepage: { type: String },
    id: { type: Number },
    in_production: { type: Boolean },
    languages: [{ type: String }],
    tv_id: { type: Number, required: true, unique: true },
    last_air_date: { type: String },
    last_episode_to_air: {
        air_date: {type: String},
        episode_number: { type: Number},
        episode_id: {type: Number},
        name: { type: String},
        overview: { type: String},
        production_code: { type: String},
        season_number: {type: Number},
        still_path: { type: String},
        vote_average: {type: Number},
        vote_count: {type: Number},
    },
    tv_name: { type: String},
    next_episode_to_air: { type: null },



    poster_path: { type: String },
    overview: { type: String },
    release_date: { type: String },
    original_title: { type: String },
    original_language: { type: String },
    title: { type: String },
    backdrop_path: { type: String },
    popularity: { type: Number },
    vote_count: { type: Number },
    video: { type: Boolean },
    vote_average: { type: Number },
    production_countries: [{
        iso_3166_1: { type: String },
        name: { type: String }
    }],
    runtime: { type: Number },
    status: { type: String },
    tagline: { type: String }
});

TvShowSchema.statics.findByMovieDBId = function (id) {
    return this.findOne({ id: id });
};

export default mongoose.model('TvShows', TVShowSchema);


