const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
    createUser,
    getUserById,
    updateUser,
    getAllUsers
} = require('../controllers/userController');

// Semua routes butuh authentication
router.use(verifyToken);

// GET semua users (bonus route)
router.get('/', getAllUsers);

// CREATE new user
router.post('/', createUser);

// GET user by ID
router.get('/:id', getUserById);

// UPDATE user
router.put('/:id', updateUser);

module.exports = router;