const express = require('express');
const router = express.Router();

const {login,register} = require('../controllers/auth');

// Handle preflight requests
router.options('*', (req, res) => {
    res.status(200).end();
});

// Explicitly define allowed methods
router.post('/register', register);
router.post('/login', login);

module.exports = router;