// Maor Aharon 208253625
// Or Jerbi 318851177
// Dayana Pergement 315522201
const express = require('express');
const router = express.Router();

//GET method for "/about"
router.get('/', (req, res) => {
    const developers = [
        { firstname: 'Maor', lastname: 'Aharon', id: '208253625', email: 'maorrr188@gmail.com' },
        { firstname: 'Or', lastname: 'Jerbi', id: '318851177', email: 'or1212400@gmail.com' },
        { firstname: 'Dayana', lastname: 'Pergament', id: '315522201', email: 'pdayana1996@gmail.com' }
    ];
    res.json(developers)
});

module.exports = router;