const router = require("express").Router();
// require movie model
const Movie = require('../models/Movie.model');
// require celebrity model
const Celebrity = require('../models/Celebrity.model');

// router.get('/', (req, res) => {
//     res.render('movies/movies')
// })

// iteration # 06 - Add new movies
router.get('/movies/create', (req, res) => {
    Celebrity.find()
        .then((celebritiesList) => {
            res.render('movies/new-movie', {celebritiesList})
        })
        .catch((err) => console.error(`Error while getting list of celebrity: ${err}`)) 
})

// Create a post request to create a movie
router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.findOne({ title })
        .then((movieInDB) => {
            if(!movieInDB) {
                Movie.create({ title, genre, plot, cast })
                    .then((createdMovie) => {
                        res.redirect('/movies')
                    })
            } else {
                res.render('movies/new-movie', {message: "Movie already exist"});
            }
        })
        .catch((err) => console.error(`Error while creating a new celebrity: ${err}`))
        })


// iteration # 07 - create route to list all movie
router.get('/movies', (req, res) => {
    Movie.find()
        .then((moviesList) => {
            res.render('movies/movies', {title: "Movies List", moviesList})
        })
        .catch((err) => console.error(`Error while listing movies: ${err}`))
})


// iteration # 08 - The Movie Details Page
router.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    Movie.findById(id)
        .populate("cast")
        .then((movieDetail) => {
            res.render('movies/movie-details', {title: "Movie Detail", movieDetail})
        })
        .catch((err) => console.error(`Error while getting movie details: ${err}`))
})

// iteration # 09 - Delete movie
router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params;
    Movie.findByIdAndDelete(id)
        .then(res.redirect('/movies'))
        .catch((err) => console.error(`Error while deleting movie : ${err}`))
})

//iteration # 10 - update movie
router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params;
    Movie.findById(id)
        .populate("cast")
        .then((movieDetails) => {
            Celebrity.find()
                .then((celebrityList) => {
                    res.render('movies/edit-movie', { movieDetails, celebrityList })
                })
            
        })
        .catch((err) => console.error(`Error while editing movie : ${err}`))
})

router.post('/movies/:id/edit', (req, res) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true})
        .then(res.redirect(`/movies/${id}`))
        .catch((err) => console.error(`Error while editing movie : ${err}`))
})

module.exports = router;