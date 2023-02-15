// Maor Aharon 208253625
// Or Jerbi 318851177
// Dayana Pergement 315522201
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CostsSchema = new Schema({
    user_id : {
        type: Number
    },
    year : {
        type : Number
    },
    month : {
        type : String
    },
    day : {
        type : Number
    },
    description : {
        type : String
    },
    sum : {
        type : Number
    },
    category:{
        type: String,
        enum:[
            'food',
            'health',
            'housing',
            'sport',
            'education',
            'transportation',
            'other'
        ]
    },
    id:{
        type : String
    }
});



const Costs = mongoose.model('costs',CostsSchema);

module.exports = Costs;