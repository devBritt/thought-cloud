const router = require('express').Router();
const { getAllThoughts, addThought, getThoughtById, updateThought, removeThought } = require('../../controllers/thought-controllers');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/:thoughtId/reactions
// TODO: POST to create reaction and store in reaction array

// /api/thoughts/:thoughtId/reactions/:reactionId
// TODO: DELETE to pull and remove reaction by reactionId

module.exports = router;
