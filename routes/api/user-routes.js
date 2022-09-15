const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser
} = require('../../controllers/user-controllers');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);

module.exports = router;
