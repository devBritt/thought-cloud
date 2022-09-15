const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        // validate string as valid email address format
        match: new RegExp(/([\da-zA-Z\._-])+@([\da-zA-Z\.-]+)+\.([a-z\.]{2,})/, 'g')
    },
    friends: [this],
    // TODO: add thoughts array after Thought model complete
},
{
    toJSON: {
        virtuals: true
    }
});

// retrieve count of user's friends on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create and export User model
module.exports = model('User', UserSchema);