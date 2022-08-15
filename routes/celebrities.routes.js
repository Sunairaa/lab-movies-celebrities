const router = require("express").Router();
// require celebrity model
const Celebrity = require('../models/Celebrity.model');

// create the get route: /celebrities/create
// In that route we have to render the celebrities/new-celebrity view
router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'));

// Create the /celebrities/create POST route 
router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.findOne({ name })
    .then((celebrityinDB) => {
        if(!celebrityinDB) {
            Celebrity.create({ name, occupation, catchPhrase })
                .then((createdCelebrity) => {
                    // console.log(`Celebrity Created: ${createdCelebrity}`);
                    res.redirect('/celebrities')
                })
        } else {
            res.render('celebrities/new-celebrity', {message: "Celebrity already exist"});
        }
    })
    .catch((err) => console.error(`Error while creating a new celebrity: ${err}`))
})


// iteration # 04 --> display all celebrities
router.get('/celebrities', (req, res) => {
    Celebrity.find()
        .then((celebritiesList) => {
            // console.log(`Celebrities List: ${celebritiesList}`)
            res.render('celebrities/celebrities', {title: "List Celebrities", celebritiesList})
        })
        .catch((err) => console.error(`Error while Listing celebrities: ${err}`))
})
module.exports = router;