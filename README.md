# Assignment 2 - Web API.
​
Name: Allen Terescenco
​
## Features.
 + API fetch to backend server to display: Upcoming movies, movie details page, top rated movies, tv shows, tv details page, movie reviews.
 + Added TV show model with appropiate API file to seperate it from the movies API.
 + Updated the genre model with an API file to fetch for genres relating to movies or TV shows.
 + Attempted to implement pagination with buttons.
​
## Installation Requirements
​
Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 
You will need to install MongoDB Community Server which can be installed here: https://www.mongodb.com/try/download/community
​
Once after MongoDB is installed, clone the git repo:
​
```bat
git clone https://github.com/11xnt/WebAppDev2Assignment2.git
```
​
Followed by installation after cloning the repo:
​
Create the database:
```bat
mkdir db
mongod -dbpath db
```
​
To start the backend server:
```bat
cd /movies-api
npm install
npm start
```
​
To start the frontend React app:
```bat
cd /reactApp
npm install
npm start
```
​
## API Configuration

You will need to attain your TMDB API key which can be done here: https://www.themoviedb.org/documentation/api You will need to register for it.
​
Once everything is done you will need to create and fill out the .env file so that we can access the sentitive data which will be used throughout the project.

.env file in the /movies-api/
```bat
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://*YOUR LOCAL HOST HERE*:27017/movies_db
SEED_DB=true
SECRET=YourJWTSecret
TMDB_KEY=YOUR TMDB API KEY HERE
```
I had troubles with port 8080, if this occurs with you, try port 80.

.env file in the /reactApp/
```bat
REACT_APP_TMDB_KEY=YOUR TMDB API KEY HERE
FAST_REFRESH=false
MONGO_DB=mongodb://*YOUR LOCAL HOST HERE*:27017/movies_db
```
​
​
## API Design
Give an overview of your web API design, perhaps similar to the following: 
​
|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies/discover | Gets a list of movies on the homepage | N/A | N/A |
| /api/movies/{id} | Gets a Movie's details | N/A | N/A | N/A |
| /api/movies/upcoming | Gets upcoming movies | N/A | N/A | N/A |
| /api/movies/toprated | Gets top rated movies | N/A | N/A | N/A |
| /api/genres/genres | Gets genres for movies | N/A | N/A | N/A |
| /api/genres/tvGenres | Gets genres for tv shows | N/A | N/A | N/A |
| /api/movies/{id}/moviesImages | Gets a Movie's images | N/A | N/A | N/A |
| /api/movies/{id}/movieReviews | Gets all reviews for movie | N/A | N/A | N/A |
| /api/tvshows/discover | Gets a list of tv shows on the homepage | N/A | N/A |
| /api/tvshows/{id} | Get a TV Show's details | N/A | N/A | N/A |
| /api/tvshows/{id}/tvImages | Gets a TV Show's images | N/A | N/A | N/A |
| /api/users?action=register | N/A | Registers a user to the database | N/A | N/A |
| /api/users | N/A | Logs in a user | N/A | N/A |

​
​
## Security and Authentication
Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.
All but the homepage are privately protected. The reason for this design choice as the "guest" user can get a taster for the web application which will make them more inclinded to either register or log into the website.
The routes are protected using JWT tokens which a user receieves from logging in. If a user is not logged into any of the following routes, they will be redirected to /login which then can redirect them to register if they click the link.

+ /movies/:id/reviews -> Movie reviews page
+ /movies/upcoming -> Upcoming movies page
+ /discover -> Movie discover page
+ /movies/favorites -> User's favourite movies page
+ /movies/toprated -> Top Rated movies page
+ /movies/:id -> Movie details page
+ /tvshows/favorites -> User's favourite TV shows page
+ /tvshows/:id -> TV Show details page
+ /tvshows -> TV Show discover page

​
## Integrating with React App
​
All of the API calls follow mostly the same process.
​
For example, when the API in the React app is made, it will execute these lines of code:
~~~Javascript
export const getMovies = () => {
    return fetch(
        `/api/movies/discover`,{headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => res.json());
};
~~~

Since there is a proxy set up in the package.json file it will look on the port to find where to look next.

Since it is looking for the '/api/movies/discover', it will look in the movies-api/api/movies folder to find the index.js which is located in there. Once there it will look for the router to match the '/discover' part of the request. Which it will run this bit of code:

~~~Javascript
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
~~~

This line: 
```bat
const movies = await getMovies();
```
is where it will check in the 
```bat
tmdb-api.js
```
file to execute the request from the TMDB API.

~~~Javascript
export const getMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&page=1`
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
~~~
