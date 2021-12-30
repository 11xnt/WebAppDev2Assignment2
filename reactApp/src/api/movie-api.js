export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const getMovies = () => {
    return fetch(
        '/api/movies/discover',{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};

export const getUpcomingMovies = () => {
    return fetch(
        '/api/movies/upcoming',{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};

export const getTopRatedMovies = () => {
    return fetch(
        '/api/movies/toprated',{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};

export const getMovie = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `/api/movies/${id}`,{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};

export const getGenres = async () => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getTvGenres = async () => {
        return fetch(
            "https://api.themoviedb.org/3/genre/tv/list?api_key=" +
            process.env.REACT_APP_TMDB_KEY +
            "&language=en-US"
        ).then( (response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
            .catch((error) => {
                throw error
            });
    };

export const getMovieImages = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `/api/movies/${id}/movieImages`,{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};


export const getMovieReviews = (args)  => {
    // console.log(args)
    return fetch(
        `/api/movies/${args}/movieReviews`,{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};


export const getTvShows = () => {
    return fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getTvShow = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getTvShowImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    })
        .catch((error) => {
            throw error
        });
};
