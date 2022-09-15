const { User } = require('../models');

// crreate user controller methods
module.exports = {
    async getAllUsers() {
        try {
            // query db for all Users
            // TODO: add thoughts to populate
            const userData = await User.find({})
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v');

            console.log(userData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async getUserById({ params }, res) {

    },
    async addUser({ body }, res) {

    },
    async updateUser({ params, body }, res) {

    },
    async removeUser({ params }, res) {

    }
};
