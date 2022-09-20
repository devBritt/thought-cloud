const { Thought } = require('../models');

// create thought controller methods
module.exports = {
    async getAllThoughts(req, res) {
        try {
            // query db for all thoughts
            // TODO: add reactions to populate
            const thoughtData = await Thought.find({})
                .select('-__v');
        res.json(thoughtData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async getThoughtById({ params }, res) {
        try {
            const thoughtData = await Thought.findById(params.thoughtId)
                .select('-__v');

            if (thoughtData.length < 1) {
                console.log("Hmmm... We couldn't find a thought with that ID.");
                res.status(404).json({ message: "Hmmm... We couldn't find a user with that ID." });
                return;
            }
            
            res.json(thoughtData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async addThought({ body }, res) {
        try {
            // query db to create new user
            const thoughtData = await Thought.create(body);

            res.json(thoughtData);
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
