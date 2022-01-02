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
        `/api/movies/discover`,{headers: {
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

export const getGenres = () => {
    return fetch(
        '/api/genres/genres',{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};

export const getTvGenres = async () => {
    return fetch(
        '/api/genres/tvGenres',{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
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
        '/api/tvshows/discover',{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};

export const getTvShow = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `/api/tvshows/${id}`,{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};

export const getTvShowImages = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `/api/tvshows/${id}/tvImages`,{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};
