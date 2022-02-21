const mongoose = require('mongoose');

const statesArray = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT'];

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        shippingAddress: {
            address1: String,
            address2: String,
            city: String,
            state: {
                type: String,
                enum: statesArray
            },
            zipCode: {
                type: String,
                validate: {
                    validator: (val) => !isNaN(val) && val.length === 5
                }
            }
        },
        // Change to a date !!! 
        birthDate: String
        // Add Payment Methods (number, name, security code, expiration date, billing address), 
    },
    {
        timestamps: true
    }
);

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;