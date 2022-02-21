const express = require('express');
const router = express.Router();
const { getUser, deleteUser } = require('../handlers/user');

router.get('/:userId', getUser);
router.delete('/:userId', deleteUser);

module.exports = router;