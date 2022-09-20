const { Thought } = require('../models');

// create thought controller methods
module.exports = {
    async getAllThoughts(req, res) {
        console.log('In getAllThoughts');
    },
    async getThoughtById({ params }, res) {
        console.log(params);
    },
    async addThought({ body }, res) {
        console.log(body);
    },
    async updateThought({ params, body }, res) {
        console.log(params, body);
    },
    async removeThought({ params }, res) {
        console.log(params);
    }
    // TODO: make addReaction, removeReaction
};
