import SiteHeader from './components/siteHeader'
import MovieReviewPage from "./pages/movieReviewPage";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import {PublicPage, Movies, Upcoming, MovieDetails} from "./pages";
import tvHomePage from "./pages/tvHomePage";
import TvPage from "./pages/tvDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import FavoriteTvsPage from "./pages/favoriteTvsPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import TvContextProvider from "./contexts/tvContext";
import AuthProvider from "./authContext";
import PrivateRoute from "./privateRoute";
import SignUpPage from "./signupPage";
import LoginPage from "./loginPage";
import AuthHeader from "./authHeader";
import MovieDetailsPage from "./pages/movieDetailsPage";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <AuthHeader/>
                    <SiteHeader/>
                    <MoviesContextProvider>
                        <TvContextProvider>
                            <Switch>
                                <Route exact path="/reviews/form" component={AddMovieReviewPage}/>
                                <PrivateRoute path="/movies/:id/reviews" component={MovieReviewPage}/>
                                <PrivateRoute exact path="/movies/upcoming" component={UpcomingMoviesPage}/>
                                <PrivateRoute path="/discover" component={Movies}/>
                                <PrivateRoute exact path="/movies/favorites" component={FavoriteMoviesPage}/>
                                <PrivateRoute exact path="/movies/toprated" component={TopRatedMoviesPage}/>
                                <PrivateRoute path="/movies/:id" component={MovieDetailsPage}/>
                                <PrivateRoute exact path="/tvshows/favorites" component={FavoriteTvsPage}/>
                                <PrivateRoute path="/tvshows/:id" component={TvPage}/>
                                <PrivateRoute path="/tvshows" component={tvHomePage}/>
                                <Route path="/signup" component={SignUpPage}/>
                                <Route path="/login" component={LoginPage}/>
                                <Route path="/public" component={PublicPage}/>
                                <Route exact path="/" component={HomePage}/>
                                <Redirect from="*" to="/"/>
                            </Switch>
                        </TvContextProvider>
                    </MoviesContextProvider>
                </AuthProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));