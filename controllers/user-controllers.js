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
        try {
            // query db to find User by _id
            const userData = await User.find({ _id: params.userId })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v');

            if (userData.length < 1) {
                console.log("Hmmm... We couldn't find a user with that ID.");
                res.status(404).json({ message: "Hmmm... We couldn't find a user with that ID." });
                return;
            }

            res.json(userData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
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
        try {
            // query db to update a user
            const userData = await User
                .findOneAndUpdate({
                    _id: params.userId
                },
                body,
                {
                    new: true,
                    runValidators: true
                });

            if (userData.length < 1) {
                console.log("Hmmm... We couldn't find a user with that ID.");
                res.status(404).json({ message: "Hmmm... We couldn't find a user with that ID." });
                return;
            }

            res.json(userData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async removeUser({ params }, res) {
        try {
            // query db to delete a user
            const userData = await User
                .findOneAndDelete({ _id: params.userId });

            if (userData.length < 1) {
                console.log("Hmmm... We couldn't find a user with that ID.");
                res.status(404).json({ message: "Hmmm... We couldn't find a user with that ID." });
                return;
            }

            res.json(userData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async addFriend({ params }, res) {
        try {
            // query db to add a friend to user by userId
            const userData = await User
                .findOne(
                    { _id: params.userId }
                );

            if (userData.length < 1) {
                console.log("Hmmm... We couldn't find a user with that ID.");
                res.status(404).json({ message: "Hmmm... We couldn't find a user with that ID."});
                return;
            } else {
                let inList = false;
                // check that new friend isn't already in list
                userData.friends.map(friend => {
                    console.log(friend.toString());
                    if (friend.toString() === params.friendId) {
                        inList = true;
                        return;
                    }
                });

                if (!inList) {
                    // add friend
                    userData.friends.push(params.friendId);

                    const newUserData = await User
                        .findOneAndUpdate(
                            { _id: params.userId },
                            { $set: { friends: userData.friends }},
                            { new: true }
                        );

                    res.json(newUserData);
                } else {
                    res.json({ message: "That user is already in your friend's list!" });
                }
            }
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async removeFriend({ params }, res) {
        try {
            // query db to remove a friend from user by userId
            const userData = await User
                .findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { friends: params.friendId } },
                    { new: true }
                );
            
            if (userData.length < 1) {
                console.log("Hmmm... We couldn't find a user with that Id.");
                res.status(404).json({ message: "Hmmm... We couldn't find a user with that ID." });
                return;
            }

            res.json(userData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
};
