const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280
    },
    createdBy: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

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
    reactions: [ReactionSchema]
},
{
    toJSON: { virtuals: true },
    id: false
});

// retrieve cound of thought's reactions on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create and export Thought model
module.exports = model('Thought', ThoughtSchema);