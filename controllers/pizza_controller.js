const express = require("express");
const router = express.Router();
const pizza = require('../models/pizza.js');

router.post('/api/pizza', (req, res) => {

    let recipe = req.body.recipe;
    let ingredients = req.body.ingredients;
    let calories = parseInt(req.body.totalCal);
    let userId = req.body.userid;
    let title = req.body.title;

    pizza.insertOne(recipe, ingredients, calories, userId, title, (result) => {
        console.log(result);
        // Send back the ID of the new pizza recipe
        res.json({
            id: result.insertId
        });
    });
});

router.get("/", function (req, res) {


    pizza.selectAll(function (data) {
        let ejsObject = {
            allRecipes: data
        };
        console.log(ejsObject);
        res.render('index.ejs', ejsObject);
    });
});
module.exports = router;