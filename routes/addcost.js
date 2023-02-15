// Maor Aharon 208253625
// Or Jerbi 318851177
// Dayana Pergement 315522201
const express = require('express');
const router = express.Router();
const Costs = require('../models/costs');
const Users = require('../models/users');



// Array of months
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// Array of categories
const categories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];


//POST method for "addcost"
router.post('/',async (req, res, next) => {

    const user_id = req.body.user_id;
    let year = req.body.year;
    let month = req.body.month;
    let day = req.body.day;
    const description = req.body.description;
    const category = req.body.category;
    const sum = req.body.sum;

    //Check if date was sent
    if (!(month && year && day))
    {
        const date = new Date();
        month = months[date.getMonth()];
        year = date.getFullYear();
        day = date.getDate();
    }
    //Check if the minimal properties sent
    if (!(user_id && description && category && sum))
    {
        res.sendStatus(500);
    }

    else
    {
        // Check if the user is exists
        const userExists = await Users.UserExists(req.body.user_id);
        if (!userExists)
        {
            res.send("User is not exists");
            return;
        }
        //Check if the category is exists
        if (!(categories.includes(category)))
        {
            res.send("Category is not exists");
        }

        //Check if the month is valid number
        if(!(isNaN(month)))
        {
            if (month > 0 && month <= 12)
            {
                month = months[month - 1];
            }
            else
            {
                res.send('Wrong input of month');
            }
        }
        else
        {
            //Check when the month sent by string
            if(!(months.includes(month)))
            {
                res.send('Wrong input of month');
            }
        }
        //Check validtion of sum
        if(sum < 0)
        {
            res.send('Wrong input of sum');
        }
    }

    const newCost = await new Costs({
        user_id: user_id,
        year:year,
        month:month,
        day:day,
        description:description ,
        category:category,
        sum:sum,
        id: new Date().toISOString()
    });

    try
    {
        newCost.save();
        res.send(newCost);
    }
    catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;