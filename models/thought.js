const { Schema, model, Types } = require('mongoose');

// TODO: create reactions schema

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        require: true
    },
    // reactions list
    // TODO: add reactions
},
{
    toJSON: { virtuals: true },
    id: false
});

// retrieve cound of thought's reactions on query
// TODO: create reaction count virtual

// create and export Thought model
module.exports = model('Thought', ThoughtSchema);