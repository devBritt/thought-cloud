const { Thought, User } = require('../models');

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
            const { _id } = thoughtData;
            
            // add thought to user thoughts list
            await User
                .findOneAndUpdate(
                    { username: body.createdBy },
                    { $push: { thoughts: { _id }}});

            res.json(thoughtData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async updateThought({ params, body }, res) {
        try {
            // query db to update a thought
            const thoughtData = await Thought
                .findOneAndUpdate({
                    _id: params.thoughtId
                },
                body,
                {
                    new: true,
                    runValidators: true
                });

            if (thoughtData.length < 1) {
                console.log("Hmmm... We couldn't find a thought with that ID.");
                res.status(404).json({ message: "Hmmm... We couldn't find a thought with that ID." });
                return;
            }

            res.json(thoughtData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async removeThought({ params }, res) {
        try {
            // query db to delete a thought
            const thoughtData = await Thought
            .findOneAndDelete({ _id: params.thoughtId });

            if (thoughtData.length < 1) {
                console.log("Hmmm... We couldn't find a thought with that ID.");
                res.status(404).json({ message: "Hmmm... We couldn't find a user with that ID." });
                return;
            }

            // pull thought from user
            await User
                .findOneAndUpdate(
                    { username: thoughtData.createdBy.trim() },
                    {$pull: { thoughts: params.thoughtId }});

            res.json(thoughtData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
    // TODO: make addReaction, removeReaction
};
