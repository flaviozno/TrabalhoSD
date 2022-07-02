const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./models/User')

module.exports = {
    async getUserById(call, callback) {
        const { id } = call.request;

        const user = await User.findById(id);

        if (!user) {
            return callback(null, { error: 'User not found' });
        }

        return callback(null, {
            user: { ...user.toObject(), id: user._id, password: undefined },
        });

    },

    async registerUser(call, callback) {
        const { email, username, password } = call.request.user;

        if (email) {
            const response = await User.find({ email: email });
            if (response.length !== 0) {
                return callback(null, { error: 'This email already exists' });
            }
            else {
                const user = await User.create({ email, username, password })

                return callback(null, { user: { ...user.toObject(), id: user._id } });
            }
        }
    },
    async loginUser(call, callback) {
        const { email, password } = call.request.user;

        const user = await User.findOne({ email });

        if (!user) {
            return callback(null, { error: 'User not found' });
        }

        if (!(await user.compareHash(password))) {
            return callback(null, { error: 'Invalid password' });
        }

        const token = User.generateToken(user);

        return callback(null, {
            token,
        });
    },
    async authenticate(call, callback) {
        const { token: fullToken } = call.request;

        if (!fullToken) {
            callback(null, { error: 'No token provided' });
        }

        const parts = fullToken.split(' ');

        if (!parts.length === 2) {
            return callback(null, { error: 'Token error' });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return callback(null, { error: 'Token malformatted' });
        }

        try {
            const decoded = await promisify(jwt.verify)(token, 'flaviozno');

            const user = await User.findById(decoded.id);

            return callback(null, { user: { ...user.toObject(), id: user._id } });
        } catch (err) {
            return callback(null, { error: 'Token invalid' });
        }
    },
    async deleteUser(call, callback) {
        const id = call.request.id;

        const response = await User.findOneAndRemove({ _id: id })

        if (response !== null)
            return callback(null, { response })
        else
            return callback(null, { error: "User not found" })
    },
    async updateUser(call, callback) {
        const { email, username, password } = call.request;

        const findUser = await User.findById({ email })


        if (!findUser) {
            return callback(null, { error: "User not found" })
        }

        if (!(await findUser.compareHash(password))) {
            return callback(null, { error: 'Invalid password' });
        }
        var query = {
            email: email, username: username
        }

        var updateQuery = {
            $set: { email: 'flavio@mail.com', username: 'flaviozno' }
        }

        findUser = await User.updateOne(query, updateQuery, function (err, res) {
            if (err) throw err;
            console.log('Client has been updated');
        })

        return callback(null, { findUser });


    }
}