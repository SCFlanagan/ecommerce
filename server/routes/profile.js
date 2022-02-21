const express = require('express');
const router = express.Router();
const { createProfile, updateProfile } = require('../handlers/profile');

router.post('/', createProfile);
router.put('/', updateProfile);

module.exports = router;