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


//GET method for "/report"
router.get('/',async(req,res) =>{

    const user_id = req.query.user_id;
    let month = req.query.month;
    const year = req.query.year;

    // Check if date was sent
    if (!(user_id && month && year))
    {
        res.sendStatus(500);
    }

    else
    {
        //Check if the user is exist
        const userExists = await Users.UserExists(req.query.user_id);
        if (!userExists)
        {
            res.send("User is not exists");
            return;
        }
        //Check when the month sent by number
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

        if (!(year >= 0 && year <= 2023))
        {
            res.send('Wrong input of year');
        }
    }

    const report = {};

    //Function that insert the details to report
    Costs.find({user_id, month, year}, (err, costs) => {
        if(err)
        {
            console.log(err);
            res.sendStatus(500);
        }
        else
        {
            categories.forEach(cat => {
                report[cat] = []
            });

            costs.forEach((cost) => {
                const category = cost.category;
                if (!report[category])
                {
                    report[category] = [];
                }
                report[category].push("{day:" + cost.day + ", description:" + cost.description + ", sum:" + cost.sum +"}");
            });

            console.log(report);
            res.json(report);
        }
    });
});

module.exports = router;