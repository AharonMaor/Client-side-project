// Maor Aharon 208253625
// Or Jerbi 318851177
// Dayana Pergement 315522201
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    id: {
        type: Number
    },
    birthday: {
        type: String
    }
});


const Users = mongoose.model('users',UsersSchema);

const newUser = new Users ({
    id: 123123,
    first_name: 'moshe',
    last_name: 'israeli',
    birthday: 'January, 10th, 1990'
})

//Checking if user is exists in database
async function UserExists(user_id) {
    return new Promise(async (resolve, reject) => {
        const existingUser = await Users.findOne({id: user_id});
        if (existingUser) {
            resolve(true);
        }
        else{
            resolve(false);
        }
    });
}


module.exports = {Users,UserExists} ;