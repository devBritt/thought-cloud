const { User } = require('../models');

// crreate user controller methods
module.exports = {
    async getAllUsers(req, res) {
        try {
            // query db for all Users
            // TODO: add thoughts to populate
            const userData = await User.find({})
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v');

            res.json(userData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async getUserById({ params }, res) {

    },
    async addUser({ body }, res) {
        try {
            // query db to create new user
            const userData = await User.create(body);

            res.json(userData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async updateUser({ params, body }, res) {

    },
    async removeUser({ params }, res) {

    },
    // TODO: create addFriend, removeFriend methods
};
