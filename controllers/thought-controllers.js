const { Thought } = require('../models');

// create thought controller methods
module.exports = {
    async getAllThoughts(req, res) {
        try {
            // query db for all thoughts
            // TODO: add reactions to populate
            const userData = await Thought.find({})
                .select('-__v');
        res.json(userData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async getThoughtById({ params }, res) {
        console.log(params);
    },
    async addThought({ body }, res) {
        try {
            // query db to create new user
            const userData = await Thought.create(body);

            res.json(userData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async updateThought({ params, body }, res) {
        console.log(params, body);
    },
    async removeThought({ params }, res) {
        console.log(params);
    }
    // TODO: make addReaction, removeReaction
};
