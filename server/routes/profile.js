const express = require('express');
const router = express.Router({ mergeParams: true });
const { createProfile, updateProfile } = require('../handlers/profile');

router.route('/')
    .post(createProfile)
    .put(updateProfile);

module.exports = router;