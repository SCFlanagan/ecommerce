const db = require('../models');

//  POST - /api/users/:userId/profile
//  Make it so it can't create more than one !!!
exports.createProfile = async function (req, res, next) {
    try {
        const newProfile = await db.Profile.create(req.body);
        let foundProfile = await db.Profile.findById(newProfile._id);

        let foundUser = await db.User.findById(req.params.userId);
        foundUser.profile = newProfile.id;
        await foundUser.save();

        return res.status(201).json(foundProfile)
    } catch (err) {
        return next(err);
    }
}

// PUT - /api/users/:userId/profile
exports.updateProfile = async function (req, res, next) {
    try {
        const user = await db.User.findById(req.params.userId);
        const profile = await db.Profile.findOneAndUpdate({ _id: user.profile }, req.body);
        const updatedProfile = await db.Profile.findById(profile.id);
        return res.status(200).send(updatedProfile);
    } catch (err) {
        return next(err);
    }
}